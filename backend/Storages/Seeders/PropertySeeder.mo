import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Property "canister:Property_backend";
import Util "../Util";

actor {

  public func run() : async () {
    Debug.print(" Running Property Seeder...");

    let props : [Util.UnregisteredProperty] = [
      {
        status = "available";
        bedCount = 2;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 1000000;
        name = "Luxury A-Frame Cabin";
        bedroomCount = 2;
        bathroomCount = 1;
        description = "A beautiful cabin by the beach with a wonderful view.";
        builtInDate = "2020-06-15";
        guestCapacity = 4;
        pictures = [];
        propertyType = "cabin";
        location = "Tambon Huai Sat Yai, Thailand";
        latitude = 12.521205;
        longitude = 99.522853;
        coverPicture = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png";
      },
      {
        status = "unavailable";
        bedCount = 1;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 2000000;
        name = "Luxury Beach Villa";
        bedroomCount = 4;
        bathroomCount = 3;
        description = "A beautiful cabin by the beach with a wonderful view.";
        builtInDate = "2020-06-15";
        guestCapacity = 4;
        pictures = [];
        propertyType = "villa";
        location = "Miami, FL";
        latitude = 25.76168;
        longitude = -80.19179;
        coverPicture = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png";
      },
      {
        status = "available";
        bedCount = 10;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 3000000;
        name = "City Center Apartment";
        bedroomCount = 10;
        bathroomCount = 1;
        description = "A beautiful cabin by the beach with a wonderful view.";
        builtInDate = "2015-06-15";
        guestCapacity = 4;
        pictures = [];
        propertyType = "apartment";
        location = "New York, NY";
        latitude = 40.712775;
        longitude = -74.005973;
        coverPicture = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png";
      },
      {
        status = "available";
        bedCount = 3;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 1500000;
        name = "Mountain View Chalet";
        bedroomCount = 3;
        bathroomCount = 2;
        description = "Cozy chalet with breathtaking mountain views and nearby hiking trails.";
        builtInDate = "2018-11-20";
        guestCapacity = 6;
        pictures = [];
        propertyType = "chalet";
        location = "Aspen, CO";
        latitude = 39.191098;
        longitude = -106.817539;
        coverPicture = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png";
      },
      {
        status = "available";
        bedCount = 1;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 800000;
        name = "Urban Studio Loft";
        bedroomCount = 1;
        bathroomCount = 1;
        description = "Modern studio loft in the heart of the city with easy access to restaurants and nightlife.";
        builtInDate = "2019-03-10";
        guestCapacity = 2;
        pictures = [];
        propertyType = "apartment";
        location = "Austin, TX";
        latitude = 30.267153;
        longitude = -97.743061;
        coverPicture = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png";
      },
      {
        status = "unavailable";
        bedCount = 5;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 4000000;
        name = "Lakeside Retreat";
        bedroomCount = 4;
        bathroomCount = 3;
        description = "Spacious retreat by the lake with private dock and boat access. Perfect for family gatherings.";
        builtInDate = "2017-07-22";
        guestCapacity = 10;
        pictures = [];
        propertyType = "house";
        location = "Lake Tahoe, CA";
        latitude = 39.096849;
        longitude = -120.032351;
        coverPicture = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png";
      },
      {
        status = "available";
        bedCount = 2;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 1200000;
        name = "Tropical Beachfront Bungalow";
        bedroomCount = 2;
        bathroomCount = 1;
        description = "Charming bungalow steps away from the ocean with stunning sunset views.";
        builtInDate = "2022-01-15";
        guestCapacity = 4;
        pictures = [];
        propertyType = "bungalow";
        location = "Maui, HI";
        latitude = 20.798363;
        longitude = -156.331925;
        coverPicture = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png";
      },
    ];

    for (prop in props.vals()) {
      let propertyId = await Property.registerProperty(prop);
    };

  }

};
