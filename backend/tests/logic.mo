// a  file to write the renting process logic
// if there's space on the Backend.mo file, 
// we can copy and write the renting process logic there
// if not we can import this file to the Backend.mo

// in actor type for debugging using candid purposes
// for now it will be an actor, but if needed to be imported to the Backend.mo
// change it to module
import Util "../Storages/Util";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Option "mo:base/Option";

actor {
    type Property = Util.Property;
    type PropertyStatus = Util.PropertyStatus;
    
    // Assume propertyInfo is defined elsewhere
    private var propertyInfo = Util.propertyInfo;
    
    // Comparison functions for sorting
    private func natCompareAsc(p1: Property, p2: Property, attr: Text): Bool {
        switch(attr) {
            case("pricePerNight") { p1.pricePerNight <= p2.pricePerNight };
            case("bedroomCount") { p1.bedroomCount <= p2.bedroomCount };
            case("guestCapacity") { p1.guestCapacity <= p2.guestCapacity };
            case("bathroomCount") { p1.bathroomCount <= p2.bathroomCount };
            case("bedCount") { p1.bedCount <= p2.bedCount };
            case("rating") { p1.rating <= p2.rating };
            case(_) { true };
        };
    };

    private func natCompareDesc(p1: Property, p2: Property, attr: Text): Bool {
        switch(attr) {
            case("pricePerNight") { p1.pricePerNight > p2.pricePerNight };
            case("bedroomCount") { p1.bedroomCount > p2.bedroomCount };
            case("guestCapacity") { p1.guestCapacity > p2.guestCapacity };
            case("bathroomCount") { p1.bathroomCount > p2.bathroomCount };
            case("bedCount") { p1.bedCount > p2.bedCount };
            case("rating") { p1.rating > p2.rating };
            case(_) { false };
        };
    };
    
    private func sort<T>(array: [T], compare: (T, T, Text) -> Bool, attr: Text): [T] {
        let result = Array.thaw<T>(array);
        Array.sortInPlace(result, func(a, b) { compare(a, b, attr) });
        Array.freeze(result);
    };
    
    // Combined function for querying based on both text and numeric attributes
    public query func getPropertyPaginate(
        textAttrs: Text, textQueries: Text,
        numAttrs: Text, numQueries: Text, comparisons: Text,
        orderAttr: Text, orderDir: Text,
        page: Nat, count: Nat
    ): async ([Property], Nat) {
        // Parse input parameters
        let textAttrIter = Text.tokens(textAttrs, #predicate(func(c):Bool{ c==' ' or c==',' or c==';' or c=='\n' }));
        let textQueryIter = Text.tokens(textQueries, #predicate(func(c):Bool{ c==' ' or c==',' or c==';' or c=='\n' }));
        
        let numAttrIter = Text.tokens(numAttrs, #predicate(func(c):Bool{ c==' ' or c==',' or c==';' or c=='\n' }));
        let numQueryIter = Text.tokens(numQueries, #predicate(func(c):Bool{ c==' ' or c==',' or c==';' or c=='\n' }));
        let comparIter = Text.tokens(comparisons, #predicate(func(c):Bool{ c==' ' or c==',' or c==';' or c=='\n' }));

        var itertyp = propertyInfo.vals();
        var cursor = 0;
        var counter = 0;
        let skip = (page-1)*count;

        // Filter by text attributes
        loop {
            switch(textAttrIter.next(), textQueryIter.next()) {
                case(?attr, ?quer) {
                    itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
                        Text.contains(
                            switch (attr) {
                                case("owner"){Principal.toText(prop.owner) : Text};
                                case("name"){prop.name};
                                case("status"){Util.propStatusToText(prop.status)};
                                case("location"){prop.location};
                                case("builtInDate"){prop.builtInDate};
                                case("buildingType"){prop.buildingType};
                                case (_) { "" };                
                            }, 
                            #text(quer)
                        );
                    });
                };
                case(null, null) {  }; // want to break here
                case(_) { return ([], 0); };
            };
        };

        // Filter by numeric attributes
        loop {
            switch(numAttrIter.next(), numQueryIter.next(), comparIter.next()) {
                case(?attr, ?quer, ?comp) {
                    itertyp := Iter.filter<Property>(itertyp, func (prop: Property): Bool {
                        let value = switch (attr) {
                            case ("pricePerNight") { prop.pricePerNight };
                            case ("bedroomCount") { prop.bedroomCount };
                            case ("guestCapacity") { prop.guestCapacity };
                            case ("bathroomCount") { prop.bathroomCount };
                            case ("bedCount") { prop.bedCount };
                            case ("rating") { prop.rating };
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
                case(null, null, null) { break; };
                case(_) { return ([], 0); };
            };
        };
        
        // Apply pagination and sorting
        let results = Iter.toArray<Property>(itertyp);
        let sortedResults = if (orderAttr != "") {
            sort<Property>(results, if (orderDir == "asc") natCompareAsc else natCompareDesc, orderAttr)
        } else {
            results
        };
        
        // Apply pagination
        let total = sortedResults.size();
        let startIdx = Nat.min(skip, total);
        let endIdx = Nat.min(startIdx + count, total);
        let pagedResults = Array.tabulate<Property>(endIdx - startIdx, func(i) {
            sortedResults[startIdx + i]
        });
        
        return (pagedResults, total);
    };
};