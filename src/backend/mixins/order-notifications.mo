import OrderRequestTypes "../types/order-requests";
import OrderNotifLib "../lib/order-notifications";
import OrderTypes "../types/orders";
import Common "../types/common";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Time "mo:core/Time";
import Int "mo:core/Int";

mixin (
  orderRequests : OrderNotifLib.OrderRequestMap,
  orderRequestState : OrderNotifLib.CounterState,
  notifConfig : OrderNotifLib.NotifConfig,
  notifLog : OrderNotifLib.NotificationLog,
  transform : OutCall.Transform,
) {
  // Store owner configures Resend API key once via Candid UI
  public shared func setResendApiKey(key : Text) : async () {
    notifConfig.resendApiKey := key;
  };

  // Store owner configures CallMeBot API key once via Candid UI
  public shared func setCallMeBotApiKey(key : Text) : async () {
    notifConfig.callMeBotApiKey := key;
  };

  // Query the last 100 notification delivery log entries
  public query func getNotificationLog() : async [OrderNotifLib.LogEntry] {
    OrderNotifLib.getLog(notifLog);
  };

  // Public (anonymous-accessible) endpoint to submit a quick order request.
  // Stores the request, fires WhatsApp notification, and returns the ID.
  public shared func submitOrderRequest(
    customerName : Text,
    phone : Text,
    productName : Text,
    shoeSize : Text,
    quantity : Nat,
    address : Text,
    note : Text,
  ) : async { #ok : Common.OrderId; #err : Text } {
    if (phone == "") return #err("Phone number is required");
    if (address == "") return #err("Delivery address is required");
    if (quantity < 1) return #err("Quantity must be at least 1");

    let req = OrderNotifLib.store(
      orderRequests, orderRequestState,
      customerName, phone, productName, shoeSize, quantity, address, note,
    );

    let displayId = "KICKS-REQ-" # req.id.toText();
    let cartItems : [OrderTypes.CartItemInput] = [{
      productId = "quick-order";
      productName = productName # " (Size: " # shoeSize # ")";
      size = shoeSize;
      quantity = quantity;
      priceInCents = 0;
    }];
    let now = Int.abs(Time.now()) / 1_000_000_000;
    ignore async {
      ignore await OrderNotifLib.sendWhatsAppNotification(
        notifConfig.callMeBotApiKey, displayId,
        customerName, phone, cartItems, 0, "Quick Order", address,
        notifLog, transform,
      );
    };

    #ok(req.id);
  };
};
