import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Util "../Util";
import UUID "mo:uuid/UUID";

actor {
    let propertyInfo = TrieMap.TrieMap<Principal, Util.Property>(Text.equal, Text.hash);

    public shared func registerProperty(name: Text, builtInDate: Text) : async Text {
        let id = await Util.generateUUID();
        let prop : Util.Property = {
            id = id;
            name = name;
            builtInDate = builtInDate;
            pictures = [var Text];
        };

        try{
            propertyInfo.put(prop.id, prop);
            return #ok(id);
        }catch e{
            return #err(e);
        };
    };

    public shared func updateProperty(propertyId: Text, updatedAttr: [(Text, K)]) : async Int {
        var prop : ?Util.Property = await getProperty(propertyId);

        if (prop == null) {
            return 0;
        };

        for ((key, val) in updatedAttr.vals()) {
            for(attr in prop.keys()) {
                if (attr == key) {
                    prop[key] := val;
                };
            };
        };

        try{
            propertyInfo.replace(prop.id, prop);
            return 1;
        }catch e{
            print("Error updating user: " # Error.message(e));
            return 0;
        };
    };

    public query func getProperty(propertyId: Text) : async ?Util.Property {
        return await propertyInfo.get(propertyId);
    };

};