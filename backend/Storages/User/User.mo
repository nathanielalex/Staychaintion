import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Error "mo:base/Error";
import Util "../Util";
import { print } "mo:base/Debug";

actor {
    let userProfiles = TrieMap.TrieMap<Principal, Util.UserProfile>(Principal.equal, Principal.hash);

    public shared func registerUser(userId: Principal, fullname: Text, dob: Text, email: Text, profpicUrl: Text) : async Nat {
        
        var prof: Util.UserProfile = {
            id= userId;
            fullName = fullname;
            email = email;
            dateOfBirth= dob;
            profileUrl = profpicUrl;
        };


        try{
            userProfiles.put(prof.id, prof);
            return 1;
        }catch e{
            return 0;
        };
    };

// this function can't be used, the replace function doesn't work because it expect type "()"
// though it should've been type "Util.UserProfile", idk why it's not working
    public shared func updateUser(userId: Principal, fullname: Text, dob: Text, email: Text, profpicUrl: Text) : async Nat {
        let prof : Util.UserProfile ={
            id= userId;
            fullName = fullName;
            email = email;
            dateOfBirth= dob;
            profileUrl = profpicUrl;
        };

        try{
            userProfiles.replace(userId, prof);
            return 1;
        }catch e{
            print("Error updating user: " # Error.message(e));
            return 0;
        };

    };

    public query func getUser(userId: Principal) : async ?Util.UserProfile {
        return userProfiles.get(userId);
    };

};