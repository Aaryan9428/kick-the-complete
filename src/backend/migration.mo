import Map "mo:core/Map";
import Iter "mo:core/Iter";

module {
  type OldOrderItem = { productId : Text; productName : Text; priceInCents : Nat; quantity : Nat; size : Text };
  type OldOrderStatus = { #pending; #paid; #shipped; #delivered; #cancelled };
  type OldOrder = { id : Nat; userId : Principal; items : [OldOrderItem]; totalInCents : Nat; status : OldOrderStatus; stripeSessionId : ?Text; createdAt : Int; updatedAt : Int };
  type NewOrderItem = { productId : Text; productName : Text; priceInCents : Nat; quantity : Nat; size : ?Text };
  type PaymentMethod = { #cod; #phonepe; #stripe };
  type NewOrderStatus = { #pending; #paid; #shipped; #delivered; #cancelled };
  type NewOrder = { id : Nat; userId : Principal; items : [NewOrderItem]; totalInCents : Nat; status : NewOrderStatus; stripeSessionId : ?Text; createdAt : Int; updatedAt : Int; paymentMethod : ?PaymentMethod; customerName : ?Text; customerPhone : ?Text; shippingAddress : ?Text; pincode : ?Text; orderNotes : ?Text; displayOrderId : ?Text };

  public type OldActor = { var orderStore : Map.Map<Nat, OldOrder>; orderState : { var nextOrderId : Nat } };
  public type NewActor = { var orderStore : Map.Map<Nat, NewOrder>; orderState : { var nextOrderId : Nat } };

  func migrateOrder(old : OldOrder) : NewOrder = {
    id = old.id; userId = old.userId;
    items = old.items.map<OldOrderItem, NewOrderItem>(func(i) = { productId = i.productId; productName = i.productName; priceInCents = i.priceInCents; quantity = i.quantity; size = ?i.size });
    totalInCents = old.totalInCents; status = old.status; stripeSessionId = old.stripeSessionId;
    createdAt = old.createdAt; updatedAt = old.updatedAt;
    paymentMethod = null; customerName = null; customerPhone = null; shippingAddress = null; pincode = null; orderNotes = null; displayOrderId = null
  };

  public func run(old : OldActor) : NewActor {
    let iter = old.orderStore.entries();
    let mappedIter = iter.map(func((k, v)) = (k, migrateOrder(v)));
    let newStore = Map.fromIter<Nat, NewOrder>(mappedIter);
    { var orderStore = newStore; orderState = old.orderState }
  };
};
