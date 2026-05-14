module {
  public type Product = {
    id : Text;
    name : Text;
    brand : Text;
    description : Text;
    priceInCents : Nat;
    imagePaths : [Text];
    category : Text;
    sizes : [Text];
    stock : Nat;
    isFeatured : Bool;
    isLimited : Bool;
    badge : ?Text;
  };

  public type ProductInput = {
    id : Text;
    name : Text;
    brand : Text;
    description : Text;
    priceInCents : Nat;
    imagePaths : [Text];
    category : Text;
    sizes : [Text];
    stock : Nat;
    isFeatured : Bool;
    isLimited : Bool;
    badge : ?Text;
  };
};
