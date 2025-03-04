import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Order "mo:base/Order";

module {
    
    public type UserRole = { #admin; #renter; #user; #guest };
    public type PropertyStatus = { #available; #booked; #unavailable };
    public type PropertyType = { #apartement; #cabin; #camping; #house };

    public type UserProfile = {
        id: Principal;
        role: UserRole;
        fullName: Text;
        email: Text;
        dateOfBirth: Text;
        ballance: Nat;
        profilePictureUrl: Text;
        propertiesId: ?[Text];
    };
    
    public type Property = {
        id: Text;
        owner: Principal;
        name : Text;
        status: PropertyStatus;
        propertyType: PropertyType;
        pricePerNight: Nat;
        description: Text;
        location: Text;
        builtInDate: Text;
        bedroomCount: Nat;
        guestCapacity: Nat;
        bathroomCount: Nat;
        bedCount: Nat;
        pictures: [Text];
        coverPicture: Text;
        buildingType: Text;
        rating: Nat;
    };

    public type UnregisteredProperty = {
        owner: Principal;
        name : Text;
        status: PropertyStatus;
        pricePerNight: Nat;
        description: Text;
        location: Text;
        builtInDate: Text;
        bedroomCount: Nat;
        guestCapacity: Nat;
        bathroomCount: Nat;
        bedCount: Nat;
        pictures: [Text];
        coverPicture: Text;
        buildingType: Text;
    };

    public func userRoleToText(role: UserRole) : Text {
        switch (role) {
            case (#admin) { return "admin" };
            case (#renter) { return "renter" };
            case (#user) { return "user" };
            case (#guest) { return "guest" };
        };
    };

    public func textToUserRole(role: Text) : UserRole {
        switch (role) {
            case ("admin") { return #admin };
            case ("renter") { return #renter };
            case ("user") { return #user };
            case (_) { return #guest };
        };
    };

    public func propStatusToText(role: PropertyStatus) : Text {
        switch (role) {
            case (#available) { return "available" };
            case (#booked) { return "booked" };
            case (#unavailable) { return "unavailable" };
        };
    };

    public func textToPropStatus(role: Text) : PropertyStatus {
        switch (role) {
            case ("available") { return #available };
            case ("booked") { return #booked };
            case ("unavailable") { return #unavailable };
            case (_) { return #unavailable };
        };
    };
    

    public func generateUUID() : async Text {
        let id = Source.Source();
        return UUID.toText(await id.new());
    };

    public func sort<X>(array : [X], compare : (X, X, Text) -> Order.Order, attribute: Text) : [X] {
        let temp : [var X] = Array.thaw(array);
        sortInPlace<X>(temp, compare, attribute);
        Array.freeze(temp)
    };

    public func sortInPlace<X>(array : [var X], compare : (X, X, Text) -> Order.Order, attribute: Text) {
        // Stable merge sort in a bottom-up iterative style. Same algorithm as the sort in Buffer.
        let size = array.size();
        if (size == 0) {
        return;
        };
        let scratchSpace = Array.init<X>(size, array[0]);

        let sizeDec = size - 1 : Nat;
        var currSize = 1; // current size of the subarrays being merged
        // when the current size == size, the array has been merged into a single sorted array
        while (currSize < size) {
            var leftStart = 0; // selects the current left subarray being merged
            while (leftStart < sizeDec) {
                let mid : Nat = if (leftStart + currSize - 1 : Nat < sizeDec) {
                    leftStart + currSize - 1;
                } else { sizeDec };
                let rightEnd : Nat = if (leftStart + (2 * currSize) - 1 : Nat < sizeDec) {
                    leftStart + (2 * currSize) - 1;
                } else { sizeDec };

                // Merge subarrays elements[leftStart...mid] and elements[mid+1...rightEnd]
                var left = leftStart;
                var right = mid + 1;
                var nextSorted = leftStart;
                while (left < mid + 1 and right < rightEnd + 1) {
                    let leftElement = array[left];
                    let rightElement = array[right];
                    switch (compare(leftElement, rightElement, attribute)) {
                        case (#less or #equal) {
                            scratchSpace[nextSorted] := leftElement;
                            left += 1;
                        };
                        case (#greater) {
                            scratchSpace[nextSorted] := rightElement;
                            right += 1;
                        };
                    };
                    nextSorted += 1;
                };
                while (left < mid + 1) {
                    scratchSpace[nextSorted] := array[left];
                    nextSorted += 1;
                    left += 1;
                };
                while (right < rightEnd + 1) {
                    scratchSpace[nextSorted] := array[right];
                    nextSorted += 1;
                    right += 1;
                };

                // Copy over merged elements
                var i = leftStart;
                while (i < rightEnd + 1) {
                    array[i] := scratchSpace[i];
                    i += 1;
                };

                leftStart += 2 * currSize;
            };
            currSize *= 2;
        };
    };

    public func optAppend<X>(array1 : ?[X], array2 : ?[X]) : ?[X] {
        switch (array1) {
            case (null) { return array2 };
            case (?arr1) {
                switch (array2) {
                    case (null) { array1 };
                    case (?arr2) {
                        let size1 = arr1.size();
                        let size2 = arr2.size();
                        ?Array.tabulate<X>(size1 + size2, func i {
                            if (i < size1) {
                                arr1[i];
                            } else {
                                arr2[i - size1];
                            };
                        });
                    };
                };
            };
        };
    };

    public func optfilter<X>(array : ?[X], predicate : X -> Bool) : ?[X] {
        switch(array) {
            case(null) { return null };
            case(?arr) { 
                var count = 0;
                let keep =
                Array.tabulate<Bool>(
                    arr.size(),
                    func i {
                        if (predicate(arr[i])) {
                            count += 1;
                            true
                        } else {
                            false
                        }
                    }
                );

                var nextKeep = 0;
                ?Array.tabulate<X>(
                count, func _ {
                        while (not keep[nextKeep]) {
                        nextKeep += 1;
                        };
                        nextKeep += 1;
                        arr[nextKeep - 1];
                    }
                );
            };
        };
    };
};