import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Error "mo:base/Error";
import Util "../Util";
import { print } "mo:base/Debug";

actor {
    let userProfiles = TrieMap.TrieMap<Principal, Util.UserProfile>(Principal.equal, Principal.hash);

    public shared func registerUser(id: Principal, fullName: Text, email: Text, dateOfBirth: Text, profilePictureUrl: Text) : async Nat {
        
        var prof: Util.UserProfile = {
            id = id;
            fullName = fullName;
            email = email;
            dateOfBirth = dateOfBirth;
            profilePictureUrl = profilePictureUrl;
        };


        try {
            userProfiles.put(prof.id, prof);
            return 1;
        } catch e {
            return 0;
        };
    };

    public shared func updateUser(id: Principal, fullName: Text, email: Text, dateOfBirth: Text, profilePictureUrl: Text) : async Nat {
        var prof: Util.UserProfile = {
            id = id;
            fullName = fullName;
            email = email;
            dateOfBirth = dateOfBirth;
            profilePictureUrl = profilePictureUrl;
        };

        try {

            userProfiles.delete(prof.id);
            userProfiles.put(prof.id, prof);
            return 1;
        } catch e {
            print("Error updating user: " # Error.message(e));
            return 0;
        };

    };

    public query func getUser(id: Principal) : async ?Util.UserProfile {
        return userProfiles.get(id);
    };

};