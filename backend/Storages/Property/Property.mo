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

actor {

    type Property = Util.Property;

    var propertyInfo = TrieMap.TrieMap<Text, Property>(Text.equal, Text.hash);
    // var propertyIdIndexes = Array.init<Text>(propertyInfo.size());

    stable var stablePropertyInfo: [(Text, Property)] = [];


    system func preupgrade() {
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
            pricePerNight= unreg.pricePerNight;
            description = unreg.description;
            location = unreg.location;
            builtInDate = unreg.builtInDate;
            bedroomCount= unreg.bedroomCount;
            guestCapacity= unreg.guestCapacity;
            bathroomCount= unreg.bathroomCount;
            bedCount= unreg.bedCount;
            pictures = unreg.pictures;
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
                case("location"){prop.location};
                case("builtInDate"){prop.builtInDate};
                case (_) { "" };                
            };

            if(Text.contains(value, #text(text_query))){
                property_array := Array.append<Property>(property_array, [prop]);
            };
        };
        return property_array;
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

    private func natCompareAsc(x_prop: Property, y_prop: Property, attribute: Text): Order.Order {
        switch (attribute) {
            case ("pricePerNight") { if(x_prop.pricePerNight > y_prop.pricePerNight) #greater else if(x_prop.pricePerNight == y_prop.pricePerNight) #equal else #less };
            case ("bedroomCount") { if(x_prop.bedroomCount > y_prop.bedroomCount) #greater else if(x_prop.bedroomCount == y_prop.bedroomCount) #equal else #less };
            case ("guestCapacity") { if(x_prop.guestCapacity > y_prop.guestCapacity) #greater else if(x_prop.guestCapacity == y_prop.guestCapacity) #equal else #less };
            case ("bathroomCount") { if(x_prop.bathroomCount > y_prop.bathroomCount) #greater else if(x_prop.bathroomCount == y_prop.bathroomCount) #equal else #less };
            case ("bedCount") { if(x_prop.bedCount > y_prop.bedCount) #greater else if(x_prop.bedCount == y_prop.bedCount) #equal else #less };
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
            case (_) { #equal };
        };
    };
};