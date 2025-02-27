import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Util "../Util";
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

    public query func getPropertyFromName(name_query:Text): async [Property]{
        var property_array: [Property] = [];
        for(prop in renterProfiles.vals()){
            if(Text.contains(renter.fullName, #text name_query)){
                property_array := Array.append<Renter>(property_array, [prop]);
            };
        };
        return property_array;
    };

    public query func getPropertyAfter(propertyId: Text, count: Nat) : async [Property] {
        if(propertyId == ""){

        } else {
            let index = propertyIdIndexes.indexOf(propertyId);
            if (index == -1) {
                return [];
            };
            return Array.take<Property>(propertyIdIndexes, index + 1, count);
        }
    };

};