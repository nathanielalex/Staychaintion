import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Property "canister:Property_backend";
import Util "../Util";

actor {

  public func run() : async () {
    // Debug.print(" Running Property Seeder...");

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
        pictures = ["https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg"];
        propertyType = "cabin";
        location = "Tambon Huai Sat Yai, Thailand";
        latitude = 12.533784;
        longitude = 99.546974;
        coverPicture = "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg";
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
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "villa";
        location = "Miami, FL";
        latitude = 25.761681;
        longitude = -80.191788;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
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
        pictures = ["https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg"];
        propertyType = "apartment";
        location = "New York, NY";
        latitude = 40.712776;
        longitude = -74.005974;
        coverPicture = "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg";
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
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "chalet";
        location = "Aspen, CO";
        latitude = 39.191097;
        longitude = -106.817535;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
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
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "apartment";
        location = "Austin, TX";
        latitude = 30.267153;
        longitude = 2.352221;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
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
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "house";
        location = "Lake Tahoe, CA";
        latitude = 39.0885405;
        longitude = -120.0503528;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
      },
      {
        status = "available";
        bedCount = 3;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 1750000;
        name = "Mediterranean Villa Retreat";
        bedroomCount = 3;
        bathroomCount = 2;
        description = "Elegant villa with private pool and Mediterranean garden offering panoramic sea views.";
        builtInDate = "2019-05-12";
        guestCapacity = 6;
        pictures = ["https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg"];
        propertyType = "villa";
        location = "Santorini, Greece";
        latitude = 36.3932;
        longitude = 25.4615;
        coverPicture = "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg";
      },
      {
        status = "booked";
        bedCount = 1;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 950000;
        name = "Urban Loft Apartment";
        bedroomCount = 1;
        bathroomCount = 1;
        description = "Modern loft in the city center with industrial design elements and artistic touches.";
        builtInDate = "2020-11-05";
        guestCapacity = 2;
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "apartment";
        location = "Berlin, Germany";
        latitude = 52.5200;
        longitude = 13.4050;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
      },
      {
        status = "unavailable";
        bedCount = 4;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 2200000;
        name = "Rustic Mountain Cabin";
        bedroomCount = 3;
        bathroomCount = 2;
        description = "Authentic log cabin nestled in the mountains with fireplace and outdoor hot tub.";
        builtInDate = "2016-08-23";
        guestCapacity = 8;
        pictures = ["https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg"];
        propertyType = "cabin";
        location = "Whistler, Canada";
        latitude = 50.1163;
        longitude = -122.9574;
        coverPicture = "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg";
      },
      {
        status = "available";
        bedCount = 2;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 850000;
        name = "Cozy Forest Chalet";
        bedroomCount = 2;
        bathroomCount = 1;
        description = "Charming wooden chalet surrounded by pine trees with hiking trails nearby.";
        builtInDate = "2018-10-17";
        guestCapacity = 4;
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "chalet";
        location = "Interlaken, Switzerland";
        latitude = 46.6863;
        longitude = 7.8632;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
      },
      {
        status = "booked";
        bedCount = 5;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 3500000;
        name = "Luxury Beachfront Villa";
        bedroomCount = 5;
        bathroomCount = 4;
        description = "Extravagant villa with private beach access, infinity pool, and full-time staff.";
        builtInDate = "2021-03-29";
        guestCapacity = 12;
        pictures = ["https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg"];
        propertyType = "villa";
        location = "Bali, Indonesia";
        latitude = -8.4095;
        longitude = 115.1889;
        coverPicture = "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg";
      },
      {
        status = "available";
        bedCount = 1;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 750000;
        name = "Tropical Bungalow Hideaway";
        bedroomCount = 1;
        bathroomCount = 1;
        description = "Secluded bungalow with outdoor shower and hammock surrounded by tropical gardens.";
        builtInDate = "2019-12-07";
        guestCapacity = 2;
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "bungalow";
        location = "Tulum, Mexico";
        latitude = 20.2114;
        longitude = -87.4654;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
      },
      {
        status = "unavailable";
        bedCount = 3;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 1800000;
        name = "Historic City House";
        bedroomCount = 3;
        bathroomCount = 2;
        description = "Beautifully renovated historic house in the old town with rooftop terrace.";
        builtInDate = "1890-06-15";
        guestCapacity = 6;
        pictures = ["https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg"];
        propertyType = "house";
        location = "Lisbon, Portugal";
        latitude = 38.7223;
        longitude = -9.1393;
        coverPicture = "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg";
      },
      {
        status = "available";
        bedCount = 6;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 2800000;
        name = "Waterfront Family House";
        bedroomCount = 4;
        bathroomCount = 3;
        description = "Spacious family home with direct water access, boat dock, and large garden.";
        builtInDate = "2015-04-19";
        guestCapacity = 10;
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "house";
        location = "Stockholm, Sweden";
        latitude = 59.3293;
        longitude = 18.0686;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
      },
      {
        status = "booked";
        bedCount = 2;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 1100000;
        name = "Luxury Camping Experience";
        bedroomCount = 1;
        bathroomCount = 1;
        description = "High-end glamping tent with king bed, private bathroom, and panoramic nature views.";
        builtInDate = "2022-05-01";
        guestCapacity = 2;
        pictures = ["https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg"];
        propertyType = "camping";
        location = "Sedona, Arizona";
        latitude = 34.8697;
        longitude = -111.7609;
        coverPicture = "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg";
      },
      {
        status = "available";
        bedCount = 1;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 1300000;
        name = "Modern Designer Apartment";
        bedroomCount = 1;
        bathroomCount = 1;
        description = "High-end apartment with contemporary design, smart home features, and city skyline views.";
        builtInDate = "2021-07-11";
        guestCapacity = 2;
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "apartment";
        location = "Tokyo, Japan";
        latitude = 35.6762;
        longitude = 139.6503;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
      },
      {
        status = "unavailable";
        bedCount = 2;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 1400000;
        name = "Alpine Ski Chalet";
        bedroomCount = 2;
        bathroomCount = 2;
        description = "Ski-in/ski-out chalet with fireplace, hot tub, and stunning mountain views.";
        builtInDate = "2017-12-03";
        guestCapacity = 4;
        pictures = ["https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg"];
        propertyType = "chalet";
        location = "Chamonix, France";
        latitude = 45.9237;
        longitude = 6.8694;
        coverPicture = "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg";
      },
      {
        status = "available";
        bedCount = 4;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 1600000;
        name = "Waterfront Cabin Escape";
        bedroomCount = 3;
        bathroomCount = 2;
        description = "Authentic log cabin on the lakefront with private dock, canoe, and fishing equipment.";
        builtInDate = "2016-05-25";
        guestCapacity = 6;
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "cabin";
        location = "Queenstown, New Zealand";
        latitude = -45.0312;
        longitude = 168.6626;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
      },
      {
        status = "booked";
        bedCount = 1;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 900000;
        name = "Desert Oasis Bungalow";
        bedroomCount = 1;
        bathroomCount = 1;
        description = "Private bungalow in the desert with outdoor soaking tub and stargazing deck.";
        builtInDate = "2020-02-14";
        guestCapacity = 2;
        pictures = ["https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg"];
        propertyType = "bungalow";
        location = "Joshua Tree, California";
        latitude = 34.1347;
        longitude = -116.3131;
        coverPicture = "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg";
      },
      {
        status = "available";
        bedCount = 5;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 2500000;
        name = "Colonial Heritage House";
        bedroomCount = 4;
        bathroomCount = 3;
        description = "Restored colonial mansion with lush garden, antique furnishings, and historical charm.";
        builtInDate = "1925-08-30";
        guestCapacity = 8;
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "house";
        location = "Cartagena, Colombia";
        latitude = 10.3910;
        longitude = -75.4794;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
      },
      {
        status = "unavailable";
        bedCount = 2;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 1250000;
        name = "Seaside Camping Retreat";
        bedroomCount = 1;
        bathroomCount = 1;
        description = "Premium glamping tent on the coastline with luxury amenities and oceanfront dining.";
        builtInDate = "2021-09-15";
        guestCapacity = 2;
        pictures = ["https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg"];
        propertyType = "camping";
        location = "Byron Bay, Australia";
        latitude = -28.6474;
        longitude = 153.6020;
        coverPicture = "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg";
      },
      {
        status = "available";
        bedCount = 3;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 1650000;
        name = "Contemporary Urban Villa";
        bedroomCount = 3;
        bathroomCount = 2;
        description = "Modern villa in the city with rooftop garden, smart home features, and minimalist design.";
        builtInDate = "2022-02-25";
        guestCapacity = 6;
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "villa";
        location = "Singapore";
        latitude = 1.3521;
        longitude = 103.8198;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
      },
      {
        status = "booked";
        bedCount = 2;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 1050000;
        name = "Classic Mountain Cabin";
        bedroomCount = 2;
        bathroomCount = 1;
        description = "Traditional wooden cabin nestled among pine trees with stone fireplace and covered porch.";
        builtInDate = "2014-11-09";
        guestCapacity = 4;
        pictures = ["https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg"];
        propertyType = "cabin";
        location = "Banff, Canada";
        latitude = 51.1784;
        longitude = -115.5708;
        coverPicture = "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg";
      },
      {
        status = "available";
        bedCount = 2;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 975000;
        name = "Garden View Bungalow";
        bedroomCount = 1;
        bathroomCount = 1;
        description = "Peaceful bungalow surrounded by tropical gardens with outdoor living space and hammock.";
        builtInDate = "2018-06-22";
        guestCapacity = 3;
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "bungalow";
        location = "Ubud, Bali";
        latitude = -8.5069;
        longitude = 115.2625;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
      },
      {
        status = "unavailable";
        bedCount = 4;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 2100000;
        name = "Nordic Design Apartment";
        bedroomCount = 2;
        bathroomCount = 2;
        description = "Spacious apartment with Scandinavian design elements, sauna, and panoramic city views.";
        builtInDate = "2019-01-18";
        guestCapacity = 4;
        pictures = ["https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg", "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg"];
        propertyType = "apartment";
        location = "Copenhagen, Denmark";
        latitude = 55.6761;
        longitude = 12.5683;
        coverPicture = "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg";
      },
      {
        status = "available";
        bedCount = 6;
        owner = Principal.fromText("aaaaa-aa");
        pricePerNight = 3200000;
        name = "Coastal Family House";
        bedroomCount = 5;
        bathroomCount = 4;
        description = "Spacious beachfront house with multiple terraces, open floor plan, and direct beach access.";
        builtInDate = "2017-03-30";
        guestCapacity = 10;
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "house";
        location = "Cape Town, South Africa";
        latitude = -33.9249;
        longitude = 18.4241;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
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
        pictures = ["https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg", "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg"];
        propertyType = "bungalow";
        location = "Maui, HI";
        latitude = 20.8029568;
        longitude = -156.3106833;
        coverPicture = "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg";
      },
    ];

    for (prop in props.vals()) {
      let propertyId = await Property.registerProperty(prop);
    };

  }

};
