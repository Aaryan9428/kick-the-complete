import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import ProductTypes "../types/products";
import ProductLib "../lib/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : ProductLib.ProductMap,
) {
  public query func listProducts() : async [ProductTypes.Product] {
    ProductLib.listAll(products);
  };

  public query func listFeaturedProducts() : async [ProductTypes.Product] {
    ProductLib.listFeatured(products);
  };

  public query func getProduct(id : Text) : async ?ProductTypes.Product {
    ProductLib.getById(products, id);
  };

  public query func listProductsByBrand(brand : Text) : async [ProductTypes.Product] {
    ProductLib.getByBrand(products, brand);
  };

  public query func listProductsByCategory(category : Text) : async [ProductTypes.Product] {
    ProductLib.getByCategory(products, category);
  };

  public shared ({ caller }) func upsertProduct(product : ProductTypes.ProductInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can manage products");
    };
    ProductLib.upsert(products, product);
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can manage products");
    };
    ProductLib.remove(products, id);
  };
};
