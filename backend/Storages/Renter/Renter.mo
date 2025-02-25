import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import {print} "mo:base/Debug";
import Error "mo:base/Error";
import Util "../Util";
import Iter "mo:base/Iter";

actor {

    var renterProfiles = TrieMap.TrieMap<Principal, Util.Renter>(Principal.equal, Principal.hash);

    stable var stableRenterProfiles: [(Principal, Util.Renter)] = [];

    system func preupgrade() {
        stableRenterProfiles := Iter.toArray(renterProfiles.entries());
    };

    system func postupgrade() {
        renterProfiles := TrieMap.fromEntries<Principal, Util.Renter>(Iter.fromArray(stableRenterProfiles), Principal.equal, Principal.hash);
    };

    public shared func registerRenter(renter: Util.Renter) : async Text {

        try{
            renterProfiles.put(renter.id, renter);
            return "";
        }catch e{
            return Error.message(e);
        };
    };

    public shared func updateRenter(renter: Util.Renter) : async Int {

        try{
            renterProfiles.delete(renter.id);
            renterProfiles.put(renter.id, renter);
            return 1;
        }catch e{
            print("Error updating user: " # Error.message(e));
            return 0;
        };
    };

    public query func getRenter(renterId: Principal) : async ?Util.Renter {
        return renterProfiles.get(renterId); 
    };
};