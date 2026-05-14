import Common "common";

module {
  public type OrderRequest = {
    id : Common.OrderId;
    customerName : Text;
    phone : Text;
    productName : Text;
    shoeSize : Text;
    quantity : Nat;
    address : Text;
    note : Text;
    createdAt : Common.Timestamp;
  };
};
