import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Order "mo:base/Order";
import Int "mo:base/Int";
import Nat32 "mo:base/Nat32";
import Char "mo:base/Char";
import Float "mo:base/Float";
import Nat64 "mo:base/Nat64";
import Int64 "mo:base/Int64";

module {
    public type UserProfile = {
        id: Principal;
        role: Text;
        fullName: Text;
        email: Text;
        dateOfBirth: Text;
        ballance: Float;
        profilePictureUrl: Text;
        propertiesId: ?[Text];
    };
    
    public type Property = {
        id: Text;
        owner: Principal;
        name : Text;
        status: Text;
        propertyType: Text;
        pricePerNight: Float;
        description: Text;
        location: Text;
        builtInDate: Text;
        bedroomCount: Nat;
        guestCapacity: Nat;
        bathroomCount: Nat;
        bedCount: Nat;
        pictures: [Text];
        coverPicture: Text;
        rating: Float;
    };

    public type UnregisteredProperty = {
        owner: Principal;
        name : Text;
        propertyType: Text;
        status: Text;
        pricePerNight: Float;
        description: Text;
        location: Text;
        builtInDate: Text;
        bedroomCount: Nat;
        guestCapacity: Nat;
        bathroomCount: Nat;
        bedCount: Nat;
        pictures: [Text];
        coverPicture: Text;
    };

    public func userRoleVal(role: Text) : Bool {
        switch (role) {
            case ("admin") { return true };
            case ("renter") { return true };
            case ("user") { return true };
            case (_) { return false };
        };
    };

    public func propStatusVal(status: Text) : Bool {
        switch (status) {
            case ("available") { return true };
            case ("booked") { return true };
            case ("unavailable") { return true };
            case (_) { return false };
        };
    };

    public func propTypeVal(propType: Text) : Bool {
        switch (propType) {
            case ("apartment") { return true };
            case ("cabin") { return true };
            case ("camping") { return true };
            case ("house") { return true };
            case ("villa") { return true };
            case ("bungalow") { return true };
            case ("chalet") { return true };
            case (_) { return false };  // Default case
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

    public func textToInt(text : Text) : Int {
        let chars = text.chars();
        var int : Int = 0;
        var isNegative = false;
        
        for (char in chars) {
            switch (char) {
                case '-' { 
                    if (int == 0 and not isNegative) { isNegative := true }
                    else { return 0 }  // Invalid format
                };
                case digit {
                    let digitValue = Char.toNat32(digit);
                    if (digitValue >= 48 and digitValue <= 57) {
                        int := int * 10 + Nat32.toNat(digitValue - 48);
                    } else {
                        return 0;  // Invalid character
                    };
                };
            };
        };
        
        if (isNegative) { -int } else { int }
    };

    public func textToFloat(t : Text) : Float {
        var i : Float = 1;
        var f : Float = 0;
        var isDecimal : Bool = false;
        let chars = t.chars();
        var hasChars = false;

        for (c in chars) {
            hasChars := true;
            if (Char.isDigit(c)) {
                let charToNat : Nat64 = Nat64.fromNat(Nat32.toNat(Char.toNat32(c) - 48));
                let natToFloat : Float = Float.fromInt64(Int64.fromNat64(charToNat));
                if (isDecimal) {
                    let n : Float = natToFloat / Float.pow(10, i);
                    f := f + n;
                    i := i + 1;
                } else {
                    f := f * 10 + natToFloat;
                };
            } else if (Char.equal(c, '.') or Char.equal(c, ',')) {
                isDecimal := true;
                i := 1;
            } else {
                return 0; // Return 0 for invalid input instead of throwing error
            };
        };

        if (not hasChars) {
            return 0;
        };

        return f;
    };
};