import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import OrderTypes "../types/orders";
import Common "../types/common";

module {
  public type OrderMap = Map.Map<Common.OrderId, OrderTypes.Order>;
  public type CounterState = { var nextOrderId : Nat };

  public func create(
    orders : OrderMap,
    state : CounterState,
    userId : Common.UserId,
    items : [OrderTypes.OrderItem],
    totalInCents : Nat,
    stripeSessionId : ?Text,
  ) : OrderTypes.Order {
    let id = state.nextOrderId;
    state.nextOrderId += 1;
    let now = Time.now();
    let order : OrderTypes.Order = {
      id;
      userId;
      items;
      totalInCents;
      status = #pending;
      stripeSessionId;
      createdAt = now;
      updatedAt = now;
      paymentMethod = null;
      customerName = null;
      customerPhone = null;
      shippingAddress = null;
      pincode = null;
      orderNotes = null;
      displayOrderId = null;
    };
    orders.add(id, order);
    order;
  };

  public func getById(orders : OrderMap, id : Common.OrderId) : ?OrderTypes.Order {
    orders.get(id);
  };

  public func listByUser(orders : OrderMap, userId : Common.UserId) : [OrderTypes.Order] {
    orders.values().filter(func(o) { Principal.equal(o.userId, userId) }).toArray();
  };

  public func listAll(orders : OrderMap) : [OrderTypes.Order] {
    orders.values().toArray();
  };

  public func updateStatus(
    orders : OrderMap,
    id : Common.OrderId,
    status : OrderTypes.OrderStatus,
  ) : Bool {
    switch (orders.get(id)) {
      case (null) { false };
      case (?order) {
        orders.add(id, { order with status; updatedAt = Time.now() });
        true;
      };
    };
  };

  public func markPaidBySession(
    orders : OrderMap,
    sessionId : Text,
  ) : Bool {
    var found = false;
    for ((id, order) in orders.entries()) {
      switch (order.stripeSessionId) {
        case (?sid) {
          if (sid == sessionId) {
            orders.add(id, { order with status = #paid; updatedAt = Time.now() });
            found := true;
          };
        };
        case (null) {};
      };
    };
    found;
  };
  public func createFullOrder(
    orders : OrderMap,
    state : CounterState,
    caller : Principal,
    cartItems : [OrderTypes.CartItemInput],
    paymentMethod : OrderTypes.PaymentMethod,
    customerName : Text,
    customerPhone : Text,
    shippingAddress : Text,
    pincode : Text,
    orderNotes : Text,
    totalInCents : Nat,
  ) : Nat {
    let orderId = state.nextOrderId;
    state.nextOrderId += 1;
    let now = Time.now();
    let displayId = "KICKS-" # (Int.abs(now) / 1_000_000_000 % 100000).toText() # "-" # orderId.toText();
    let items : [OrderTypes.OrderItem] = cartItems.map<OrderTypes.CartItemInput, OrderTypes.OrderItem>(
      func(ci) = {
        productId = ci.productId;
        productName = ci.productName;
        quantity = ci.quantity;
        priceInCents = ci.priceInCents;
        size = ?ci.size;
      }
    );
    let order : OrderTypes.Order = {
      id = orderId;
      userId = caller;
      items = items;
      totalInCents = totalInCents;
      status = #pending;
      stripeSessionId = null;
      createdAt = now;
      updatedAt = now;
      paymentMethod = ?paymentMethod;
      customerName = ?customerName;
      customerPhone = ?customerPhone;
      shippingAddress = ?shippingAddress;
      pincode = ?pincode;
      orderNotes = ?orderNotes;
      displayOrderId = ?displayId;
    };
    orders.add(orderId, order);
    orderId
  };
};
