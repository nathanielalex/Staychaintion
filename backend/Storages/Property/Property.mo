import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Nat8 "mo:base/Nat8";
import Int8 "mo:base/Int8";
import Order "mo:base/Order";
import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import Option "mo:base/Option";
import Float "mo:base/Float";
import Time "mo:base/Time";
import Util "../Util";
import { sort; propStatusVal; propTypeVal } "../Util";
// import Region "mo:base/Region";
import Vector "mo:vector/Class";

actor {

    type Property = Util.Property;
    type Transaction = Util.Transaction;

    var propertyInfo = TrieMap.TrieMap<Text, Property>(Text.equal, Text.hash);
    var transactionHistory = TrieMap.TrieMap<Text, Transaction>(Text.equal, Text.hash);

    stable var stablePropertyInfo: [(Text, Property)] = [];
    stable var stableTransaction: [(Text, Transaction)] = [];

    system func preupgrade()  {
        stablePropertyInfo := Iter.toArray(propertyInfo.entries());
        stableTransaction := Iter.toArray(transactionHistory.entries());
    };

    system func postupgrade() {
        propertyInfo := TrieMap.fromEntries<Text, Property>(Iter.fromArray(stablePropertyInfo), Text.equal, Text.hash);
        transactionHistory := TrieMap.fromEntries<Text, Transaction>(Iter.fromArray(stableTransaction), Text.equal, Text.hash);
    };

    public shared func registerProperty(unreg: Util.UnregisteredProperty) : async Text {   
        if(propTypeVal(unreg.propertyType) == false or propStatusVal(unreg.status) == false) {
            return "";
        };

        let id = await Util.generateUUID();
        // Create property by extending unreg with additional fields
        let prop : Property = {
            id;
            owner = unreg.owner;
            name = unreg.name;
            status = unreg.status; // Default status if not provided
            propertyType = unreg.propertyType;
            pricePerNight = unreg.pricePerNight;
            description = unreg.description;
            location = unreg.location;
            builtInDate = unreg.builtInDate;
            bedroomCount = unreg.bedroomCount;
            guestCapacity = unreg.guestCapacity;
            bathroomCount = unreg.bathroomCount;
            bedCount = unreg.bedCount;
            pictures = unreg.pictures;
            coverPicture = unreg.coverPicture;
            rating = 0; // New properties start with 0 rating
            reviewCount = 0;
        };

        propertyInfo.put(id, prop);
        return id;
    };


    public shared func updateProperty(updatedProp: Property) : async Int {
        if(propTypeVal(updatedProp.propertyType) == false or propStatusVal(updatedProp.status) == false) {
            return 0;
        };

        try {
            propertyInfo.put(updatedProp.id, updatedProp);
            return 1;
        } catch (e: Error) {
            Debug.print("Error updating property: " # Error.message(e));
            return 0;
        };
    };

    public shared func removeProperty(propId: Text) : async Int {
        try {
            propertyInfo.delete(propId);
            return 1;
        } catch (e: Error) {
            Debug.print("Error removing property: " # Error.message(e));
            return 0;
        };
    };

    public query func getPropertyInfo(propertyId: Text) : async ?Property {
        return propertyInfo.get(propertyId);
    };

    public query func getAllProperties() : async [Property] {
        let properties = Vector.Vector<Property>();
        for (p in propertyInfo.vals()) {
            properties.add(p);
        };
        return (Vector.toArray(properties));
    };

    public query func getProperties(count: Nat) : async [Property] {
        var counter = 0;
        let properties = Vector.Vector<Property>();
        for (p in propertyInfo.vals()) {
            if(counter >= count){
                return Vector.toArray(properties)
            };
            properties.add(p);
            counter += 1;
        };
        return (Vector.toArray(properties));
    };

    public query func getOwnerProperties(ownerId: Principal) : async [Property] {
        let properties = Vector.Vector<Property>();
        for (p in propertyInfo.vals()) {
            if(ownerId == p.owner) {
                properties.add(p);
            }
        };
        return (Vector.toArray(properties));
    };

    public query func propertyCount(): async Nat {
        return propertyInfo.size();
    };

    public shared func updatePropertyStatus(propId:Text, status: Text): async Nat{
        if(Util.propStatusVal(status) == false){
            return 0;
        };

        switch(propertyInfo.get(propId)){
            case(null) { return 0; };
            case(?prop) {
                let updatedProp: Property = {
                    prop with
                    status = status;
                };
                propertyInfo.put(propId, updatedProp);
                return 1;
            };
        };
    };

    public query func getPropertyIdFromTextAttribute(attribute: Text, text_query: Text): async [Text] {
        var itertyp = propertyInfo.vals();

        itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
            return Text.contains( switch(attribute){
                case("owner"){Principal.toText(prop.owner) : Text};
                case("name"){prop.name};
                case("status"){prop.status};
                case("propertyType"){prop.status};
                case("location"){prop.location};
                case("builtInDate"){prop.builtInDate};
                case (_) { "" };
            }, #text(text_query));
        });

        return Iter.toArray<Text>(Iter.map<Property, Text>(itertyp, func (prop: Property): Text { prop.id; }));
    };

    public query func getPropIdFromNatAttribute(attribute: Text, order: Text, comparison: Text, numQuery: Float): async [Text] {
        var itertyp = propertyInfo.vals();
        itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
            let value: Float = switch (attribute) {
                case ("pricePerNight") { prop.pricePerNight };
                case ("bedroomCount") { Float.fromInt(prop.bedroomCount) };
                case ("guestCapacity") { Float.fromInt(prop.guestCapacity) };
                case ("bathroomCount") { Float.fromInt(prop.bathroomCount) };
                case ("bedCount") { Float.fromInt(prop.bedCount) };
                case ("rating") { prop.rating };
                case (_) { 0 };
            };

            switch (comparison) {
                case ("mt") { Float.greaterOrEqual(value, numQuery) };
                case ("eq") { Float.equal(value, numQuery) };
                case ("lt") { Float.lessOrEqual(value, numQuery) };
                case (_) { Float.equal(value, numQuery) };
            };
        });

        return Iter.toArray<Text>(Iter.map<Property, Text>(itertyp, func (prop: Property): Text{ return prop.id; }));
    };

    private func compareAsc(p1: Property, p2: Property, attr: Text): Order.Order {
        switch(attr) {
            case("pricePerNight") { if (Float.less(p1.pricePerNight, p2.pricePerNight)) #less else if (Float.equal(p1.pricePerNight, p2.pricePerNight)) #equal else #greater };
            case("bedroomCount") { if (p1.bedroomCount < p2.bedroomCount) #less else if (p1.bedroomCount == p2.bedroomCount) #equal else #greater };
            case("guestCapacity") { if (p1.guestCapacity < p2.guestCapacity) #less else if (p1.guestCapacity == p2.guestCapacity) #equal else #greater };
            case("bathroomCount") { if (p1.bathroomCount < p2.bathroomCount) #less else if (p1.bathroomCount == p2.bathroomCount) #equal else #greater };
            case("bedCount") { if (p1.bedCount < p2.bedCount) #less else if (p1.bedCount == p2.bedCount) #equal else #greater };
            case("rating") { if (Float.less(p1.rating, p2.rating)) #less else if (Float.equal(p1.rating, p2.rating)) #equal else #greater };
            case("owner") { if (Text.less(Principal.toText(p1.owner), Principal.toText(p2.owner))) #less else if (Principal.toText(p1.owner) == Principal.toText(p2.owner)) #equal else #greater };
            case("name") { if (Text.less(p1.name, p2.name)) #less else if (p1.name == p2.name) #equal else #greater };
            case("status") { if (Text.less(p1.status, p2.status)) #less else if (p1.status == p2.status) #equal else #greater };
            case("propertyType") { if (Text.less(p1.propertyType, p2.propertyType)) #less else if (p1.propertyType == p2.propertyType) #equal else #greater };
            case("location") { if (Text.less(p1.location, p2.location)) #less else if (p1.location == p2.location) #equal else #greater };
            case("builtInDate") { if (Text.less(p1.builtInDate, p2.builtInDate)) #less else if (p1.builtInDate == p2.builtInDate) #equal else #greater };
            case(_) { #equal };
        };
    };

    private func compareDesc(p1: Property, p2: Property, attr: Text): Order.Order {
        switch(attr) {
            case("pricePerNight") { if (Float.greater(p1.pricePerNight, p2.pricePerNight)) #less else if (Float.equal(p1.pricePerNight, p2.pricePerNight)) #equal else #greater };
            case("bedroomCount") { if (p1.bedroomCount > p2.bedroomCount) #less else if (p1.bedroomCount == p2.bedroomCount) #equal else #greater };
            case("guestCapacity") { if (p1.guestCapacity > p2.guestCapacity) #less else if (p1.guestCapacity == p2.guestCapacity) #equal else #greater };
            case("bathroomCount") { if (p1.bathroomCount > p2.bathroomCount) #less else if (p1.bathroomCount == p2.bathroomCount) #equal else #greater };
            case("bedCount") { if (p1.bedCount > p2.bedCount) #less else if (p1.bedCount == p2.bedCount) #equal else #greater };
            case("rating") { if (Float.greater(p1.rating, p2.rating)) #less else if (Float.equal(p1.rating, p2.rating)) #equal else #greater };
            case("owner") { if (Text.greater(Principal.toText(p1.owner), Principal.toText(p2.owner))) #less else if (Principal.toText(p1.owner) == Principal.toText(p2.owner)) #equal else #greater };
            case("name") { if (Text.greater(p1.name, p2.name)) #less else if (p1.name == p2.name) #equal else #greater };
            case("status") { if (Text.greater(p1.status, p2.status)) #less else if (p1.status == p2.status) #equal else #greater };
            case("propertyType") { if (Text.greater(p1.propertyType, p2.propertyType)) #less else if (p1.propertyType == p2.propertyType) #equal else #greater };
            case("location") { if (Text.greater(p1.location, p2.location)) #less else if (p1.location == p2.location) #equal else #greater };
            case("builtInDate") { if (Text.greater(p1.builtInDate, p2.builtInDate)) #less else if (p1.builtInDate == p2.builtInDate) #equal else #greater };
            case(_) { #equal };
        };
    };

    /**
     * Retrieves a paginated list of properties based on various filtering and sorting criteria.
     *
     * @param {Text} textAttrs - A string containing text attribute names separated by commas, semicolons, or newlines.
     * @param {Text} textQueries - A string containing text queries corresponding to the text attributes, separated by commas, semicolons, or newlines.
     * @param {Text} numAttrs - A string containing numeric attribute names separated by commas, semicolons, or newlines.
     * @param {Text} numQueries - A string containing numeric queries corresponding to the numeric attributes, separated by commas, semicolons, or newlines.
     * @param {Text} comparisons - A string containing comparison operators (e.g., "mt" for more than/greater than or equal, "eq" for equal, "lt" for less than or equal) separated by commas, semicolons, or newlines.
     * @param {Text} orderAttr - The attribute name by which to sort the results.
     * @param {Text} orderDir - The direction of sorting, either "asc" for ascending or "desc" for descending.
     * @param {Nat} page - The page number to retrieve (must be greater than 0).
     * @param {Nat} count - The number of properties to retrieve per page (must be greater than 0).
     * @returns {async ([Property], Nat)} - A tuple containing an array of properties and the count of properties in the result.
     *
     * The function performs the following steps:
     * 1. Validates that page and count are greater than 0, returning empty results otherwise.
     * 2. Parses the input parameters to extract attribute names, queries, and comparison operators.
     * 3. Filters the properties based on the provided text attributes and queries.
     * 4. Filters the properties based on the provided numeric attributes, queries, and comparison operators.
     * 5. Sorts the filtered properties based on the provided order attribute and direction.
     * 6. Paginates the sorted properties based on the provided page number and count.
     * 7. Returns the paginated properties along with the count of properties in the result.
     *
     * The function supports filtering on the following text attributes:
     * - owner (Principal as Text)
     * - name
     * - status
     * - propertyType
     * - location
     * - builtInDate
     *
     * And the following numeric attributes:
     * - pricePerNight (if decimal, use a dot as the decimal separator)
     * - bedroomCount
     * - guestCapacity
     * - bathroomCount
     * - bedCount
     * - rating
     *
     * Example usage:
     * ```
     * let (properties, total) = await getPropertyPaginate(
     *     "name,location", "Luxury,Thailand",
     *     "pricePerNight,bedCount", "12.5,2", "mt,eq",
     *     "pricePerNight", "asc",
     *     1, 10
     * );
     * ```
     */
    public query func getPropertyPaginate(
        queries: Util.PaginationQuery
    ): async ([Property], Nat) {
        if(queries.page <= 0 or queries.count <= 0) {
            return ([], 0);
        };

        // Parse input parameters
        let textAttrIter = Text.tokens(queries.textAttrs, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        let textQueryIter = Text.tokens(queries.textQueries, #predicate(func(c):Bool{ c==',' or c==';' or c=='\n' }));
        
        let numAttrIter = Text.tokens(queries.numAttrs, #predicate(func(c):Bool{ c==' ' or c == ',' or c==';' or c=='\n' }));
        let numQueryIter = Text.tokens(queries.numQueries, #predicate(func(c):Bool{ c==' ' or c == ',' or c==';' or c=='\n' }));
        let comparIter = Text.tokens(queries.comparisons, #predicate(func(c):Bool{ c==' ' or c == ',' or c==';' or c=='\n' }));

        var itertyp = propertyInfo.vals();
        var cursor = 0;
        var counter = 0;
        let skip = (queries.page-1)*queries.count;

        // Filter by text attributes
        loop {
            switch(textAttrIter.next(), textQueryIter.next()) {
                case(?attr, ?quer) {
                    itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
                        Text.contains(
                            switch (attr) {
                                case("owner"){Principal.toText(prop.owner) : Text};
                                case("name"){prop.name};
                                case("status"){prop.status};
                                case("propertyType"){prop.propertyType};
                                case("location"){prop.location};
                                case("builtInDate"){prop.builtInDate};
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
                                itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
                                    let value: Float = switch (attr) {
                                        case ("pricePerNight") { prop.pricePerNight };
                                        case ("bedroomCount") { Float.fromInt(prop.bedroomCount) };
                                        case ("guestCapacity") { Float.fromInt(prop.guestCapacity) };
                                        case ("bathroomCount") { Float.fromInt(prop.bathroomCount) };
                                        case ("bedCount") { Float.fromInt(prop.bedCount) };
                                        case ("rating") { prop.rating };
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
                                    case("pricePerNight") { true };
                                    case("bedroomCount") { true };
                                    case("guestCapacity") { true };
                                    case("bathroomCount") { true };
                                    case("bedCount") { true };
                                    case("rating") { true };
                                    case("owner") { true };
                                    case("name") { true };
                                    case("status") { true };
                                    case("propertyType") { true };
                                    case("location") { true };
                                    case("builtInDate") { true };
                                    case(_) { false };
                                }) {
                                    sort<Property>(Iter.toArray<Property>(itertyp), if (queries.orderDir == "asc") compareAsc else compareDesc, queries.orderAttr)
                                } else Iter.toArray<Property>(itertyp);

                                let paginated = Iter.filter<Property>(Iter.fromArray(sorted), func (prop: Property): Bool {
                                    cursor += 1;
                                    if (cursor > skip and counter < queries.count) {
                                        counter += 1;
                                        true;
                                    } else false;
                                });
                                return (Iter.toArray<Property>(paginated), counter);
                            };
                            case(_) { return ([], 0); };
                        };
                    };
                }; // want to break here
                case(_) { return ([], 0); };
            };
        };
    };

    public query func getProperty(propIds: [Text]): async [Property] {
        let vec = Vector.Vector<Property>();
        for(propId in propIds.vals()){
            switch(propertyInfo.get(propId)){
                case (?prop) { vec.add(prop) };
                case (null) {};
            };
        };
        return Vector.toArray<Property>(vec);
    };

    type PropertyReview = Util.PropertyReview;
    var reviews = TrieMap.TrieMap<Text, PropertyReview>(Text.equal, Text.hash);
    var averageRatings = TrieMap.TrieMap<Text, Float>(Text.equal, Text.hash);

    public shared func addReview(newPropertyId: Text, newReviewer: Principal, newReviewerName: Text, newReviewerPP: Text, newRating: Float, newReviewText: Text, newReviewDate: Text) : async Text {         
        let id = await Util.generateUUID();
        let review : PropertyReview = {
            reviewId = id;
            propertyId = newPropertyId;
            reviewer = newReviewer;
            reviewerName = newReviewerName;
            reviwerPP = newReviewerPP;
            rating = newRating;
            reviewText = newReviewText;
            reviewDate = newReviewDate; 
        };
        
        let currProperty = propertyInfo.get(newPropertyId);
        
        switch (currProperty) {
            case (?property) {
                // If property exists, calculate new average rating
                let currentRating = property.rating;
                let currentCount = property.reviewCount; // Assuming property has reviewCount to track the number of reviews

                let newAvgRating = switch (currentRating) {
                    case (avg) {
                        // Calculate new average rating with the existing rating and the new one
                        let totalRatings = avg * Float.fromInt(currentCount) + newRating;
                        let totalReviews = currentCount + 1;
                        totalRatings / Float.fromInt(totalReviews);
                    };
                    case none {
                        // If no previous rating, set the new rating directly
                        newRating
                    };
                };
                
                // Create a new property object with updated rating
                let updatedProperty : Property = {
                    id = property.id;
                    owner = property.owner;
                    name = property.name;
                    status = property.status;
                    propertyType = property.propertyType;
                    pricePerNight = property.pricePerNight;
                    description = property.description;
                    location = property.location;
                    builtInDate = property.builtInDate;
                    bedroomCount = property.bedroomCount;
                    guestCapacity = property.guestCapacity;
                    bathroomCount = property.bathroomCount;
                    bedCount = property.bedCount;
                    pictures = property.pictures;
                    coverPicture = property.coverPicture;
                    rating = newAvgRating;
                    reviewCount = currentCount + 1; // Increment review count
                };
                
                // Update the property with new average rating
                let updateResult = await updateProperty(updatedProperty);
                
                if (updateResult == 1) {
                    // Successfully updated property, now add the review
                    reviews.put(id, review);
                    return id;
                } else {
                    // If property update failed
                    return "Failed to update property. Review not added.";
                }
            };
            case null {
                // If property doesn't exist
                Debug.print("Error: Property is null.");
                return "Property not found.";
            };
        };
    };

    public query func getAllPropertyReviews(propertyId: Text) : async [PropertyReview] {
        let reviews = Vector.Vector<PropertyReview>();
        for (r in reviews.vals()) {
            if(propertyId == r.propertyId) {
                reviews.add(r);
            }
        };
        return (Vector.toArray(reviews));
    };

    /**
     * Transaction Management Module
     * This module provides functions to create, update, and manage property rental transactions.
     * 
     * TRANSACTION FUNCTIONS:
     * 
     * initiateTransaction:
     * Creates a new transaction for property booking with a unique ID.
     * Returns the generated transaction ID or an empty string if validation fails.
     * One property can only have one ongoing transaction at a time.
     * @param newTransaction - An UnregisteredTransaction object without an ID
     * @return Text - The generated transaction ID or empty string on failure
     * 
     * updateTransaction:
     * Updates an existing transaction with new details.
     * @param updatedTransaction - A Transaction object with modified fields
     * @return Int - 1 on success, 0 on failure
     * 
     * changeTransactionStatus:
     * Modifies the status of an existing transaction.
     * Valid statuses are enforced by Util.transactionStatusVal.
     * @param transactionId - The ID of the transaction to update
     * @param newStatus - The new status to set
     * @return Int - 1 on success, 0 on failure
     * 
     * removeTransaction:
     * Deletes a transaction from the system.
     * @param transactionId - The ID of the transaction to remove
     * @return Int - 1 on success, 0 on failure
     * 
     * getTransactionStatus:
     * Retrieves the current status of a transaction.
     * @param transactionId - The ID of the transaction
     * @return Text - The status of the transaction or empty string if not found
     * 
     * getTransactionByStatus:
     * Returns all transactions matching a specified status.
     * @param status - The transaction status to filter by
     * @return [Transaction] - Array of transactions with the specified status
     * 
     * getUserTransactionHistoryPaginate:
     * Gets a paginated list of transactions for a specific user, optionally filtered by status.
     * Results are sorted by transaction status priority and check-in date.
     * @param userId - The Principal ID of the user
     * @param status - Optional status filter
     * @param page - Page number (starting from 1)
     * @param count - Number of items per page
     * @return ([Transaction], Nat) - Tuple of transactions array and total count
     * 
     * getPropertyTransactionHistory:
     * Retrieves all transactions related to a specific property.
     * @param propertyId - The ID of the property
     * @return [Transaction] - Array of transactions for the property
     * 
     * getTransaction:
     * Gets the details of a specific transaction.
     * @param transactionId - The ID of the transaction
     * @return ?Transaction - Optional transaction details (null if not found)
     */
    // Transaction functions
    public shared func initiateTransaction(newTransaction: Util.UnregisteredTransaction) : async Text {   
        if(Util.transactionStatusVal(newTransaction.transactionStatus) == false) {
            return "";
        };

        for (p in transactionHistory.vals()) {
            // Check if property is already on a transaction and is not completed or cancelled then it's not eligible for a new transaction
            // one property can only have one ongoing transaction at a time (waiting payment, booked, checkin, checkout)
            if(newTransaction.propertyId == p.propertyId and not (newTransaction.transactionStatus == "completed" or newTransaction.transactionStatus == "cancelled") and p.transactionStatus == newTransaction.transactionStatus) {
                return "";
            };
        };
        
        let id = await Util.generateUUID();
        let transaction : Transaction = {
            newTransaction with
            id = id;
        };

        transactionHistory.put(id, transaction);
        return id;
    };

    public shared func updateTransaction(updatedTransaction: Transaction) : async Int {
        try {
            transactionHistory.put(updatedTransaction.id, updatedTransaction);
            return 1;
        } catch (e: Error) {
            Debug.print("Error updating transaction: " # Error.message(e));
            return 0;
        };
    };

    public shared func changeTransactionStatus(transactionId: Text, newStatus: Text) : async Int {
        if(Util.transactionStatusVal(newStatus) == false){
            return 0;
        };

        switch(transactionHistory.get(transactionId)){
            case(null) { return 0; };
            case(?transaction) {
                let updatedTransaction: Transaction = {
                    transaction with
                    status = newStatus;
                };
                transactionHistory.put(transactionId, updatedTransaction);
                return 1;
            };
        };
    };

    public shared func removeTransaction(transactionId: Text) : async Int {
        try {
            transactionHistory.delete(transactionId);
            return 1;
        } catch (e: Error) {
            Debug.print("Error removing transaction: " # Error.message(e));
            return 0;
        };
    };

    public query func getTransactionStatus(transactionId: Text) : async Text {
        switch(transactionHistory.get(transactionId)){
            case(?transaction) { return transaction.transactionStatus; };
            case(null) { return ""; };
        };
    };

    public query func getTransactionByStatus(status: Text) : async [Transaction] {
        let transactions = Vector.Vector<Transaction>();
        for (t in transactionHistory.vals()) {
            if(status == t.transactionStatus) {
                transactions.add(t);
            };
        };
        return (Vector.toArray(transactions));
    };

    public query func getUserTransactionHistoryPaginate(userId: Principal, status: ?Text, page: Nat, count: Nat) : async ([Transaction], Nat) {
        switch(status) {
            case(null) { 
                // First collect and sort all relevant transactions
                let filteredTransactions = Array.filter<Transaction>(
                    Iter.toArray<Transaction>(transactionHistory.vals()),
                    func (t: Transaction): Bool {
                        return userId == t.user;
                    }
                );
                
                // Sort the filtered transactions
                let sortedTransactions = Array.sort<Transaction>(
                    filteredTransactions, 
                    compareTransactionAsc
                );
                
                // Then paginate the results
                var cursor = 0;
                var counter = 0;
                let skip = (page-1)*count;
                
                let paginatedTransactions = Array.filter<Transaction>(
                    sortedTransactions,
                    func (t: Transaction): Bool {
                        cursor += 1;
                        if (cursor > skip and counter < count) {
                            counter += 1;
                            return true;
                        };
                        return false;
                    }
                );
                
                return (paginatedTransactions, filteredTransactions.size());
            };
            case(?stat) { 
                if(Util.transactionStatusVal(stat) == false) {
                    return ([], 0);
                };

                // First collect and sort all relevant transactions
                let filteredTransactions = Array.filter<Transaction>(
                    Iter.toArray<Transaction>(transactionHistory.vals()),
                    func (t: Transaction): Bool {
                        return userId == t.user and stat == t.transactionStatus;
                    }
                );
                
                // Sort the filtered transactions
                let sortedTransactions = Array.sort<Transaction>(
                    filteredTransactions, 
                    compareTransactionAsc
                );
                
                // Then paginate the results
                var cursor = 0;
                var counter = 0;
                let skip = (page-1)*count;
                
                return (Array.filter<Transaction>(
                    sortedTransactions,
                    func (t: Transaction): Bool {
                        cursor += 1;
                        if (cursor > skip and counter < count) {
                            counter += 1;
                            return true;
                        };
                        return false;
                    }
                ), filteredTransactions.size());
            };
        };
    };

    private func compareTransactionAsc(t1: Transaction, t2:Transaction): Order.Order {
        // Helper function to convert transaction status to priority number
        // Lower number means higher priority in ascending sort
        let statusPriority = func (status: Text) : Int {
            switch (status) {
            case "waitingPayment" { 1 };
            case "booked" { 2 };
            case "checkedIn" { 3 };
            case "checkedOut" { 4 };
            case _ { 5 }; // Other statuses (completed, cancelled, etc.) get lowest priority
            };
        };
        
        // First compare by status priority
        let t1Priority = statusPriority(t1.transactionStatus);
        let t2Priority = statusPriority(t2.transactionStatus);
        
        if (t1Priority < t2Priority) { return #less; }
        else if (t1Priority > t2Priority) { return #greater; }
        else {
            switch (compareDates(t1.checkInDate, t2.checkInDate)) {
                case (#less) { #less };
                case (#equal) { #equal };
                case (#greater) { #greater };
            };
        };
    };

    public query func getPropertyTransactionHistory(propertyId: Text) : async [Transaction] {
        let transactions = Vector.Vector<Transaction>();
        for (t in transactionHistory.vals()) {
            if(propertyId == t.propertyId) {
                transactions.add(t);
            };
        };
        return (Vector.toArray(transactions));
    };

    public query func getTransaction(transactionId: Text) : async ?Transaction {
        return transactionHistory.get(transactionId);
    };

    private func compareDates(date1: Text, date2: Text) : {#less; #equal; #greater} {
        // Parse dates in DD-MM-YYYY format
        let d1Parts:[Text] = Iter.toArray<Text>(Text.split(date1, #char('-')));
        let d2Parts:[Text] = Iter.toArray<Text>(Text.split(date2, #char('-')));
        
        if (d1Parts.size() != 3 or d2Parts.size() != 3) {
            return #equal; // Invalid format, treat as equal
        };
        
        // Compare years first
        let year1 = d1Parts[2];
        let year2 = d2Parts[2];
        
        if (Text.greater(year1, year2)) { return #less };
        if (Text.less(year1, year2)) { return #greater };
        
        // Years equal, compare months
        let month1 = d1Parts[1];
        let month2 = d2Parts[1];
        
        if (Text.greater(month1, month2)) { return #less };
        if (Text.less(month1, month2)) { return #greater };
        
        // Months equal, compare days
        let day1 = d1Parts[0];
        let day2 = d1Parts[0];
        
        if (Text.greater(day1, day2)) { return #less };
        if (Text.less(day1, day2)) { return #greater };
        
        return #equal;
    }
};