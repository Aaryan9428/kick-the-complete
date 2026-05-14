import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import OrderLib "../lib/orders";
import Common "../types/common";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import OrderNotifLib "../lib/order-notifications";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import OrderTypes "../types/orders";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : OrderLib.OrderMap,
  orderState : OrderLib.CounterState,
  transform : OutCall.Transform,
) {
  public shared ({ caller }) func placeOrder(items : [OrderTypes.OrderItem], totalInCents : Nat) : async OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to place an order");
    };
    OrderLib.create(orders, orderState, caller, items, totalInCents, null);
  };

  public query ({ caller }) func listMyOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view orders");
    };
    OrderLib.listByUser(orders, caller);
  };

  public query ({ caller }) func getOrder(id : Common.OrderId) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view order");
    };
    switch (OrderLib.getById(orders, id)) {
      case (null) { null };
      case (?order) {
        if (Principal.equal(order.userId, caller) or AccessControl.isAdmin(accessControlState, caller)) {
          ?order;
        } else {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
      };
    };
  };

  public shared ({ caller }) func updateOrderStatus(id : Common.OrderId, status : OrderTypes.OrderStatus) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateStatus(orders, id, status);
  };

  public func confirmPayment(sessionId : Text) : async Bool {
    OrderLib.markPaidBySession(orders, sessionId);
  };

  public query ({ caller }) func listAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can list all orders");
    };
    OrderLib.listAll(orders);
  };

  public shared func placeFullOrder(payload : {
    customerName : Text;
    customerPhone : Text;
    shippingAddress : Text;
    pincode : Text;
    orderNotes : Text;
    cartItems : [OrderTypes.CartItemInput];
    paymentMethod : OrderTypes.PaymentMethod;
    totalInCents : Nat;
  }) : async { #ok : { orderId : Nat; displayOrderId : Text }; #err : Text } {
    if (payload.customerName == "") return #err("Customer name is required");
    if (payload.customerPhone == "") return #err("Phone number is required");
    if (payload.shippingAddress == "") return #err("Shipping address is required");
    if (payload.cartItems.size() == 0) return #err("Cart is empty");
    let caller = Principal.fromText("2vxsx-fae");
    let orderId = OrderLib.createFullOrder(
      orders, orderState, caller, payload.cartItems, payload.paymentMethod,
      payload.customerName, payload.customerPhone, payload.shippingAddress,
      payload.pincode, payload.orderNotes, payload.totalInCents
    );
    switch (OrderLib.getById(orders, orderId)) {
      case (?order) {
        let displayId = switch (order.displayOrderId) {
          case (?d) d;
          case null "KICKS-" # orderId.toText();
        };
        let paymentText = switch (payload.paymentMethod) {
          case (#cod) "Cash on Delivery (COD)";
          case (#phonepe) "PhonePe UPI";
          case (#stripe) "Card Payment";
        };
        ignore async {
          await OrderNotifLib.sendFullOrderEmail(
            displayId, payload.customerName, payload.customerPhone,
            payload.shippingAddress, payload.pincode, payload.orderNotes,
            payload.cartItems, payload.totalInCents, paymentText,
            (Time.now() / 1_000_000_000).toText(), transform
          );
        };
        #ok({ orderId = orderId; displayOrderId = displayId })
      };
      case null #err("Order creation failed");
    };
  };
};
