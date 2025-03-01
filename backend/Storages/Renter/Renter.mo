import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import {print} "mo:base/Debug";
import Error "mo:base/Error";
import Util "../Util";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Property "canister:Property";
// to resolve "Property" not defined, please deploy the Property canister first, then the Renter canister, this will remove the error 

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
                var prof: Renter = {
                    id = renter.id;
                    fullName = renter.fullName;
                    email = renter.email;
                    dateOfBirth = renter.dateOfBirth;
                    ballance = newBalance;
                    profilePictureUrl = renter.profilePictureUrl;
                    propertiesId = renter.propertiesId;
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

    public shared func addPropertyToRenter(renterId: Principal, property: Util.UnregisteredProperty) : async Nat {
        switch (renterProfiles.get(renterId)) {
            case null { return 0 };
            case (?renter) {
                let propId: Text = await Property.registerProperty(property);
                var prof: Renter = {
                    id = renter.id;
                    fullName = renter.fullName;
                    email = renter.email;
                    dateOfBirth = renter.dateOfBirth;
                    ballance = renter.ballance;
                    profilePictureUrl = renter.profilePictureUrl;
                    propertiesId = Array.append<Text>(renter.propertiesId, [propId]);
                };

                try {
                    renterProfiles.delete(prof.id);
                    renterProfiles.put(prof.id, prof);
                    return 1;
                } catch (e: Error) {
                    print("Error adding property to renter: " # Error.message(e));
                    return 0;
                };
            };
        };
    };

    public query func getRenterProperties(renterId: Principal): async Nat{
        let renter: Renter = await getRenter(renterId);
        var prop: [Property] = [];
        for(propId in renter.propertiesId){
            let property: ?Property = await Property.getPropertyInfo(propId);
            switch(property){
                case null{};
                case (?prop){ prop := Array.append<Property>(prop, [prop]); };
            };
        }
    };

    public query func getRenterFromName(name_query:Text): async [Renter]{
        var renter_array: [Renter] = [];
        for(renter in renterProfiles.vals()){
            if(Text.contains(renter.fullName, #text name_query)){
                renter_array := Array.append<Renter>(renter_array, [renter]);
            };
        };
        return renter_array;
    };

    /**
     * Retrieves a list of renters based on a specified text attribute and query.
     *
     * @param {Text} attribute - The attribute of the renter to search by. 
     * Possible values are "id", "fullName", "email", "dateOfBirth", "profilePictureUrl".
     * @param {Text} text_query - The text value to search for in the specified attribute.
     * @param {Nat} count - The maximum number of renters to return.
     * @return {async [Renter]} - An array of renters that match the search criteria.
     */
    public query func getRenterFromTextAttribute(attribute: Text, text_query: Text, count: Nat): async [Renter] {
        var renterArray: [Renter] = [];

        for (renter in renterProfiles.vals()) {
            if (renterArray.size() >= count) {
                return renterArray;
            };

            let value = switch (attribute) {
                case ("id") { Principal.toText(renter.id) };
                case ("fullName") { renter.fullName };
                case ("email") { renter.email };
                case ("dateOfBirth") { renter.dateOfBirth };
                case ("profilePictureUrl") { renter.profilePictureUrl };
                case (_) { "" };
            };

            if (Text.contains(value, text_query)) {
                renterArray := Array.append<Renter>(renterArray, [renter]);
            };
        };

        return renterArray;
    };

    /**
     * Retrieves a list of renters based on a specified attribute, order, comparison, and query parameters.
     *
     * @param {Text} attribute - The attribute of the renter to filter by (e.g., "ballance").
     * @param {Text} order - The order in which to sort the results ("asc" for ascending, "desc" for descending).
     * @param {Int8} comparison - The comparison operator to use (1 for greater than or equal, 0 for equal, -1 for less than or equal).
     * @param {Nat} numQuery - The value to compare the attribute against.
     * @param {Nat} count - The maximum number of renters to return.
     * @return {async [Renter]} - A list of renters that match the specified criteria, sorted by the specified order.
     */
    public query func getRenterFromNatAttribute(attribute: Text, order: Text, comparison: Int8, numQuery: Nat, count: Nat): async [Renter] {
        var renterArray: [Renter] = [];

        for (renter in renterProfiles.vals()) {
            if (renterArray.size() >= count) {
                return sort<Renter>(renterArray, if (order == "asc") natCompareAsc else natCompareDesc, attribute);
            };

            let value = switch (attribute) {
                case ("ballance") { renter.ballance };
                case (_) { 0 };
            };

            let shouldAdd: Bool = switch (comparison) {
                case (1) { value >= numQuery };
                case (0) { value == numQuery };
                case (-1) { value <= numQuery };
                case (_) { value == numQuery };
            };

            if (shouldAdd) {
                renterArray := Array.append<Renter>(renterArray, [renter]);
            };
        };

        return sort<Renter>(renterArray, if (order == "asc") natCompareAsc else natCompareDesc, attribute);
    };

    private func natCompareAsc(x_renter: Renter, y_renter: Renter, attribute: Text): Order.Order {
        switch (attribute) {
            case ("ballance") { if (x_renter.ballance > y_renter.ballance) #greater else if (x_renter.ballance == y_renter.ballance) #equal else #less };
            case (_) { #equal };
        };
    };

    private func natCompareDesc(x_renter: Renter, y_renter: Renter, attribute: Text): Order.Order {
        switch (attribute) {
            case ("ballance") { if (x_renter.ballance < y_renter.ballance) #greater else if (x_renter.ballance == y_renter.ballance) #equal else #less };
            case (_) { #equal };
        };
    };

};