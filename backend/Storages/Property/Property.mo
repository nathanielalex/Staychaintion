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
import Float "mo:base/Float";
import Util "../Util";
import { sort; propStatusVal; propTypeVal } "../Util";
// import Region "mo:base/Region";
import Vector "mo:vector/Class";

actor {

    type Property = Util.Property;
5
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
        if(propTypeVal(unreg.propertyType) == false or propStatusVal(unreg.status) == false) {
            return "";
        };

        let id = await Util.generateUUID();
        // Create property by extending unreg with additional fields
        let prop : Property = {
            id;
            owner = unreg.owner;
            name = unreg.name;
            status = unreg.status; // Default status if not provided
            propertyType = unreg.propertyType;
            pricePerNight = unreg.pricePerNight;
            description = unreg.description;
            location = unreg.location;
            latitude = unreg.latitude;
            longitude = unreg.longitude;
            builtInDate = unreg.builtInDate;
            bedroomCount = unreg.bedroomCount;
            guestCapacity = unreg.guestCapacity;
            bathroomCount = unreg.bathroomCount;
            bedCount = unreg.bedCount;
            pictures = unreg.pictures;
            coverPicture = unreg.coverPicture;
            rating = 0; // New properties start with 0 rating
        };

        propertyInfo.put(id, prop);
        return id;
    };


    public shared func updateProperty(updatedProp: Property) : async Int {
        if(propTypeVal(updatedProp.propertyType) == false or propStatusVal(updatedProp.status) == false) {
            return 0;
        };

        try {
            propertyInfo.put(updatedProp.id, updatedProp);
            return 1;
        } catch (e: Error) {
            Debug.print("Error updating property: " # Error.message(e));
            return 0;
        };
    };

    public shared func removeProperty(property: Property) : async Int {
        try {
            propertyInfo.delete(property.id);
            return 1;
        } catch (e: Error) {
            Debug.print("Error removing property: " # Error.message(e));
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

    public query func getPropertyIdFromTextAttribute(attribute: Text, text_query: Text): async [Text] {
        var itertyp = propertyInfo.vals();

        itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
            return Text.contains( switch(attribute){
                case("owner"){Principal.toText(prop.owner) : Text};
                case("name"){prop.name};
                case("status"){prop.status};
                case("propertyType"){prop.status};
                case("location"){prop.location};
                case("builtInDate"){prop.builtInDate};
                case (_) { "" };
            }, #text(text_query));
        });

        return Iter.toArray<Text>(Iter.map<Property, Text>(itertyp, func (prop: Property): Text { prop.id; }));
    };

    public query func getPropIdFromNatAttribute(attribute: Text, order: Text, comparison: Text, numQuery: Float): async [Text] {
        var itertyp = propertyInfo.vals();
        itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
            let value: Float = switch (attribute) {
                case ("pricePerNight") { prop.pricePerNight };
                case ("bedroomCount") { Float.fromInt(prop.bedroomCount) };
                case ("guestCapacity") { Float.fromInt(prop.guestCapacity) };
                case ("bathroomCount") { Float.fromInt(prop.bathroomCount) };
                case ("bedCount") { Float.fromInt(prop.bedCount) };
                case ("rating") { prop.rating };
                case (_) { 0 };
            };

            switch (comparison) {
                case ("mt") { Float.greaterOrEqual(value, numQuery) };
                case ("eq") { Float.equal(value, numQuery) };
                case ("lt") { Float.lessOrEqual(value, numQuery) };
                case (_) { Float.equal(value, numQuery) };
            };
        });

        return Iter.toArray<Text>(Iter.map<Property, Text>(itertyp, func (prop: Property): Text{ return prop.id; }));
    };

    private func compareAsc(p1: Property, p2: Property, attr: Text): Order.Order {
        switch(attr) {
            case("pricePerNight") { if (Float.less(p1.pricePerNight, p2.pricePerNight)) #less else if (Float.equal(p1.pricePerNight, p2.pricePerNight)) #equal else #greater };
            case("bedroomCount") { if (p1.bedroomCount < p2.bedroomCount) #less else if (p1.bedroomCount == p2.bedroomCount) #equal else #greater };
            case("guestCapacity") { if (p1.guestCapacity < p2.guestCapacity) #less else if (p1.guestCapacity == p2.guestCapacity) #equal else #greater };
            case("bathroomCount") { if (p1.bathroomCount < p2.bathroomCount) #less else if (p1.bathroomCount == p2.bathroomCount) #equal else #greater };
            case("bedCount") { if (p1.bedCount < p2.bedCount) #less else if (p1.bedCount == p2.bedCount) #equal else #greater };
            case("rating") { if (Float.less(p1.rating, p2.rating)) #less else if (Float.equal(p1.rating, p2.rating)) #equal else #greater };
            case("owner") { if (Text.less(Principal.toText(p1.owner), Principal.toText(p2.owner))) #less else if (Principal.toText(p1.owner) == Principal.toText(p2.owner)) #equal else #greater };
            case("name") { if (Text.less(p1.name, p2.name)) #less else if (p1.name == p2.name) #equal else #greater };
            case("status") { if (Text.less(p1.status, p2.status)) #less else if (p1.status == p2.status) #equal else #greater };
            case("propertyType") { if (Text.less(p1.propertyType, p2.propertyType)) #less else if (p1.propertyType == p2.propertyType) #equal else #greater };
            case("location") { if (Text.less(p1.location, p2.location)) #less else if (p1.location == p2.location) #equal else #greater };
            case("builtInDate") { if (Text.less(p1.builtInDate, p2.builtInDate)) #less else if (p1.builtInDate == p2.builtInDate) #equal else #greater };
            case(_) { #equal };
        };
    };

    private func compareDesc(p1: Property, p2: Property, attr: Text): Order.Order {
        switch(attr) {
            case("pricePerNight") { if (Float.greater(p1.pricePerNight, p2.pricePerNight)) #less else if (Float.equal(p1.pricePerNight, p2.pricePerNight)) #equal else #greater };
            case("bedroomCount") { if (p1.bedroomCount > p2.bedroomCount) #less else if (p1.bedroomCount == p2.bedroomCount) #equal else #greater };
            case("guestCapacity") { if (p1.guestCapacity > p2.guestCapacity) #less else if (p1.guestCapacity == p2.guestCapacity) #equal else #greater };
            case("bathroomCount") { if (p1.bathroomCount > p2.bathroomCount) #less else if (p1.bathroomCount == p2.bathroomCount) #equal else #greater };
            case("bedCount") { if (p1.bedCount > p2.bedCount) #less else if (p1.bedCount == p2.bedCount) #equal else #greater };
            case("rating") { if (Float.greater(p1.rating, p2.rating)) #less else if (Float.equal(p1.rating, p2.rating)) #equal else #greater };
            case("owner") { if (Text.greater(Principal.toText(p1.owner), Principal.toText(p2.owner))) #less else if (Principal.toText(p1.owner) == Principal.toText(p2.owner)) #equal else #greater };
            case("name") { if (Text.greater(p1.name, p2.name)) #less else if (p1.name == p2.name) #equal else #greater };
            case("status") { if (Text.greater(p1.status, p2.status)) #less else if (p1.status == p2.status) #equal else #greater };
            case("propertyType") { if (Text.greater(p1.propertyType, p2.propertyType)) #less else if (p1.propertyType == p2.propertyType) #equal else #greater };
            case("location") { if (Text.greater(p1.location, p2.location)) #less else if (p1.location == p2.location) #equal else #greater };
            case("builtInDate") { if (Text.greater(p1.builtInDate, p2.builtInDate)) #less else if (p1.builtInDate == p2.builtInDate) #equal else #greater };
            case(_) { #equal };
        };
    };

    /**
     * Retrieves a paginated list of properties based on various filtering and sorting criteria.
     *
     * @param {Text} textAttrs - A string containing text attribute names separated by commas, semicolons, or newlines.
     * @param {Text} textQueries - A string containing text queries corresponding to the text attributes, separated by commas, semicolons, or newlines.
     * @param {Text} numAttrs - A string containing numeric attribute names separated by commas, semicolons, or newlines.
     * @param {Text} numQueries - A string containing numeric queries corresponding to the numeric attributes, separated by commas, semicolons, or newlines.
     * @param {Text} comparisons - A string containing comparison operators (e.g., "mt" for more than/greater than or equal, "eq" for equal, "lt" for less than or equal) separated by commas, semicolons, or newlines.
     * @param {Text} orderAttr - The attribute name by which to sort the results.
     * @param {Text} orderDir - The direction of sorting, either "asc" for ascending or "desc" for descending.
     * @param {Nat} page - The page number to retrieve (must be greater than 0).
     * @param {Nat} count - The number of properties to retrieve per page (must be greater than 0).
     * @returns {async ([Property], Nat)} - A tuple containing an array of properties and the count of properties in the result.
     *
     * The function performs the following steps:
     * 1. Validates that page and count are greater than 0, returning empty results otherwise.
     * 2. Parses the input parameters to extract attribute names, queries, and comparison operators.
     * 3. Filters the properties based on the provided text attributes and queries.
     * 4. Filters the properties based on the provided numeric attributes, queries, and comparison operators.
     * 5. Sorts the filtered properties based on the provided order attribute and direction.
     * 6. Paginates the sorted properties based on the provided page number and count.
     * 7. Returns the paginated properties along with the count of properties in the result.
     *
     * The function supports filtering on the following text attributes:
     * - owner (Principal as Text)
     * - name
     * - status
     * - propertyType
     * - location
     * - builtInDate
     *
     * And the following numeric attributes:
     * - pricePerNight (if decimal, use a dot as the decimal separator)
     * - bedroomCount
     * - guestCapacity
     * - bathroomCount
     * - bedCount
     * - rating
     *
     * Example usage:
     * ```
     * let (properties, total) = await getPropertyPaginate(
     *     "name,location", "Luxury,Thailand",
     *     "pricePerNight,bedCount", "12.5,2", "mt,eq",
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
        if(page <= 0 or count <= 0) {
            return ([], 0);
        };

        // Parse input parameters
        let textAttrIter = Text.tokens(textAttrs, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        let textQueryIter = Text.tokens(textQueries, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        
        let numAttrIter = Text.tokens(numAttrs, #predicate(func(c):Bool{ c==' ' or c == ',' or c==';' or c=='\n' }));
        let numQueryIter = Text.tokens(numQueries, #predicate(func(c):Bool{ c==' ' or c == ',' or c==';' or c=='\n' }));
        let comparIter = Text.tokens(comparisons, #predicate(func(c):Bool{ c==' ' or c == ',' or c==';' or c=='\n' }));

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
                                case("status"){prop.status};
                                case("propertyType"){prop.status};
                                case("location"){prop.location};
                                case("builtInDate"){prop.builtInDate};
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
                                let query_float = Util.textToFloat(quer);
                                itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
                                    let value: Float = switch (attr) {
                                        case ("pricePerNight") { prop.pricePerNight };
                                        case ("bedroomCount") { Float.fromInt(prop.bedroomCount) };
                                        case ("guestCapacity") { Float.fromInt(prop.guestCapacity) };
                                        case ("bathroomCount") { Float.fromInt(prop.bathroomCount) };
                                        case ("bedCount") { Float.fromInt(prop.bedCount) };
                                        case ("rating") { prop.rating };
                                        case (_) { 0 };
                                    };

                                    switch (comp) {
                                        case ("mt") { Float.greaterOrEqual(value, query_float) };
                                        case ("eq") { Float.equal(value, query_float) };
                                        case ("lt") { Float.lessOrEqual(value, query_float) };
                                        case (_) { Float.equal(value, query_float) };
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
                                    case("propertyType") { true };
                                    case("location") { true };
                                    case("builtInDate") { true };
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