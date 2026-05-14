import Common "common";

module {
  public type OrderItem = {
    productId : Common.ProductId;
    productName : Text;
    priceInCents : Nat;
    quantity : Nat;
    size : Text;
  };

  public type OrderStatus = {
    #pending;
    #paid;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type Order = {
    id : Common.OrderId;
    userId : Common.UserId;
    items : [OrderItem];
    totalInCents : Nat;
    status : OrderStatus;
    stripeSessionId : ?Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
