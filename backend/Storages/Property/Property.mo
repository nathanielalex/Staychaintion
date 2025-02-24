import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Util "../Util";

actor {

    type Property = Util.Property;

    var propertyInfo = TrieMap.TrieMap<Text, Property>(Text.equal, Text.hash);

    stable var stablePropertyInfo: [(Text, Property)] = [];

    system func preupgrade() {
        stablePropertyInfo := Iter.toArray(propertyInfo.entries());
    };

    system func postupgrade() {
        propertyInfo := TrieMap.fromEntries<Text, Property>(Iter.fromArray(stablePropertyInfo), Text.equal, Text.hash);
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

    public query func getProperty(propertyId: Text) : async ?Property {
        return propertyInfo.get(propertyId);
    };

};