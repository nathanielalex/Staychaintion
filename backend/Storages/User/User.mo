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
import Vector "mo:vector/Class";
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
                let updatedUser = {
                    user with
                    ballance = newBalance;
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
                case ("role") { Util.userRoleToText(user.role) };
                case ("email") { user.email };
                case ("dateOfBirth") { user.dateOfBirth };
                case ("profilePictureUrl") { user.profilePictureUrl };
                case (_) { "" };
            }, #text(text_query));
        });

        return Iter.toArray<Principal>(Iter.map<UserProfile, Principal>(itertyp, func (user: UserProfile): Principal{ return user.id; }));
    };

    public query func getUserIdFromNatAttribute(attribute: Text, comparison: Int8, numQuery: Nat): async [Principal] {
        var itertyp = userProfiles.vals();

        itertyp := Iter.filter<UserProfile>(itertyp, func (user: UserProfile): Bool {
            let value = switch (attribute) {
                case ("ballance") { user.ballance };
                case (_) { 0 };
            };

            return switch (comparison) {
                case (1) { value >= numQuery };
                case (0) { value == numQuery };
                case (-1) { value <= numQuery };
                case (_) { value == numQuery };
            };
        });

        return Iter.toArray<Principal>(Iter.map<UserProfile, Principal>(itertyp, func (user: UserProfile): Principal{ return user.id; }));
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

    /**
     * Retrieves a paginated list of user profiles based on various filtering and sorting criteria.
     *
     * @param {Text} textAttrs - A string containing text attribute names separated by spaces, commas, semicolons, or newlines.
     * @param {Text} textQueries - A string containing text queries corresponding to the text attributes, separated by spaces, commas, semicolons, or newlines.
     * @param {Text} numAttrs - A string containing numeric attribute names separated by spaces, commas, semicolons, or newlines.
     * @param {Text} numQueries - A string containing numeric queries corresponding to the numeric attributes, separated by spaces, commas, semicolons, or newlines.
     * @param {Text} comparisons - A string containing comparison operators (e.g., "mt" for more than, "eq" for equal, "lt" for less than) separated by spaces, commas, semicolons, or newlines.
     * @param {Text} orderAttr - The attribute name by which to sort the results.
     * @param {Text} orderDir - The direction of sorting, either "asc" for ascending or "desc" for descending.
     * @param {Nat} page - The page number to retrieve.
     * @param {Nat} count - The number of user profiles to retrieve per page.
     * @returns {async ([UserProfile], Nat)} - A tuple containing an array of user profiles and the total number of profiles that match the criteria.
     *
     * The function performs the following steps:
     * 1. Parses the input parameters to extract attribute names, queries, and comparison operators.
     * 2. Filters the user profiles based on the provided text attributes and queries.
     * 3. Filters the user profiles based on the provided numeric attributes, queries, and comparison operators.
     * 4. Paginates the filtered user profiles based on the provided page number and count.
     * 5. Sorts the paginated user profiles based on the provided order attribute and direction.
     * 6. Returns the sorted and paginated user profiles along with the total count of matching profiles (all pages in total).
     *
     * The function uses the following filtering and sorting logic:
     * - Text attributes and queries are matched using the `Text.contains` function.
     * - Numeric attributes are compared using the specified comparison operators ("mt", "eq", "lt").
     * - Sorting is performed based on the specified order attribute and direction.
     * - Pagination is achieved by skipping the appropriate number of profiles and limiting the results to the specified count.
     *
     * Example usage:
     * ```
     * let (profiles, totalCount) = await getUserPaginate(
     *     "fullName,email", "John Doe,johndoe@example.com",
     *     "ballance", "1000", "mt",
     *     "fullName", "asc",
     *     1, 10
     * );
     * ```
     */
    public query func getUserPaginate(
        textAttrs: Text, textQueries: Text,
        numAttrs: Text, numQueries: Text, comparisons: Text,
        orderAttr: Text, orderDir: Text,
        page: Nat, count: Nat
    ): async ([UserProfile], Nat) {
        if(page <= 0 or count <= 0) {
            return ([], 0);
        };

        // Parse input parameters
        let textAttrIter = Text.tokens(textAttrs, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        let textQueryIter = Text.tokens(textQueries, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        
        let numAttrIter = Text.tokens(numAttrs, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        let numQueryIter = Text.tokens(numQueries, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        let comparIter = Text.tokens(comparisons, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));

        var itertyp = userProfiles.vals();
        var cursor = 0;
        var counter = 0;
        let skip = (page-1)*count;

        // Filter by text attributes
        loop {
            switch(textAttrIter.next(), textQueryIter.next()) {
                case(?attr, ?quer) {
                    itertyp := Iter.filter<UserProfile>(itertyp, func (user: UserProfile): Bool {
                        Text.contains(
                            switch (attr) {
                                case("id"){Principal.toText(user.id) : Text};
                                case("fullName"){user.fullName};
                                case("role"){Util.userRoleToText(user.role)};
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
                                itertyp := Iter.filter<UserProfile>(itertyp, func (user: UserProfile): Bool {
                                    let value = switch (attr) {
                                        case ("ballance") { user.ballance };
                                        case (_) { 0 };
                                    };

                                    switch (comp) {
                                        case ("mt") { value >= Util.textToInt(quer) };
                                        case ("eq") { value == Util.textToInt(quer) };
                                        case ("lt") { value <= Util.textToInt(quer) };
                                        case (_) { value == Util.textToInt(quer) };
                                    };
                                });
                            };
                            case(null, null, null) { 
                                let sorted = if(switch(orderAttr) {
                                    case ("ballance") { true };
                                    case ("id"){ true };
                                    case ("fullName"){ true };
                                    case ("email"){ true };
                                    case ("dateOfBirth"){ true };
                                    case ("profilePictureUrl"){ true };
                                    case (_){ true };
                                }) {
                                    sort<UserProfile>(Iter.toArray<UserProfile>(itertyp), if (orderDir == "asc") compareAsc else compareDesc, orderAttr)
                                } else Iter.toArray<UserProfile>(itertyp);

                                let paginated = Iter.filter<UserProfile>(Iter.fromArray(sorted), func (prop: UserProfile): Bool {
                                    cursor += 1;
                                    if (cursor > skip and counter < count) {
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
            case ("ballance") { if (x_user.ballance < y_user.ballance) #less else if (x_user.ballance == y_user.ballance) #equal else #greater };
            case ("id") { if (Text.less(Principal.toText(x_user.id), Principal.toText(y_user.id))) #less else if (Principal.toText(x_user.id) == Principal.toText(y_user.id)) #equal else #greater };
            case ("fullName") { if (Text.less(x_user.fullName, y_user.fullName)) #less else if (x_user.fullName == y_user.fullName) #equal else #greater };
            case ("email") { if (Text.less(x_user.email, y_user.email)) #less else if (x_user.email == y_user.email) #equal else #greater };
            case ("dateOfBirth") { if (Text.less(x_user.dateOfBirth, y_user.dateOfBirth)) #less else if (x_user.dateOfBirth == y_user.dateOfBirth) #equal else #greater };
            case ("profilePictureUrl") { if (Text.less(x_user.profilePictureUrl, y_user.profilePictureUrl)) #less else if (x_user.profilePictureUrl == y_user.profilePictureUrl) #equal else #greater };
            case (_) { #equal };
        };
    };

    private func compareDesc(x_user: UserProfile, y_user: UserProfile, attribute: Text): Order.Order {
        switch (attribute) {
            case ("ballance") { if (x_user.ballance > y_user.ballance) #less else if (x_user.ballance == y_user.ballance) #equal else #greater };
            case ("id") { if (Text.greater(Principal.toText(x_user.id), Principal.toText(y_user.id))) #less else if (Principal.toText(x_user.id) == Principal.toText(y_user.id)) #equal else #greater };
            case ("fullName") { if (Text.greater(x_user.fullName, y_user.fullName)) #less else if (x_user.fullName == y_user.fullName) #equal else #greater };
            case ("email") { if (Text.greater(x_user.email, y_user.email)) #less else if (x_user.email == y_user.email) #equal else #greater };
            case ("dateOfBirth") { if (Text.greater(x_user.dateOfBirth, y_user.dateOfBirth)) #less else if (x_user.dateOfBirth == y_user.dateOfBirth) #equal else #greater };
            case ("profilePictureUrl") { if (Text.greater(x_user.profilePictureUrl, y_user.profilePictureUrl)) #less else if (x_user.profilePictureUrl == y_user.profilePictureUrl) #equal else #greater };
            case (_) { #equal };
        };
    };

};