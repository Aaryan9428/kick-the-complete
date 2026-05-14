import Map "mo:core/Map";
import ProductTypes "../types/products";

module {
  public type ProductMap = Map.Map<Text, ProductTypes.Product>;

  public func listAll(products : ProductMap) : [ProductTypes.Product] {
    products.values().toArray();
  };

  public func listFeatured(products : ProductMap) : [ProductTypes.Product] {
    products.values().filter(func(p) { p.isFeatured }).toArray();
  };

  public func getById(products : ProductMap, id : Text) : ?ProductTypes.Product {
    products.get(id);
  };

  public func getByBrand(products : ProductMap, brand : Text) : [ProductTypes.Product] {
    products.values().filter(func(p) { p.brand == brand }).toArray();
  };

  public func getByCategory(products : ProductMap, category : Text) : [ProductTypes.Product] {
    products.values().filter(func(p) { p.category == category }).toArray();
  };

  public func upsert(products : ProductMap, product : ProductTypes.ProductInput) : () {
    let p : ProductTypes.Product = {
      id = product.id;
      name = product.name;
      brand = product.brand;
      description = product.description;
      priceInCents = product.priceInCents;
      imagePaths = product.imagePaths;
      category = product.category;
      sizes = product.sizes;
      stock = product.stock;
      isFeatured = product.isFeatured;
      isLimited = product.isLimited;
      badge = product.badge;
    };
    products.add(p.id, p);
  };

  public func remove(products : ProductMap, id : Text) : () {
    products.remove(id);
  };
};
