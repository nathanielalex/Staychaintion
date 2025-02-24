import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Error "mo:base/Error";
import Iter "mo:base/Iter";
import Util "../Util";
import { print } "mo:base/Debug";

actor {

    type UserProfile = Util.UserProfile;

    var userProfiles = TrieMap.TrieMap<Principal, UserProfile>(Principal.equal, Principal.hash);

    stable var stableUserProfiles: [(Principal, UserProfile)] = [];

    system func preupgrade() {
        stableUserProfiles := Iter.toArray(userProfiles.entries());
    };

    system func postupgrade() {
        userProfiles := TrieMap.fromEntries<Principal, UserProfile>(Iter.fromArray(stableUserProfiles), Principal.equal, Principal.hash);
    };

    public shared func registerUser(id: Principal, fullName: Text, email: Text, dateOfBirth: Text, ballance: Nat, profilePictureUrl: Text) : async Nat {
        
        var prof: UserProfile = {
            id = id;
            fullName = fullName;
            email = email;
            dateOfBirth = dateOfBirth;
            ballance = ballance;
            profilePictureUrl = profilePictureUrl;
        };

        try {
            userProfiles.put(prof.id, prof);
            return 1;
        } catch (e: Error) {
            print("Error registering user: " # Error.message(e));
            return 0;
        };
    };

    public shared func updateUser(id: Principal, fullName: Text, email: Text, dateOfBirth: Text, profilePictureUrl: Text) : async Nat {
        var prof: UserProfile = {
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
        } catch (e: Error) {
            print("Error updating user: " # Error.message(e));
            return 0;
        };

    };

    public query func getUser(id: Principal) : async ?UserProfile {
        return userProfiles.get(id);
    };

    public shared func getUserBalance(id: Principal) : async Nat {
        switch (userProfiles.get(id)) {
            case null { return 0 };
            case (?user) { return user.ballance };
        };
    };

    public shared func updateUserBalance(id: Principal, newBalance: Nat) : async Nat {
        switch (userProfiles.get(id)) {
            case null { return 0 };
            case (?user) {
                var prof: UserProfile = {
                    id = user.id;
                    fullName = user.fullName;
                    email = user.email;
                    dateOfBirth = user.dateOfBirth;
                    ballance = newBalance;
                    profilePictureUrl = user.profilePictureUrl;
                };

                try {
                    userProfiles.delete(prof.id);
                    userProfiles.put(prof.id, prof);
                    return 1;
                } catch (e: Error) {
                    print("Error updating user: " # Error.message(e));
                    return 0;
                };
            };
        };
    };

};