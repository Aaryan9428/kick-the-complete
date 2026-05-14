import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import OrderTypes "../types/orders";
import OrderLib "../lib/orders";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : OrderLib.OrderMap,
  orderState : OrderLib.CounterState,
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
};
