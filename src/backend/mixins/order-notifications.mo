import OrderRequestTypes "../types/order-requests";
import OrderNotifLib "../lib/order-notifications";
import Common "../types/common";
import OutCall "mo:caffeineai-http-outcalls/outcall";

mixin (
  orderRequests : OrderNotifLib.OrderRequestMap,
  orderRequestState : OrderNotifLib.CounterState,
  transform : OutCall.Transform,
) {
  // Public (anonymous-accessible) endpoint to submit an order request.
  // Stores the request, fires email + WhatsApp notifications, and returns the ID.
  public shared func submitOrderRequest(
    customerName : Text,
    phone : Text,
    productName : Text,
    shoeSize : Text,
    quantity : Nat,
    address : Text,
    note : Text,
  ) : async { #ok : Common.OrderId; #err : Text } {
    // Basic validation
    if (phone == "") {
      return #err("Phone number is required");
    };
    if (address == "") {
      return #err("Delivery address is required");
    };
    if (quantity < 1) {
      return #err("Quantity must be at least 1");
    };

    // Store the request
    let req = OrderNotifLib.store(
      orderRequests,
      orderRequestState,
      customerName,
      phone,
      productName,
      shoeSize,
      quantity,
      address,
      note,
    );

    // Fire notifications (failures do not block the success response)
    let emailOk = await OrderNotifLib.sendEmail(req, transform);
    if (not emailOk) {
      // Log but don't fail
      ignore emailOk;
    };

    let waOk = await OrderNotifLib.sendWhatsApp(req, transform);
    if (not waOk) {
      ignore waOk;
    };

    #ok(req.id);
  };
};
