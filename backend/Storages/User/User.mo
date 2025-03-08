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
import Float "mo:base/Float";
import Vector "mo:vector/Class";
import Property "canister:Property_backend";
import { userRoleVal; sort; optfilter; optAppend } = "../Util";

actor {

    type UserProfile = Util.UserProfile;

    var userProfiles = TrieMap.TrieMap<Principal, UserProfile>(Principal.equal, Principal.hash);

    stable var stableUserProfile: [(Principal, UserProfile)] = [];

    system func preupgrade() {
        stableUserProfile := Iter.toArray(userProfiles.entries());
    };

    system func postupgrade() {
        userProfiles := TrieMap.fromEntries<Principal, UserProfile>(Iter.fromArray(stableUserProfile), Principal.equal, Principal.hash);
    };

    public shared func registerUser(prof: UserProfile) : async Nat {
        if(userRoleVal(prof.role)){
            try {
                userProfiles.put(prof.id, prof);
                return 1;
            } catch (e: Error) {
                print("Error registering user: " # Error.message(e));
                return 0;
            };
        };
        return 0;
    };

    public shared func updateUser(prof : UserProfile) : async Nat {
        if(userRoleVal(prof.role)){
            try {
                userProfiles.put(prof.id, prof);
                return 1;
            } catch (e: Error) {
                print("Error updating user: " # Error.message(e));
                return 0;
            };
        };
        return 0;
    };

    public query func getUser(id: Principal) : async ?UserProfile {
        return userProfiles.get(id);
    };

    public query func getAllUser(count: Nat) : async [UserProfile] {
        var userArray: [UserProfile] = [];
        for (user in userProfiles.vals()) {
            if (userArray.size() >= count) {
                return userArray;
            };
            userArray := Array.append<UserProfile>(userArray, [user]);
        };
        return userArray;
    };

    public query func getUserBalance(id: Principal) : async Float {
        switch (userProfiles.get(id)) {
            case null { return 0 };
            case (?user) { return user.balance };
        };
    };

    public query func getUserWalletId(id: Principal) : async ?Principal {
        switch (userProfiles.get(id)) {
            case null { return null };
            case (?user) { return user.walletId };
        };
    };

    public query func isAdmin(id: Principal): async Bool {
        switch (userProfiles.get(id)) {
            case null { return false };
            case (?user) { return user.role == "admin" };
        };
    };

    public query func isOwner(id: Principal): async Bool {
        switch (userProfiles.get(id)) {
            case null { return false };
            case (?user) { return user.role == "owner" };
        };
    };

    public query func isRenter(id: Principal): async Bool {
        switch (userProfiles.get(id)) {
            case null { return false };
            case (?user) { return user.role == "renter" };
        };
    };

    public query func getRole(id: Principal): async Text {
        switch (userProfiles.get(id)) {
            case null { return "User not found" };
            case (?user) { return user.role };
        };
    };

    public shared func updateUserBalance(id: Principal, newBalance: Float) : async Nat {
        switch (userProfiles.get(id)) {
            case null { return 0 };
            case (?user) {
                let updatedUser = {
                    user with
                    balance = newBalance;
                };
                
                try {
                    userProfiles.put(id, updatedUser);
                    return 1;
                } catch (e: Error) {
                    print("Error updating user balance: " # Error.message(e));
                    return 0;
                };
            };
        };
    };

    public shared func registerNewPropertyToUser(userId: Principal, property: Util.UnregisteredProperty) : async Nat {
        switch (userProfiles.get(userId)) {
            case null { return 0 };
            case (?user) {
                let propId: Text = await Property.registerProperty(property);
                if(propId == "") {
                    return 0;
                };

                let newPropertiesId = optAppend<Text>(user.propertiesId, ?[propId]);
                
                let updatedUser = {
                    user with
                    propertiesId = newPropertiesId;
                };

                try {
                    userProfiles.put(userId, updatedUser);
                    return 1;
                } catch (e: Error) {
                    print("Error adding property to user: " # Error.message(e));
                    return 0;
                };
            };
        };
    };

    public shared func transferPropertyToUser(userId:Principal, propertyId: Text): async Nat{
        switch (userProfiles.get(userId)) {
            case null { return 0 };
            case (?user) {
                let newPropertiesId = optAppend<Text>(user.propertiesId, ?[propertyId]);
                
                let updatedUser = {
                    user with
                    propertiesId = newPropertiesId;
                };

                switch(await Property.getPropertyInfo(propertyId)){
                    case null { return 0 };
                    case (?prop) { 
                        let updatedProp: Property.Property = {
                            prop with
                            owner = userId;
                        };
                        let resultStatus: Int = await Property.updateProperty(updatedProp);
                        if(resultStatus == 0){
                            return 0;
                        };
                    };
                };

                try {
                    userProfiles.put(userId, updatedUser);
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
                let filteredPropertiesId = optfilter<Text>(
                    user.propertiesId, 
                    func (propId: Text) { propId != propertyId }
                );
                
                let updatedUser = {
                    user with
                    propertiesId = filteredPropertiesId;
                };

                switch(await Property.getPropertyInfo(propertyId)){
                    case null { return 0 };
                    case (?prop) { 
                        let updatedProp: Property.Property = {
                            prop with
                            owner = Principal.fromText("aaaaa-aa");
                            status = "unavailable";
                        };
                        let resultStatus: Int = await Property.updateProperty(updatedProp);
                        if(resultStatus == 0){
                            return 0;
                        };
                    };
                };

                try {
                    userProfiles.put(userId, updatedUser);
                    return 1;
                } catch (e: Error) {
                    print("Error removing property from user: " # Error.message(e));
                    return 0;
                };
            };
        };
    };

    public shared func deletePropertyFromUser(userId: Principal, propertyId: Text) : async Nat {
        switch (userProfiles.get(userId)) {
            case null { return 0 };
            case (?user) {
                let filteredPropertiesId = optfilter<Text>(
                    user.propertiesId, 
                    func (propId: Text) { propId != propertyId }
                );
                
                let updatedUser = {
                    user with
                    propertiesId = filteredPropertiesId;
                };

                try {
                    userProfiles.put(userId, updatedUser);
                    let resultStatus: Int = await Property.removeProperty(propertyId);
                    if(resultStatus == 0){
                        return 0;
                    };
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

    public query func getUserIdFromTextAttribute(attribute: Text, text_query: Text): async [Principal] {
        var itertyp = userProfiles.vals();

        itertyp := Iter.filter<UserProfile>(itertyp, func (user: UserProfile): Bool {
            return Text.contains( switch (attribute) {
                case ("id") { Principal.toText(user.id) };
                case ("fullName") { user.fullName };
                case ("role") { user.role };
                case ("email") { user.email };
                case ("dateOfBirth") { user.dateOfBirth };
                case ("profilePictureUrl") { user.profilePictureUrl };
                case (_) { "" };
            }, #text(text_query));
        });

        return Iter.toArray<Principal>(Iter.map<UserProfile, Principal>(itertyp, func (user: UserProfile): Principal{ return user.id; }));
    };

    public query func getUserIdFromNatAttribute(attribute: Text, comparison: Text, numQuery: Float): async [Principal] {
        var itertyp = userProfiles.vals();
        itertyp := Iter.filter<UserProfile>(itertyp, func (user: UserProfile): Bool {
            let value: Float = switch (attribute) {
                case ("balance") { user.balance };
                case (_) { 0 };
            };

            return switch (comparison) {
                case ("mt") { Float.greaterOrEqual(value, numQuery) };
                case ("eq") { Float.equal(value, numQuery) };
                case ("lt") { Float.lessOrEqual(value, numQuery) };
                case (_) { Float.equal(value, numQuery) };
            };
        });

        return Iter.toArray<Principal>(Iter.map<UserProfile, Principal>(itertyp, func (user: UserProfile): Principal{ return user.id; }));
    };

    public query func getUserFromRole(roleQuery: Text, count: Nat): async [UserProfile] {
        if(count <= 0 or not Util.userRoleVal(roleQuery)) {
            return [];
        };
        
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

    /**
     * Retrieves a paginated list of user profiles based on various filtering and sorting criteria.
     *
     * @param {Text} textAttrs - A string containing text attribute names separated by commas, semicolons, or newlines.
     * @param {Text} textQueries - A string containing text queries corresponding to the text attributes, separated by commas, semicolons, or newlines.
     * @param {Text} numAttrs - A string containing numeric attribute names separated by commas, semicolons, or newlines.
     * @param {Text} numQueries - A string containing numeric queries corresponding to the numeric attributes, separated by commas, semicolons, or newlines.
     * @param {Text} comparisons - A string containing comparison operators (e.g., "mt" for more than/greater than or equal, "eq" for equal, "lt" for less than or equal) separated by commas, semicolons, or newlines.
     * @param {Text} orderAttr - The attribute name by which to sort the results (balance, id, role, fullName, email, dateOfBirth, or profilePictureUrl).
     * @param {Text} orderDir - The direction of sorting, either "asc" for ascending or "desc" for descending.
     * @param {Nat} page - The page number to retrieve (must be greater than 0).
     * @param {Nat} count - The number of user profiles to retrieve per page (must be greater than 0).
     * @returns {async ([UserProfile], Nat)} - A tuple containing an array of user profiles and the count of profiles in the result.
     *
     * The function performs the following steps:
     * 1. Validates that page and count are greater than 0, returning empty results otherwise.
     * 2. Parses the input parameters to extract attribute names, queries, and comparison operators.
     * 3. Filters the user profiles based on the provided text attributes and queries.
     * 4. Filters the user profiles based on the provided numeric attributes, queries, and comparison operators.
     * 5. Sorts the filtered user profiles based on the provided order attribute and direction.
     * 6. Paginates the sorted user profiles based on the provided page number and count.
     * 7. Returns the paginated user profiles along with the count of profiles in the result.
     *
     * The function supports filtering on the following text attributes:
     * - id (Principal as Text)
     * - fullName
     * - role
     * - email
     * - dateOfBirth
     * - profilePictureUrl
     *
     * And the following numeric attributes:
     * - balance (if decimal, use a dot as the decimal separator)
     *
     * Example usage:
     * ```
     * let (profiles, resultCount) = await getUserPaginate(
     *     "fullName,email", "John,example.com",
     *     "balance", "10.5", "mt",
     *     "fullName", "asc",
     *     1, 10
     * );
     * ```
     */
    public query func getUserPaginate(
        queries: Util.PaginationQuery
    ): async ([UserProfile], Nat) {
        if(queries.page <= 0 or queries.count <= 0) {
            return ([], 0);
        };

        // Parse input parameters
        let textAttrIter = Text.tokens(queries.textAttrs, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        let textQueryIter = Text.tokens(queries.textQueries, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        
        let numAttrIter = Text.tokens(queries.numAttrs, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        let numQueryIter = Text.tokens(queries.numQueries, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        let comparIter = Text.tokens(queries.comparisons, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));

        var itertyp = userProfiles.vals();
        var cursor = 0;
        var counter = 0;
        let skip = (queries.page-1)*queries.count;

        // Filter by text attributes
        loop {
            switch(textAttrIter.next(), textQueryIter.next()) {
                case(?attr, ?quer) {
                    itertyp := Iter.filter<UserProfile>(itertyp, func (user: UserProfile): Bool {
                        Text.contains(
                            switch (attr) {
                                case("id"){Principal.toText(user.id) : Text};
                                case("fullName"){user.fullName};
                                case("role"){user.role};
                                case("email"){user.email};
                                case("dateOfBirth"){user.dateOfBirth};
                                case("profilePictureUrl"){user.profilePictureUrl};
                                case (_) { "" };                
                            }, 
                            #text(quer)
                        );
                    });
                };
                case(null, null) { 
                    loop {
                        switch(numAttrIter.next(), numQueryIter.next(), comparIter.next()) {
                            case(?attr, ?quer, ?comp) {
                                let query_float = Util.textToFloat(quer);
                                itertyp := Iter.filter<UserProfile>(itertyp, func (user: UserProfile): Bool {
                                    let value: Float = switch (attr) {
                                        case ("balance") { user.balance };
                                        case (_) { 0 };
                                    };

                                    switch (comp) {
                                        case ("mt") { Float.greaterOrEqual(value, query_float) };
                                        case ("eq") { Float.equal(value, query_float) };
                                        case ("lt") { Float.lessOrEqual(value, query_float) };
                                        case (_) { Float.equal(value, query_float) };
                                    };
                                });
                            };
                            case(null, null, null) { 
                                let sorted = if(switch(queries.orderAttr) {
                                    case ("balance") { true };
                                    case ("id"){ true };
                                    case ("role"){ true };
                                    case ("fullName"){ true };
                                    case ("email"){ true };
                                    case ("dateOfBirth"){ true };
                                    case ("profilePictureUrl"){ true };
                                    case (_){ false };
                                }) {
                                    sort<UserProfile>(Iter.toArray<UserProfile>(itertyp), if (queries.orderDir == "asc") compareAsc else compareDesc, queries.orderAttr)
                                } else Iter.toArray<UserProfile>(itertyp);

                                let paginated = Iter.filter<UserProfile>(Iter.fromArray(sorted), func (prop: UserProfile): Bool {
                                    cursor += 1;
                                    if (cursor > skip and counter < queries.count) {
                                        counter += 1;
                                        true;
                                    } else false;
                                });
                                return (Iter.toArray<UserProfile>(paginated), counter);
                            };
                            case(_) { return ([], 0); };
                        };
                    };
                }; // want to break here
                case(_) { return ([], 0); };
            };
        };
    };

    public query func getUsers(userIds: [Principal]): async [UserProfile] {
        let vec = Vector.Vector<UserProfile>();
        for(userId in userIds.vals()){
            switch(userProfiles.get(userId)){
                case (?user) { vec.add(user) };
                case (null) {};
            };
        };
        return Vector.toArray<UserProfile>(vec);
    };

    private func compareAsc(x_user: UserProfile, y_user: UserProfile, attribute: Text): Order.Order {
        switch (attribute) {
            case ("balance") { if (Float.less(x_user.balance, y_user.balance)) #less else if (Float.equal(x_user.balance, y_user.balance)) #equal else #greater };
            case ("id") { if (Text.less(Principal.toText(x_user.id), Principal.toText(y_user.id))) #less else if (Principal.toText(x_user.id) == Principal.toText(y_user.id)) #equal else #greater };
            case ("role") { if (Text.less(x_user.role, y_user.role)) #less else if (x_user.role == y_user.role) #equal else #greater };
            case ("fullName") { if (Text.less(x_user.fullName, y_user.fullName)) #less else if (x_user.fullName == y_user.fullName) #equal else #greater };
            case ("email") { if (Text.less(x_user.email, y_user.email)) #less else if (x_user.email == y_user.email) #equal else #greater };
            case ("dateOfBirth") { if (Text.less(x_user.dateOfBirth, y_user.dateOfBirth)) #less else if (x_user.dateOfBirth == y_user.dateOfBirth) #equal else #greater };
            case ("profilePictureUrl") { if (Text.less(x_user.profilePictureUrl, y_user.profilePictureUrl)) #less else if (x_user.profilePictureUrl == y_user.profilePictureUrl) #equal else #greater };
            case (_) { #equal };
        };
    };

    private func compareDesc(x_user: UserProfile, y_user: UserProfile, attribute: Text): Order.Order {
        switch (attribute) {
            case ("balance") { if (Float.greater(x_user.balance, y_user.balance)) #less else if (Float.equal(x_user.balance, y_user.balance)) #equal else #greater };
            case ("id") { if (Text.greater(Principal.toText(x_user.id), Principal.toText(y_user.id))) #less else if (Principal.toText(x_user.id) == Principal.toText(y_user.id)) #equal else #greater };
            case ("role") { if (Text.greater(x_user.role, y_user.role)) #less else if (x_user.role == y_user.role) #equal else #greater };            
            case ("fullName") { if (Text.greater(x_user.fullName, y_user.fullName)) #less else if (x_user.fullName == y_user.fullName) #equal else #greater };
            case ("email") { if (Text.greater(x_user.email, y_user.email)) #less else if (x_user.email == y_user.email) #equal else #greater };
            case ("dateOfBirth") { if (Text.greater(x_user.dateOfBirth, y_user.dateOfBirth)) #less else if (x_user.dateOfBirth == y_user.dateOfBirth) #equal else #greater };
            case ("profilePictureUrl") { if (Text.greater(x_user.profilePictureUrl, y_user.profilePictureUrl)) #less else if (x_user.profilePictureUrl == y_user.profilePictureUrl) #equal else #greater };
            case (_) { #equal };
        };
    };

};