import Common "common";

module {
  public type PaymentMethod = {
    #cod;
    #phonepe;
    #stripe;
  };

  public type CartItemInput = {
    productId : Text;
    productName : Text;
    size : Text;
    quantity : Nat;
    priceInCents : Nat;
  };

  public type OrderItem = {
    productId : Common.ProductId;
    productName : Text;
    priceInCents : Nat;
    quantity : Nat;
    size : ?Text;
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
    paymentMethod : ?PaymentMethod;
    customerName : ?Text;
    customerPhone : ?Text;
    shippingAddress : ?Text;
    pincode : ?Text;
    orderNotes : ?Text;
    displayOrderId : ?Text;
  };
};
