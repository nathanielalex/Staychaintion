import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Util "../Util";

actor {
    var propertyInfo = TrieMap.TrieMap<Text, Util.Property>(Text.equal, Text.hash);

    stable var stablePropertyInfo: [(Text, Util.Property)] = [];

    system func preupgrade() {
        stablePropertyInfo := Iter.toArray(propertyInfo.entries());
    };

    system func postupgrade() {
        propertyInfo := TrieMap.fromEntries<Text, Util.Property>(Iter.fromArray(stablePropertyInfo), Text.equal, Text.hash);
    };

    public shared func registerProperty(name: Text, description: Text, location: Text, builtInDate: Text, pictures: [Text]) : async Text {
        let id = await Util.generateUUID();

        let prop : Util.Property = {
            id = id;
            name = name;
            description = description;
            location = location;
            builtInDate = builtInDate;
            pictures = pictures;
        };

        try {
            propertyInfo.put(prop.id, prop);
            return id;
        } catch (e: Error) {
            return "Error registering property: " # Error.message(e);
        };
    };

    public shared func updateProperty(updatedProp: Util.Property) : async Int {

        try {
            propertyInfo.delete(updatedProp.id);
            propertyInfo.put(updatedProp.id, updatedProp);
            return 1;
        } catch (e: Error) {
            Debug.print("Error updating property: " # Error.message(e));
            return 0;
        };
    };

    public query func getProperty(propertyId: Text) : async ?Util.Property {
        return propertyInfo.get(propertyId);
    };

};