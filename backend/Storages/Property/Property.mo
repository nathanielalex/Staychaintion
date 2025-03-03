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

    public query func getPropertyFromTextAttributePaginate(attribute: Text, text_query: Text, page: Int, count: Nat): async ([Property], Nat) {
        var itertyp = propertyInfo.vals();
        var cursor = 0;
        var counter = 0;
        let skip = (page-1)*count;

        itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
            if(Text.contains( switch (attribute) {
                case("owner"){Principal.toText(prop.owner) : Text};
                case("name"){prop.name};
                case("status"){Util.propStatusToText(prop.status)};
                case("location"){prop.location};
                case("builtInDate"){prop.builtInDate};
                case("buildingType"){prop.buildingType};
                case (_) { "" };
            }, #text(text_query))){
                cursor += 1;
                if (cursor > skip and counter <= count) {
                    counter += 1;
                    return true;
                } else false;
            } else false;
        });
        return (Iter.toArray<Property>(itertyp), counter);
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
                return sort<Property>(propertyArray, if (order == "asc") natCompareAsc else natCompareDesc , attribute);
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

        return sort<Property>(propertyArray, if (order == "asc") natCompareAsc else natCompareDesc , attribute);
    };

    public query func getPropertyFromNatAttributePaginate(attribute: Text, num_query: Nat, order: Text, comparison: Int8, page: Int, count: Nat): async ([Property], Nat) {
        var itertyp = propertyInfo.vals();
        var cursor = 0;
        var counter = 0;
        let skip = (page-1)*count;

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

            if (switch (comparison) {
                case (1) { value >= num_query };
                case (0) { value == num_query };
                case (-1) { value <= num_query };
                case (_) { value == num_query };
            }) {
                cursor += 1;
                if (cursor > skip and counter < count) {
                    counter += 1;
                    return true;
                } else false;
            } else false;
        });

        return (sort<Property>(Iter.toArray<Property>(itertyp), if (order == "asc") natCompareAsc else natCompareDesc, attribute), counter);
    };

    public query func getPropIdFromNatAttribute(attribute: Text, order: Text, comparison: Int8, numQuery: Nat): async [Text] {
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
                case (1) { value >= numQuery };
                case (0) { value == numQuery };
                case (-1) { value <= numQuery };
                case (_) { value == numQuery };
            };
        });

        return Iter.toArray<Text>(Iter.map<Property, Text>(itertyp, func (prop: Property): Text{ return prop.id; }));
    };

    private func natCompareAsc(x_prop: Property, y_prop: Property, attribute: Text): Order.Order {
        switch (attribute) {
            case ("pricePerNight") { if(x_prop.pricePerNight > y_prop.pricePerNight) #greater else if(x_prop.pricePerNight == y_prop.pricePerNight) #equal else #less };
            case ("bedroomCount") { if(x_prop.bedroomCount > y_prop.bedroomCount) #greater else if(x_prop.bedroomCount == y_prop.bedroomCount) #equal else #less };
            case ("guestCapacity") { if(x_prop.guestCapacity > y_prop.guestCapacity) #greater else if(x_prop.guestCapacity == y_prop.guestCapacity) #equal else #less };
            case ("bathroomCount") { if(x_prop.bathroomCount > y_prop.bathroomCount) #greater else if(x_prop.bathroomCount == y_prop.bathroomCount) #equal else #less };
            case ("bedCount") { if(x_prop.bedCount > y_prop.bedCount) #greater else if(x_prop.bedCount == y_prop.bedCount) #equal else #less };
            case ("rating") { if(x_prop.rating > y_prop.rating) #greater else if(x_prop.rating == y_prop.rating) #equal else #less  };
            case (_) { #equal };
        };
    };

    private func natCompareDesc(x_prop: Property, y_prop: Property, attribute: Text): Order.Order {
        switch (attribute) {
            case ("pricePerNight") { if(x_prop.pricePerNight < y_prop.pricePerNight) #greater else if(x_prop.pricePerNight == y_prop.pricePerNight) #equal else #less };
            case ("bedroomCount") { if(x_prop.bedroomCount < y_prop.bedroomCount) #greater else if(x_prop.bedroomCount == y_prop.bedroomCount) #equal else #less };
            case ("guestCapacity") { if(x_prop.guestCapacity < y_prop.guestCapacity) #greater else if(x_prop.guestCapacity == y_prop.guestCapacity) #equal else #less };
            case ("bathroomCount") { if(x_prop.bathroomCount < y_prop.bathroomCount) #greater else if(x_prop.bathroomCount == y_prop.bathroomCount) #equal else #less };
            case ("bedCount") { if(x_prop.bedCount < y_prop.bedCount) #greater else if(x_prop.bedCount == y_prop.bedCount) #equal else #less };
            case ("rating") { if(x_prop.rating < y_prop.rating) #greater else if(x_prop.rating == y_prop.rating) #equal else #less  };
            case (_) { #equal };
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