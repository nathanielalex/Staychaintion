import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import {print} "mo:base/Debug";
import Error "mo:base/Error";
// import Util "../Util";

actor {

    public type Renter = {
        id: Principal;
        fullName : Text;
        dateOfBirth: Text;
        email : Text;
        profileUrl : Text;
        propertiesId : [var Text];
    };
    
    let renterProfiles = TrieMap.TrieMap<Principal, Renter>(Principal.equal, Principal.hash);

    public shared func registerRenter(renterId: Principal, fullname: Text, dob: Text, email: Text, profpicUrl: Text) : async Text {
        
        var renter: Renter = {
            id= renterId;
            fullName = fullname;
            dateOfBirth= dob;
            email = email;
            profileUrl = profpicUrl;
            propertiesId = []; // cannot initialize empty array, motoko doesn't like this
        };

        print(renter.propertiesId[0]);

        try{
            renterProfiles.put(renterId, renter); // unbound variable prop
            return #ok(renterId);
        }catch e{
            return Error.message(e);
        };
    };

    public shared func updateRenter(renterId: Principal, fullname: Text, dob: Text, email: Text, profpicUrl: Text) : async Int {
        var prof : ?Renter = await getRenter(renterId);

        if (prof == null) { // why is this error ????
            return 0;
        };

        // all of this component's updating is error, why?
        prof.fullName := fullname;
        prof.dateOfBirth := dob;
        prof.email := email;
        prof.profileUrl := profpicUrl;

        try{
            renterProfiles.replace(prof.id, prof);
            return 1;
        }catch e{
            print("Error updating user: " # Error.message(e));
            return 0;
        };
    };

    public query func getRenter(renterId: Principal) : async ?Renter {
        return renterProfiles.get(renterId); 
    }; // has non shared return type, WDYM ??? i can't return async ?Renter because it's not shared type? what is a shared type ??
    // shared on function acts as a process that alternate or doing process that changes data or state in the canister
    // THIS JUST RETURN A FUDGING DATA THAT"S QUERIED, WHY IS IT NOT SHARED TYPE ????


};