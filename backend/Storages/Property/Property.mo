import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Nat8 "mo:base/Nat8";
import Int8 "mo:base/Int8";
import Order "mo:base/Order";
import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import Option "mo:base/Option";
import Util "../Util";
import { sort } "../Util";
// import Region "mo:base/Region";
import Vector "mo:vector/Class";

actor {

    type Property = Util.Property;
    type PropertyStatus = Util.PropertyStatus;

    var propertyInfo = TrieMap.TrieMap<Text, Property>(Text.equal, Text.hash);
    // var propertyIdIndexes = Array.init<Text>(propertyInfo.size());

    stable var stablePropertyInfo: [(Text, Property)] = [];
    
    // Seeder function that adds initial property data
    // private func seedProperties(): async () {
    //     let prop1: Util.UnregisteredProperty = {
    //         bedCount = 2;
    //         owner = Principal.fromText("aaaaa-aa");
    //         pricePerNight= 1000000;
    //         name= "Luxury A-Frame Cabin";
    //         bedroomCount= 2;
    //         bathroomCount= 1;
    //         description= "A beautiful cabin by the beach with a wonderful view.";
    //         builtInDate= "2020-06-15";
    //         guestCapacity= 4;
    //         pictures= [];
    //         buildingType= "cabin";
    //         location= "Tambon Huai Sat Yai, Thailand";
    //         coverPicture= "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png";
    //     };
    //     // Add properties to the map
    //     let propertyId = await registerProperty(prop1);
    // };

    system func preupgrade()  {
        // seedProperties();
        stablePropertyInfo := Iter.toArray(propertyInfo.entries());
    };

    system func postupgrade() {
        propertyInfo := TrieMap.fromEntries<Text, Property>(Iter.fromArray(stablePropertyInfo), Text.equal, Text.hash);
        // propertyIdIndexes := Array.fromIterable<Text>(propertyInfo.keys());
    };

    public shared func registerProperty(unreg: Util.UnregisteredProperty) : async Text {
        let id = await Util.generateUUID();

        let prop : Property = {
            id = id;
            owner = unreg.owner;
            name = unreg.name;
            status = unreg.status;
            pricePerNight = unreg.pricePerNight;
            description = unreg.description;
            location = unreg.location;
            builtInDate = unreg.builtInDate;
            bedroomCount = unreg.bedroomCount;
            guestCapacity = unreg.guestCapacity;
            bathroomCount = unreg.bathroomCount;
            bedCount = unreg.bedCount;
            pictures = unreg.pictures;
            coverPicture = unreg.coverPicture;
            buildingType = unreg.buildingType;
            rating = 0;
        };

        try {
            propertyInfo.put(prop.id, prop);
            return id;
        } catch (e: Error) {
            return "Error registering property: " # Error.message(e);
        };
    };


    public shared func updateProperty(updatedProp: Property) : async Int {
        try {
            propertyInfo.delete(updatedProp.id);
            propertyInfo.put(updatedProp.id, updatedProp);
            return 1;
        } catch (e: Error) {
            Debug.print("Error updating property: " # Error.message(e));
            return 0;
        };
    };

    public query func getPropertyInfo(propertyId: Text) : async ?Property {
        return propertyInfo.get(propertyId);
    };

    public query func getAllProperties() : async [Property] {
        let properties = Vector.Vector<Property>();
        for (p in propertyInfo.vals()) {
            properties.add(p);
        };
        return (Vector.toArray(properties));
    };

    // Add this function to seed the properties when canister is initialized
    // public func initialize() : async () {
    //     // Call the seeder function
    //     await seedProperties();
    // }
    public query func propertyCount(): async Nat {
        return propertyInfo.size();
    };


    /**
     * Retrieves a list of properties based on a specified text attribute and query.
     *
     * @param {Text} attribute - The attribute of the property to search by. 
     *                           Possible values are "owner", "name", "location", "builtInDate".
     * @param {Text} text_query - The text value to search for in the specified attribute.
     * @param {Nat} count - The maximum number of properties to return.
     * @return {async [Property]} - An array of properties that match the search criteria.
     */
    public query func getPropertyFromTextAtribute(attribute: Text, text_query:Text, count: Nat): async [Property]{
        var property_array: [Property] = [];

        for(prop in propertyInfo.vals()){

            if(property_array.size() >= count){
                return property_array;
            };
            
            let value = switch(attribute){
                case("owner"){Principal.toText(prop.owner) : Text};
                case("name"){prop.name};
                case("status"){Util.propStatusToText(prop.status)};
                case("location"){prop.location};
                case("builtInDate"){prop.builtInDate};
                case("buildingType"){prop.buildingType};
                case (_) { "" };                
            };

            if(Text.contains(value, #text(text_query))){
                property_array := Array.append<Property>(property_array, [prop]);
            };
        };
        return property_array;
    };

    public query func getPropertyFromTextAttributePaginate(attribute: Text, text_query: Text, page: Nat, count: Nat): async ([Property], Nat) {
        let attrIter = Text.tokens(attribute, #predicate(func(c):Bool{ c==' ' or c==',' or c==';' or c=='\n' }));
        let queryIter = Text.tokens(text_query, #predicate(func(c):Bool{ c==' ' or c==',' or c==';' or c=='\n' }));

        var itertyp = propertyInfo.vals();
        var cursor = 0;
        var counter = 0;
        let skip = (page-1)*count;

        loop{
            switch(attrIter.next(), queryIter.next()){
                case(?attr, ?quer){
                    cursor := 0;
                    counter := 0;
                    itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
                        if(Text.contains( switch (attr) {
                            case("owner"){Principal.toText(prop.owner) : Text};
                            case("name"){prop.name};
                            case("status"){Util.propStatusToText(prop.status)};
                            case("location"){prop.location};
                            case("builtInDate"){prop.builtInDate};
                            case("buildingType"){prop.buildingType};
                            case (_) { "" };                
                        }, #text(quer))){
                            cursor += 1;
                            if (cursor > skip and counter <= count) {
                                counter += 1;
                                return true;
                            } else false;
                        } else false;
                    });
                };
                case(null, null) { 
                    return (Iter.toArray<Property>(itertyp), counter);
                };
                case(_) { 
                    return ([], 0);
                };
            };
        };
    };

    public query func getPropertyIdFromTextAttribute(attribute: Text, text_query: Text): async [Text] {
        var itertyp = propertyInfo.vals();

        itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
            return Text.contains( switch(attribute){
                case("owner"){Principal.toText(prop.owner) : Text};
                case("name"){prop.name};
                case("status"){Util.propStatusToText(prop.status)};
                case("location"){prop.location};
                case("builtInDate"){prop.builtInDate};
                case("buildingType"){prop.buildingType};
                case (_) { "" };
            }, #text(text_query));
        });

        return Iter.toArray<Text>(Iter.map<Property, Text>(itertyp, func (prop: Property): Text { prop.id; }));
    };
    
    /**
     * Retrieves a list of properties based on a specified attribute, order, comparison, and query parameters.
     *
     * @param {Text} attribute - The attribute of the property to filter by (e.g., "pricePerNight", "bedroomCount").
     * @param {Text} order - The order in which to sort the results ("asc" for ascending, "desc" for descending).
     * @param {Int8} comparison - The comparison operator to use (1 for greater than or equal, 0 for equal, -1 for less than or equal).
     * @param {Nat} numQuery - The value to compare the attribute against.
     * @param {Nat} count - The maximum number of properties to return.
     * @return {async [Property]} - A list of properties that match the specified criteria, sorted by the specified order.
     */
    public query func getPropertyFromNatAttribute(attribute: Text, order: Text, comparison: Int8, numQuery: Nat, count: Nat): async [Property] {
        var propertyArray: [Property] = [];

        for (prop in propertyInfo.vals()) {
            if (propertyArray.size() >= count) {
                return sort<Property>(propertyArray, if (order == "asc") compareAsc else compareDesc , attribute);
            };

            let value = switch (attribute) {
                case ("pricePerNight") { prop.pricePerNight };
                case ("bedroomCount") { prop.bedroomCount };
                case ("guestCapacity") { prop.guestCapacity };
                case ("bathroomCount") { prop.bathroomCount };
                case ("bedCount") { prop.bedCount };
                case ("rating") { prop.rating };
                case (_) { 0 };
            };

            let shouldAdd: Bool = switch (comparison) {
                case (1) { value >= numQuery };
                case (0) { value == numQuery };
                case (-1) { value <= numQuery };
                case (_) { value == numQuery };
            };

            if (shouldAdd) {
                propertyArray := Array.append<Property>(propertyArray, [prop]);
            };
        };

        return sort<Property>(propertyArray, if (order == "asc") compareAsc else compareDesc , attribute);
    };


    /**
     * Retrieves a paginated list of properties based on a specified attribute, comparison, and order.
     *
     * @param {Text} attribute - The attribute to filter properties by (e.g., "pricePerNight,bedroomCount,guestCapacity").
     * @param {Text} num_query - The value to compare the attribute against. (e.g., "100,2,4"). [has to have the same amount of paramers as the attribute]
     * @param {Text} comparison - The comparison operator to use ("mt" for greater than or equal, "eq" for equal, "lt" for less than or equal). (e.g., "mt,eq,lt"). [has to have the same amount of paramers as the attribute]
     * @param {Text} order - The order in which to sort the results ("asc" for ascending, "desc" for descending) based on the first attribute writen in attribute parameter.
     * @param {Int} page - The page number to retrieve.
     * @param {Nat} count - The number of properties to retrieve per page.
     * @return {async ([Property], Nat)} - A tuple containing the list of properties and the total count of properties that match the criteria.
     */
    // order by the last attribute from the attribute parameter's text
    public query func getPropertyFromNatAttributePaginate(attribute: Text, num_query: Text, comparison: Text, order: Text, page: Int, count: Nat): async ([Property], Nat) {
        let attrIter = Text.tokens(attribute, #predicate(func(c):Bool{ c==' ' or c==',' or c==';' or c=='\n' }));
        let queryIter = Text.tokens(num_query, #predicate(func(c):Bool{ c==' ' or c==',' or c==';' or c=='\n' }));
        let comparIter = Text.tokens(comparison, #predicate(func(c):Bool{ c==' ' or c==',' or c==';' or c=='\n' }));

        var itertyp = propertyInfo.vals();
        var cursor = 0;
        var counter = 0;
        var lastAttr: ?Text = null;
        let skip = (page-1)*count;

        loop{
            switch(attrIter.next(), queryIter.next(), comparIter.next()){
                case(?attr, ?quer, ?comp){
                    cursor := 0;
                    counter := 0;
                    itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
                        let value = switch (attribute) {
                            case ("pricePerNight") { prop.pricePerNight };
                            case ("bedroomCount") { prop.bedroomCount };
                            case ("guestCapacity") { prop.guestCapacity };
                            case ("bathroomCount") { prop.bathroomCount };
                            case ("bedCount") { prop.bedCount };
                            case ("rating") { prop.rating };
                            case (_) { 0 };
                        };

                        if (switch (comp) {
                            case ("mt") { value >= Util.textToInt(quer) };
                            case ("eq") { value == Util.textToInt(quer) };
                            case ("lt") { value <= Util.textToInt(quer) };
                            case (_) { value == Util.textToInt(quer) };
                        }) {
                            cursor += 1;
                            if (cursor > skip and counter < count) {
                                // this part of the block iterates the least amount of time, so i put the first attribute catcher here
                                switch(lastAttr) {
                                    case(null) { lastAttr := ?attr; };
                                    case(?atr) {};
                                };
                                
                                counter += 1;
                                return true;
                            } else false;
                        } else false;
                    });
                };
                case(null, null, null) { 
                    if(lastAttr == null) {return ([],0)};
                    return (sort<Property>(Iter.toArray<Property>(itertyp), if (order == "asc") compareAsc else compareDesc, Option.unwrap<Text>(lastAttr)), counter);
                };
                case(_) { 
                    return ([], 0);
                };
            };
        };
    };

    public query func getPropIdFromNatAttribute(attribute: Text, order: Text, comparison: Text, numQuery: Nat): async [Text] {
        var itertyp = propertyInfo.vals();

        itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
            let value = switch (attribute) {
                case ("pricePerNight") { prop.pricePerNight };
                case ("bedroomCount") { prop.bedroomCount };
                case ("guestCapacity") { prop.guestCapacity };
                case ("bathroomCount") { prop.bathroomCount };
                case ("bedCount") { prop.bedCount };
                case ("rating") { prop.rating };
                case (_) { 0 };
            };

            return switch (comparison) {
                case ("mt") { value >= numQuery };
                case ("eq") { value == numQuery };
                case ("lt") { value <= numQuery };
                case (_) { value == numQuery };
            };
        });

        return Iter.toArray<Text>(Iter.map<Property, Text>(itertyp, func (prop: Property): Text{ return prop.id; }));
    };

    private func compareAsc(p1: Property, p2: Property, attr: Text): Order.Order {
        switch(attr) {
            case("pricePerNight") { if (p1.pricePerNight < p2.pricePerNight) #less else if (p1.pricePerNight == p2.pricePerNight) #equal else #greater };
            case("bedroomCount") { if (p1.bedroomCount < p2.bedroomCount) #less else if (p1.bedroomCount == p2.bedroomCount) #equal else #greater };
            case("guestCapacity") { if (p1.guestCapacity < p2.guestCapacity) #less else if (p1.guestCapacity == p2.guestCapacity) #equal else #greater };
            case("bathroomCount") { if (p1.bathroomCount < p2.bathroomCount) #less else if (p1.bathroomCount == p2.bathroomCount) #equal else #greater };
            case("bedCount") { if (p1.bedCount < p2.bedCount) #less else if (p1.bedCount == p2.bedCount) #equal else #greater };
            case("rating") { if (p1.rating < p2.rating) #less else if (p1.rating == p2.rating) #equal else #greater };
            case("owner") { if (Text.less(Principal.toText(p1.owner), Principal.toText(p2.owner))) #less else if (Principal.toText(p1.owner) == Principal.toText(p2.owner)) #equal else #greater };
            case("name") { if (Text.less(p1.name, p2.name)) #less else if (p1.name == p2.name) #equal else #greater };
            case("status") { if (Text.less(Util.propStatusToText(p1.status), Util.propStatusToText(p2.status))) #less else if (Util.propStatusToText(p1.status) == Util.propStatusToText(p2.status)) #equal else #greater };
            case("location") { if (Text.less(p1.location, p2.location)) #less else if (p1.location == p2.location) #equal else #greater };
            case("builtInDate") { if (Text.less(p1.builtInDate, p2.builtInDate)) #less else if (p1.builtInDate == p2.builtInDate) #equal else #greater };
            case("buildingType") { if (Text.less(p1.buildingType, p2.buildingType)) #less else if (p1.buildingType == p2.buildingType) #equal else #greater };
            case(_) { #equal };
        };
    };

    private func compareDesc(p1: Property, p2: Property, attr: Text): Order.Order {
        switch(attr) {
            case("pricePerNight") { if (p1.pricePerNight > p2.pricePerNight) #less else if (p1.pricePerNight == p2.pricePerNight) #equal else #greater };
            case("bedroomCount") { if (p1.bedroomCount > p2.bedroomCount) #less else if (p1.bedroomCount == p2.bedroomCount) #equal else #greater };
            case("guestCapacity") { if (p1.guestCapacity > p2.guestCapacity) #less else if (p1.guestCapacity == p2.guestCapacity) #equal else #greater };
            case("bathroomCount") { if (p1.bathroomCount > p2.bathroomCount) #less else if (p1.bathroomCount == p2.bathroomCount) #equal else #greater };
            case("bedCount") { if (p1.bedCount > p2.bedCount) #less else if (p1.bedCount == p2.bedCount) #equal else #greater };
            case("rating") { if (p1.rating > p2.rating) #less else if (p1.rating == p2.rating) #equal else #greater };
            case("owner") { if (Text.greater(Principal.toText(p1.owner), Principal.toText(p2.owner))) #less else if (Principal.toText(p1.owner) == Principal.toText(p2.owner)) #equal else #greater };
            case("name") { if (Text.greater(p1.name, p2.name)) #less else if (p1.name == p2.name) #equal else #greater };
            case("status") { if (Text.greater(Util.propStatusToText(p1.status), Util.propStatusToText(p2.status))) #less else if (Util.propStatusToText(p1.status) == Util.propStatusToText(p2.status)) #equal else #greater };
            case("location") { if (Text.greater(p1.location, p2.location)) #less else if (p1.location == p2.location) #equal else #greater };
            case("builtInDate") { if (Text.greater(p1.builtInDate, p2.builtInDate)) #less else if (p1.builtInDate == p2.builtInDate) #equal else #greater };
            case("buildingType") { if (Text.greater(p1.buildingType, p2.buildingType)) #less else if (p1.buildingType == p2.buildingType) #equal else #greater };
            case(_) { #equal };
        };
    };

    /**
     * Retrieves a paginated list of properties based on various filtering and sorting criteria.
     *
    * This function allows you to filter properties by text and numeric attributes, sort them by a specified attribute,
    * and paginate the results. The filtering criteria are provided as strings of attributes and corresponding queries,
    * separated by spaces, commas, semicolons, or newlines. The comparison operators for numeric attributes are also
    * provided as a string.
    *
    * @param {Text} textAttrs - A string of text attributes to filter by, separated by spaces, commas, semicolons, or newlines.
    *                            Example: "owner,name,status"
    * @param {Text} textQueries - A string of text queries corresponding to the text attributes, separated by spaces, commas, semicolons, or newlines.
    *                             Example: "af13s-as,Doe,available"
    * @param {Text} numAttrs - A string of numeric attributes to filter by, separated by spaces, commas, semicolons, or newlines.
    *                          Example: "pricePerNight,bedroomCount"
    * @param {Text} numQueries - A string of numeric queries corresponding to the numeric attributes, separated by spaces, commas, semicolons, or newlines.
    *                            Example: "100,3"
    * @param {Text} comparisons - A string of comparison operators (e.g., "mt" for greater than, "eq" for equal, "lt" for less than), separated by spaces, commas, semicolons, or newlines.
    *                             Example: "mt,eq"
    * @param {Text} orderAttr - The attribute by which to order the results.
    *                           Example: "pricePerNight"
    * @param {Text} orderDir - The direction of the order ("asc" for ascending, "desc" for descending).
    *                          Example: "asc"
    * @param {Nat} page - The page number to retrieve.
    *                     Example: 1
    * @param {Nat} count - The number of properties to retrieve per page.
    *                      Example: 10
    * @return {async ([Property], Nat)} - A tuple containing an array of properties and the total number of properties that match the criteria.
    *
    * Example usage:
    * ```
    * let (properties, total) = await getPropertyPaginate(
    *     "owner,name,status", "af13s-as,Doe,available",
    *     "pricePerNight,bedroomCount", "100,3", "mt,eq",
    *     "pricePerNight", "asc",
    *     1, 10
    * );
    * ```
     */
    public query func getPropertyPaginate(
        textAttrs: Text, textQueries: Text,
        numAttrs: Text, numQueries: Text, comparisons: Text,
        orderAttr: Text, orderDir: Text,
        page: Nat, count: Nat
    ): async ([Property], Nat) {
        // Parse input parameters
        let textAttrIter = Text.tokens(textAttrs, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        let textQueryIter = Text.tokens(textQueries, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        
        let numAttrIter = Text.tokens(numAttrs, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        let numQueryIter = Text.tokens(numQueries, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        let comparIter = Text.tokens(comparisons, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));

        var itertyp = propertyInfo.vals();
        var cursor = 0;
        var counter = 0;
        let skip = (page-1)*count;

        // Filter by text attributes
        loop {
            switch(textAttrIter.next(), textQueryIter.next()) {
                case(?attr, ?quer) {
                    itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
                        Text.contains(
                            switch (attr) {
                                case("owner"){Principal.toText(prop.owner) : Text};
                                case("name"){prop.name};
                                case("status"){Util.propStatusToText(prop.status)};
                                case("location"){prop.location};
                                case("builtInDate"){prop.builtInDate};
                                case("buildingType"){prop.buildingType};
                                case (_) { "" };                
                            }, 
                            #text(quer)
                        );
                    });
                };
                case(null, null) { 
                    loop {
                        switch(numAttrIter.next(), numQueryIter.next(), comparIter.next()) {
                            case(?attr, ?quer, ?comp) {
                                itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
                                    let value = switch (attr) {
                                        case ("pricePerNight") { prop.pricePerNight };
                                        case ("bedroomCount") { prop.bedroomCount };
                                        case ("guestCapacity") { prop.guestCapacity };
                                        case ("bathroomCount") { prop.bathroomCount };
                                        case ("bedCount") { prop.bedCount };
                                        case ("rating") { prop.rating };
                                        case (_) { 0 };
                                    };

                                    switch (comp) {
                                        case ("mt") { value >= Util.textToInt(quer) };
                                        case ("eq") { value == Util.textToInt(quer) };
                                        case ("lt") { value <= Util.textToInt(quer) };
                                        case (_) { value == Util.textToInt(quer) };
                                    };
                                });
                            };
                            case(null, null, null) { 
                                let sorted = if(switch(orderAttr) {
                                    case("pricePerNight") { true };
                                    case("bedroomCount") { true };
                                    case("guestCapacity") { true };
                                    case("bathroomCount") { true };
                                    case("bedCount") { true };
                                    case("rating") { true };
                                    case("owner") { true };
                                    case("name") { true };
                                    case("status") { true };
                                    case("location") { true };
                                    case("builtInDate") { true };
                                    case("buildingType") { true };
                                    case(_) { false };
                                }) {
                                    sort<Property>(Iter.toArray<Property>(itertyp), if (orderDir == "asc") compareAsc else compareDesc, orderAttr)
                                } else Iter.toArray<Property>(itertyp);

                                let paginated = Iter.filter<Property>(Iter.fromArray(sorted), func (prop: Property): Bool {
                                    cursor += 1;
                                    if (cursor > skip and counter < count) {
                                        counter += 1;
                                        true;
                                    } else false;
                                });

                                return (Iter.toArray<Property>(paginated), counter);
                            };
                            case(_) { return ([], 0); };
                        };
                    };
                }; // want to break here
                case(_) { return ([], 0); };
            };
        };
    };

    public query func getProperty(propIds: [Text]): async [Property] {
        let vec = Vector.Vector<Property>();
        for(propId in propIds.vals()){
            switch(propertyInfo.get(propId)){
                case (?prop) { vec.add(prop) };
                case (null) {};
            };
        };
        return Vector.toArray<Property>(vec);
    };
};