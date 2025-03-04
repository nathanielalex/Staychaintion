import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Property "canister:Property_backend";
import Util "../Util";

actor {

  public func run() : async () {
    // Debug.print(" Running Property Seeder...");

    let props : [Util.UnregisteredProperty] = [
      {
        status = #available;
        bedCount = 2;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight= 1000000;
        name= "Luxury A-Frame Cabin";
        bedroomCount= 2;
        bathroomCount= 1;
        description= "A beautiful cabin by the beach with a wonderful view.";
        builtInDate= "2020-06-15";
        guestCapacity= 4;
        pictures= [];
        buildingType= "cabin";
        location= "Tambon Huai Sat Yai, Thailand";
        coverPicture= "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png";
      },
      {
        status = #unavailable;
        bedCount = 1;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 2000000;
        name = "Luxury Beach Villa";
        bedroomCount = 4;
        bathroomCount = 3;
        description = "A beautiful cabin by the beach with a wonderful view.";
        builtInDate = "2020-06-15";
        guestCapacity= 4;
        pictures= [];
        buildingType= "villa";
        location= "Miami, FL";
        coverPicture= "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png";
      },
      {
        status = #available;
        bedCount = 10;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 3000000;
        name = "City Center Apartment";
        bedroomCount = 10;
        bathroomCount = 1;
        description = "A beautiful cabin by the beach with a wonderful view.";
        builtInDate = "2015-06-15";
        guestCapacity= 4;
        pictures= [];
        buildingType= "apartement";
        location= "New York, NY";
        coverPicture= "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png";
      }
    ];

    for(prop in props.vals()) {
      let propertyId = await Property.registerProperty(prop);
    };

  }

}