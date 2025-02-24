import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import {print} "mo:base/Debug";
import Error "mo:base/Error";
import Util "../Util";
import Iter "mo:base/Iter";

actor {
    type Renter = Util.Renter;

    var renterProfiles = TrieMap.TrieMap<Principal, Renter>(Principal.equal, Principal.hash);

    stable var stableRenterProfiles: [(Principal, Renter)] = [];

    system func preupgrade() {
        stableRenterProfiles := Iter.toArray(renterProfiles.entries());
    };

    system func postupgrade() {
        renterProfiles := TrieMap.fromEntries<Principal, Renter>(Iter.fromArray(stableRenterProfiles), Principal.equal, Principal.hash);
    };

    public shared func registerRenter(renter: Renter) : async Text {

        try{
            renterProfiles.put(renter.id, renter);
            return "";
        }catch e{
            return Error.message(e);
        };
    };

    public shared func updateRenter(renter: Renter) : async Int {

        try{
            renterProfiles.delete(renter.id);
            renterProfiles.put(renter.id, renter);
            return 1;
        }catch e{
            print("Error updating renter: " # Error.message(e));
            return 0;
        };
    };

    public query func getRenter(renterId: Principal) : async ?Renter {
        return renterProfiles.get(renterId); 
    };


    public shared func getRenterBalance(id: Principal) : async Nat {
        switch (renterProfiles.get(id)) {
            case null { return 0 };
            case (?renter) { return renter.ballance };
        };
    };

    public shared func updateRenterBalance(id: Principal, newBalance: Nat) : async Nat {
        switch (renterProfiles.get(id)) {
            case null { return 0 };
            case (?renter) {
                var prof: UserProfile = {
                    id = renter.id;
                    fullName = renter.fullName;
                    email = renter.email;
                    dateOfBirth = renter.dateOfBirth;
                    ballance = newBalance;
                    profilePictureUrl = renter.profilePictureUrl;
                };

                try {
                    renterProfiles.delete(prof.id);
                    renterProfiles.put(prof.id, prof);
                    return 1;
                } catch (e: Error) {
                    print("Error updating ballance for renter: " # Error.message(e));
                    return 0;
                };
            };
        };
    };
};