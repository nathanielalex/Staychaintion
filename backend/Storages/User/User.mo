import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Error "mo:base/Error";
import Iter "mo:base/Iter";
import Util "../Util";
import { print } "mo:base/Debug";
import Array "mo:base/Array";
import Order "mo:base/Order";
// import Option "mo:base/Option";
import { unwrap } "mo:base/Option";
import Property "canister:Property_backend";
import { sort; optfilter; optAppend } = "../Util";

actor {

    type UserProfile = Util.UserProfile;
    type UserRole = Util.UserRole;

    var userProfiles = TrieMap.TrieMap<Principal, UserProfile>(Principal.equal, Principal.hash);

    stable var stableUserProfile: [(Principal, UserProfile)] = [];

    system func preupgrade() {
        stableUserProfile := Iter.toArray(userProfiles.entries());
    };

    system func postupgrade() {
        userProfiles := TrieMap.fromEntries<Principal, UserProfile>(Iter.fromArray(stableUserProfile), Principal.equal, Principal.hash);
    };

    public shared func registerUser(prof: UserProfile) : async Nat {
        try {
            userProfiles.put(prof.id, prof);
            return 1;
        } catch (e: Error) {
            print("Error registering user: " # Error.message(e));
            return 0;
        };
    };

    public shared func updateUser(prof : UserProfile) : async Nat {

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

    public query func getUserBalance(id: Principal) : async Nat {
        switch (userProfiles.get(id)) {
            case null { return 0 };
            case (?user) { return user.ballance };
        };
    };

    public query func isAdmin(id: Principal): async Bool {
        switch (userProfiles.get(id)) {
            case null { return false };
            case (?user) { return user.role == #admin };
        };
    };

    public query func isRenter(id: Principal): async Bool {
        switch (userProfiles.get(id)) {
            case null { return false };
            case (?user) { return user.role == #renter };
        };
    };

    public query func isUser(id: Principal): async Bool {
        switch (userProfiles.get(id)) {
            case null { return false };
            case (?user) { return user.role == #user };
        };
    };

    public query func getRole(id: Principal): async UserRole {
        switch (userProfiles.get(id)) {
            case null { return #guest };
            case (?user) { return user.role };
        };
    };

    public shared func updateUserBalance(id: Principal, newBalance: Nat) : async Nat {
        switch (userProfiles.get(id)) {
            case null { return 0 };
            case (?user) {
                var prof: UserProfile = {
                    id = user.id;
                    role = user.role;
                    fullName = user.fullName;
                    email = user.email;
                    dateOfBirth = user.dateOfBirth;
                    ballance = newBalance;
                    profilePictureUrl = user.profilePictureUrl;
                    propertiesId =  user.propertiesId;
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

    public query func getUserFromName(name_query:Text): async [UserProfile]{
        var user_array: [UserProfile] = [];
        for(user in userProfiles.vals()){
            if(Text.contains(user.fullName, #text(name_query))){
                user_array := Array.append<UserProfile>(user_array, [user]);
            };
        };
        return user_array;
    };

    public shared func registerNewPropertyToUser(userId: Principal, property: Util.UnregisteredProperty) : async Nat {
        switch (userProfiles.get(userId)) {
            case null { return 0 };
            case (?user) {
                
                let propId: Text = await Property.registerProperty(property);
                var prof: UserProfile = {
                    id = user.id;
                    role = user.role;
                    fullName = user.fullName;
                    email = user.email;
                    dateOfBirth = user.dateOfBirth;
                    ballance = user.ballance;
                    profilePictureUrl = user.profilePictureUrl;
                    propertiesId = optAppend<Text>(user.propertiesId, ?[propId]);
                };

                try {
                    userProfiles.delete(prof.id);
                    userProfiles.put(prof.id, prof);
                    return 1;
                } catch (e: Error) {
                    print("Error adding property to user: " # Error.message(e));
                    return 0;
                };
            };
        };
    };

    public shared func removePropertyFromUser(userId: Principal, propertyId: Text) : async Nat {
        switch (userProfiles.get(userId)) {
            case null { return 0 };
            case (?user) {
                var prof: UserProfile = {
                    id = user.id;
                    role = user.role;
                    fullName = user.fullName;
                    email = user.email;
                    dateOfBirth = user.dateOfBirth;
                    ballance = user.ballance;
                    profilePictureUrl = user.profilePictureUrl;
                    propertiesId = optfilter<Text>(user.propertiesId, func (propId: Text) { propId != propertyId });
                };

                try {
                    userProfiles.delete(prof.id);
                    userProfiles.put(prof.id, prof);
                    return 1;
                } catch (e: Error) {
                    print("Error removing property from user: " # Error.message(e));
                    return 0;
                };
            };
        };
    };

    public shared func getUserProperties(userId: Principal) : async [Property.Property] {
        switch (userProfiles.get(userId)) {
            case null { return [] };
            case (?user) {
                switch(user.propertiesId){
                    case (null){return []};
                    case (?propIds){
                        var properties: [Property.Property] = [];
                        for (propId in propIds.vals()) {
                            switch (await Property.getPropertyInfo(propId)) {
                                case (null) {  };
                                case (?prop) { properties := Array.append<Property.Property>(properties, [prop]) };
                            };
                        };
                        return properties;
                    };
                };
            };
        };
    };

    /**
     * Retrieves a list of users based on a specified text attribute and query.
     *
     * @param {Text} attribute - The attribute of the user to search by. 
     * Possible values are "id", "fullName", "email", "dateOfBirth", "profilePictureUrl".
     * @param {Text} text_query - The text value to search for in the specified attribute.
     * @param {Nat} count - The maximum number of users to return.
     * @return {async [User]} - An array of users that match the search criteria.
     */
    public query func getUserFromTextAttribute(attribute: Text, text_query: Text, count: Nat): async [UserProfile] {
        var userArray: [UserProfile] = [];

        for (user in userProfiles.vals()) {
            if (userArray.size() >= count) {
                return userArray;
            };

            let value = switch (attribute) {
                case ("id") { Principal.toText(user.id) };
                case ("fullName") { user.fullName };
                case ("email") { user.email };
                case ("dateOfBirth") { user.dateOfBirth };
                case ("profilePictureUrl") { user.profilePictureUrl };
                case (_) { "" };
            };

            if (Text.contains(value, #text(text_query))) {
                userArray := Array.append<UserProfile>(userArray, [user]);
            };
        };

        return userArray;
    };

    /**
     * Retrieves a list of users based on a specified attribute, order, comparison, and query parameters.
     *
     * @param {Text} attribute - The attribute of the user to filter by (e.g., "ballance").
     * @param {Text} order - The order in which to sort the results ("asc" for ascending, "desc" for descending).
     * @param {Int8} comparison - The comparison operator to use (1 for greater than or equal, 0 for equal, -1 for less than or equal).
     * @param {Nat} numQuery - The value to compare the attribute against.
     * @param {Nat} count - The maximum number of users to return.
     * @return {async [User]} - A list of users that match the specified criteria, sorted by the specified order.
     */
    public query func getUserFromNatAttribute(attribute: Text, order: Text, comparison: Int8, numQuery: Nat, count: Nat): async [UserProfile] {
        var userArray: [UserProfile] = [];

        for (user in userProfiles.vals()) {
            if (userArray.size() >= count) {
                return sort<UserProfile>(userArray, if (order == "asc") natCompareAsc else natCompareDesc, attribute);
            };

            let value = switch (attribute) {
                case ("ballance") { user.ballance };
                case (_) { 0 };
            };

            let shouldAdd: Bool = switch (comparison) {
                case (1) { value >= numQuery };
                case (0) { value == numQuery };
                case (-1) { value <= numQuery };
                case (_) { value == numQuery };
            };

            if (shouldAdd) {
                userArray := Array.append<UserProfile>(userArray, [user]);
            };
        };

        return sort<UserProfile>(userArray, if (order == "asc") natCompareAsc else natCompareDesc, attribute);
    };

    public query func getUserFromRole(roleQuery: UserRole, count: Nat): async [UserProfile] {
        var userArray: [UserProfile] = [];

        for (user in userProfiles.vals()) {
            if (userArray.size() >= count) {
                return userArray;
            };
            if(user.role == roleQuery) {
                userArray := Array.append<UserProfile>(userArray, [user]);
            };
        };

        return userArray;
    };

    private func natCompareAsc(x_user: UserProfile, y_user: UserProfile, attribute: Text): Order.Order {
        switch (attribute) {
            case ("ballance") { if (x_user.ballance > y_user.ballance) #greater else if (x_user.ballance == y_user.ballance) #equal else #less };
            case (_) { #equal };
        };
    };

    private func natCompareDesc(x_user: UserProfile, y_user: UserProfile, attribute: Text): Order.Order {
        switch (attribute) {
            case ("ballance") { if (x_user.ballance < y_user.ballance) #greater else if (x_user.ballance == y_user.ballance) #equal else #less };
            case (_) { #equal };
        };
    };



};