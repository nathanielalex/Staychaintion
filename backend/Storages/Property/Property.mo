import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
// import Principal "mo:base/Principal";
import Util "../Util";
import Vector "mo:vector/Class";

actor {

    type Property = Util.Property;

    var propertyInfo = TrieMap.TrieMap<Text, Property>(Text.equal, Text.hash);

    stable var stablePropertyInfo: [(Text, Property)] = [];

    // Seeder function that adds initial property data
    // private func seedProperties(): async () {
    //     let prop1: Util.UnregisteredProperty = {
    //         bedCount = 2;
    //         owner = Principal.fromText("aaaaa-aa");
    //         pricePerNight= 1000000;
    //         name= "Luxury A-Frame Cabin";
    //         bedroomCount= 2;
    //         bathroomCount= 1;
    //         description= "A beautiful cabin by the beach with a wonderful view.";
    //         builtInDate= "2020-06-15";
    //         guestCapacity= 4;
    //         pictures= [];
    //         buildingType= "cabin";
    //         location= "Tambon Huai Sat Yai, Thailand";
    //         coverPicture= "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png";
    //     };
    //     // Add properties to the map
    //     let propertyId = await registerProperty(prop1);
    // };

    system func preupgrade()  {
        // seedProperties();
        stablePropertyInfo := Iter.toArray(propertyInfo.entries());
    };

    system func postupgrade() {
        propertyInfo := TrieMap.fromEntries<Text, Property>(Iter.fromArray(stablePropertyInfo), Text.equal, Text.hash);
    };

    public shared func registerProperty(unreg: Util.UnregisteredProperty) : async Text {
        let id = await Util.generateUUID();

        let prop : Property = {
            id = id;
            owner = unreg.owner;
            name = unreg.name;
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
            buildingType = unreg.buildingType;
            rating = 0;
        };

        try {
            propertyInfo.put(prop.id, prop);
            return id;
        } catch (e: Error) {
            return "Error registering property: " # Error.message(e);
        };
    };


    public shared func updateProperty(updatedProp: Property) : async Int {

        try {
            propertyInfo.delete(updatedProp.id);
            propertyInfo.put(updatedProp.id, updatedProp);
            return 1;
        } catch (e: Error) {
            Debug.print("Error updating property: " # Error.message(e));
            return 0;
        };
    };

    public query func getProperty(propertyId: Text) : async ?Property {
        return propertyInfo.get(propertyId);
    };

    public query func getAllProperties() : async [Property] {
        let properties = Vector.Vector<Property>();
        for (p in propertyInfo.vals()) {
            properties.add(p);
        };
        return (Vector.toArray(properties));
    };

    // Add this function to seed the properties when canister is initialized
    // public func initialize() : async () {
    //     // Call the seeder function
    //     await seedProperties();
    // }
};