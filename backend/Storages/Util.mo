import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Order "mo:base/Order";

module {
    
    public type UserProfile = {
        id: Principal;
        fullName: Text;
        email: Text;
        dateOfBirth: Text;
        ballance: Nat;
        profilePictureUrl: Text;
    };

    public type Renter = {
        id: Principal;
        fullName: Text;
        email: Text;
        dateOfBirth: Text;
        profileUrl: Text;
        ballance: Nat;
        propertiesId: [Text];
    };
    
    public type Property = {
        id: Text;
        owner: Principal;
        name : Text;
        pricePerNight: Nat;
        description: Text;
        location: Text;
        builtInDate: Text;
        bedroomCount: Nat;
        guestCapacity: Nat;
        bathroomCount: Nat;
        bedCount: Nat;
        pictures: [Text];
    };

    public type UnregisteredProperty = {
        owner: Principal;
        name : Text;
        pricePerNight: Nat;
        description: Text;
        location: Text;
        builtInDate: Text;
        bedroomCount: Nat;
        guestCapacity: Nat;
        bathroomCount: Nat;
        bedCount: Nat;
        pictures: [Text];
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
};