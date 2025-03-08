import Util "../Util";
import Principal "mo:base/Principal";
import Product "canister:Product_backend";

actor {
  public func run() : async () {
    let prods : [Util.UnregisteredProduct] = [
      {
        seller = Principal.fromText("aaaaa-aa");
        name = "Adventure Backpack";
        productType = "Travel Gear";
        shortDescription = "Durable travel backpack";
        description = "A spacious and durable travel backpack with multiple compartments and anti-theft features.";
        price = 100_000.00;
        coverPicture = "https://www.briggs-riley.com/cdn/shop/collections/travel-backpacks.webp?v=1735829781";
        pictures = [];
        discountType = "fixed";
        discount = 0.0;
        rating = 5;
      },
      {
        seller = Principal.fromText("aaaaa-aa");
        name = "Portable Charger";
        productType = "electronics";
        shortDescription = "High-capacity portable charger";
        description = "A high-capacity portable charger with fast charging capabilities, perfect for travel.";
        price = 100_000.00;
        coverPicture = "https://www.briggs-riley.com/cdn/shop/collections/travel-backpacks.webp?v=1735829781";
        pictures = [];
        discountType = "percentage";
        discount = 10.0;
        rating = 4;
      },
      {
        seller = Principal.fromText("aaaaa-aa");
        name = "Comfort Pillow";
        productType = "travel accessories";
        shortDescription = "Comfortable travel pillow";
        description = "A memory foam travel pillow that provides excellent neck support for long journeys.";
        price = 100_000.00;
        coverPicture = "https://www.briggs-riley.com/cdn/shop/collections/travel-backpacks.webp?v=1735829781";
        pictures = [];
        discountType = "fixed";
        discount = 2.0;
        rating = 4;
      },
      {
        seller = Principal.fromText("aaaaa-aa");
        name = "Hydration Bottle";
        productType = "travel gear";
        shortDescription = "Insulated stainless steel bottle";
        description = "A durable and insulated stainless steel water bottle that keeps drinks cold for 24 hours.";
        price = 100_000.00;
        coverPicture = "https://www.briggs-riley.com/cdn/shop/collections/travel-backpacks.webp?v=1735829781";
        pictures = [];
        discountType = "fixed";
        discount = 0.0;
        rating = 4;
      },
      {
        seller = Principal.fromText("aaaaa-aa");
        name = "Universal Adapter";
        productType = "electronics";
        shortDescription = "Universal travel adapter";
        description = "A universal travel adapter with multiple USB ports, compatible with outlets in over 150 countries.";
        price = 100_000.00;
        coverPicture = "https://www.briggs-riley.com/cdn/shop/collections/travel-backpacks.webp?v=1735829781";
        pictures = [];
        discountType = "percentage";
        discount = 5.0;
        rating = 5;
      },
      {
        seller = Principal.fromText("aaaaa-aa");
        name = "Noise Cancelling Earbuds";
        productType = "electronics";
        shortDescription = "Wireless noise cancelling earbuds";
        description = "High-quality wireless earbuds with noise cancelling feature, perfect for travel.";
        price = 100_000.00;
        coverPicture = "https://www.briggs-riley.com/cdn/shop/collections/travel-backpacks.webp?v=1735829781";
        pictures = [];
        discountType = " fixed ";
        discount = 5.0;
        rating = 4;
      },
      {
        seller = Principal.fromText("aaaaa-aa");
        name = " Secure Wallet ";
        productType = " travel accessories ";
        shortDescription = " RFID blocking travel wallet ";
        description = " A slim and stylish travel wallet with RFID blocking technology to protect your cards.";
        price = 100_000.00;
        coverPicture = " https : //www.briggs-riley.com/cdn/shop/collections/travel-backpacks.webp?v=1735829781";
        pictures = [];
        discountType = "fixed";
        discount = 0.0;
        rating = 4;
      },
      {
        seller = Principal.fromText("aaaaa-aa");
        name = "Packing Cubes";
        productType = "travel accessories";
        shortDescription = "Set of packing cubes";
        description = "A set of packing cubes to help organize your luggage and maximize space.";
        price = 100_000.00;
        coverPicture = "https://www.briggs-riley.com/cdn/shop/collections/travel-backpacks.webp?v=1735829781";
        pictures = [];
        discountType = "percentage";
        discount = 20.0;
        rating = 5;
      },
      {
        seller = Principal.fromText("aaaaa-aa");
        name = "Compact Umbrella";
        productType = "travel gear";
        shortDescription = "Compact travel umbrella";
        description = "A lightweight and compact travel umbrella that fits easily in your bag.";
        price = 100_000.00;
        coverPicture = "https://www.briggs-riley.com/cdn/shop/collections/travel-backpacks.webp?v=1735829781";
        pictures = [];
        discountType = "fixed";
        discount = 3.0;
        rating = 3;
      },
      {
        seller = Principal.fromText("aaaaa-aa");
        name = "Adventure Journal";
        productType = "travel accessories";
        shortDescription = "Leather travel journal";
        description = "A beautifully crafted leather travel journal to document your adventures.";
        price = 100_000.00;
        coverPicture = "https://www.briggs-riley.com/cdn/shop/collections/travel-backpacks.webp?v=1735829781";
        pictures = [];
        discountType = "fixed";
        discount = 0.0;
        rating = 4;
      },
    ];

    for (prod in prods.vals()) {
      let productId = await Product.registerProduct(prod);
    };

  };
};
