import Principal "mo:base/Principal";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Product "canister:Product_backend";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Util "../Util";
import Result "mo:base/Result";
import Error "mo:base/Error";

actor {
  // Custom hash and equality functions for (Principal, Text)
  func keyEqual(k1 : (Principal, Text), k2 : (Principal, Text)) : Bool {
    return k1.0 == k2.0 and k1.1 == k2.1;
  };

  func keyHash(k : (Principal, Text)) : Nat32 {
    return Principal.hash(k.0) ^ Text.hash(k.1);
  };

  // TrieMap with correct hashing and equality functions
  var cartItems = TrieMap.TrieMap<(Principal, Text), Util.CartItem>(keyEqual, keyHash);

  public func addItem(userId : Principal, productId : Text, quantity : Nat) : async Result.Result<Text, Text> {
    try {
      let key = (userId, productId);

      if (quantity < 1 or quantity > 100) {
        return #err("Invalid quantity amount.")
      };

      switch (cartItems.get(key)) {
        case (?existing) {
          let newQuantity = Nat.add(existing.quantity, quantity);
          cartItems.put(key, { existing with quantity = newQuantity });
        };
        case null {
          let productOpt = await Product.getProductInfo(productId);
          switch (productOpt) {
            case (?product) {
              let newItem : Util.CartItem = {
                quantity;
                userId;

                // Product attributes
                productId = product.id;
                name = product.name;
                productType = product.productType;
                shortDescription = product.shortDescription;
                description = product.description;
                price = product.price;
                coverPicture = product.coverPicture;
                discountType = product.discountType;
                discount = product.discount;
              };

              cartItems.put(key, newItem);
            };
            case null {
              Debug.print("Cannot decrement: Item not found.");
            };
          };
        };
      };

      return #ok("Product added.");

    } catch e {
      return #err("An error occurred: " # Error.message(e));
    }
  };

  public query func incrementItemQuantity(userId : Principal, productId : Text) : async () {
    let key = (userId, productId);
    switch (cartItems.get(key)) {
      case (?existing) {
        cartItems.put(key, { existing with quantity = existing.quantity + 1 });
      };
      case null {
        Debug.print("Cannot increment: Item not found.");
      };
    };
  };

  public func decrementItemQuantity(userId : Principal, productId : Text) : async () {
    let key = (userId, productId);
    switch (cartItems.get(key)) {
      case (?existing) {
        if (existing.quantity > 1) {
          cartItems.put(key, { existing with quantity = existing.quantity - 1 });
        };
      };
      case null {
        Debug.print("Cannot decrement: Item not found.");
      };
    };
  };

  public query func getItems(userId : Principal) : async [Util.CartItem] {
    // Convert values from TrieMap to an array and filter items by userId
    return Iter.toArray(cartItems.vals())
    |> Array.filter<Util.CartItem>(
      _,
      func(item) : Bool {
        item.userId == userId;
      },
    );
  };

  public query func removeItem(userId : Principal, productId : Text) : async () {
    cartItems.delete((userId, productId));
  };
};
