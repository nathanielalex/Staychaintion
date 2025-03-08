import TrieMap "mo:base/TrieMap";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Vector "mo:vector/Class";
import Util "../Util";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

actor {
  type Product = Util.Product;
  type UnregisteredProduct = Util.UnregisteredProduct;

  var productsInfo = TrieMap.TrieMap<Text, Product>(Text.equal, Text.hash);

  stable var stableProducts : [(Text, Product)] = [];

  system func preupgrade() {
    stableProducts := Iter.toArray(productsInfo.entries());
  };

  system func postupgrade() {
    productsInfo := TrieMap.fromEntries<Text, Product>(Iter.fromArray(stableProducts), Text.equal, Text.hash);
  };

  public query func getProductInfo(prodId : Text) : async ?Product {
    return productsInfo.get(prodId);
  };

  public query func getAllProducts() : async [Product] {
    let products = Vector.Vector<Product>();
    for (p in productsInfo.vals()) {
      products.add(p);
    };
    return (Vector.toArray(products));
  };

  public func registerProduct(unreg : UnregisteredProduct) : async Text {
    let id = await Util.generateUUID();

    let prod : Product = {
      id;
      name = unreg.name;
      seller = unreg.seller;
      productType = unreg.productType;
      shortDescription = unreg.shortDescription;
      description = unreg.description;
      price = unreg.price;
      coverPicture = unreg.coverPicture;
      pictures = unreg.pictures;
      discountType = unreg.discountType;
      discount = unreg.discount;
      rating = 0;
    };

    productsInfo.put(id, prod);
    return id;
  };

  public func updateProduct(updatedProduct : Product) : async Int {
    try {
      productsInfo.put(updatedProduct.id, updatedProduct);
      return 1;
    } catch (e : Error) {
      Debug.print("Error updating product: " # Error.message(e));
      return 0;
    };
  };

  public func removeProduct(prodId : Text) : async Int {
    try {
      productsInfo.delete(prodId);
      return 1;
    } catch (e : Error) {
      Debug.print("Error removing property: " # Error.message(e));
      return 0;
    };
  };
};
