import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import OrderRequestTypes "../types/order-requests";
import OrderTypes "../types/orders";
import Common "../types/common";

module {
  public type OrderRequestMap = Map.Map<Common.OrderId, OrderRequestTypes.OrderRequest>;
  public type CounterState = { var nextId : Nat };

  // Notification log entry
  public type LogEntry = {
    timestamp : Int;
    channel : Text; // "email" | "whatsapp"
    success : Bool;
    message : Text;
  };
  public type NotificationLog = List.List<LogEntry>;

  // Shared mutable notification config (passed from main.mo by reference)
  public type NotifConfig = {
    var resendApiKey : Text;
    var callMeBotApiKey : Text;
  };

  // ── URL encoding ────────────────────────────────────────────────────────────
  let hexChars : [Text] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

  func percentEncodeByte(b : Nat) : Text {
    "%" # hexChars[b / 16] # hexChars[b % 16];
  };

  public func urlEncode(input : Text) : Text {
    var result = "";
    for (c in input.toIter()) {
      let code = c.toNat32();
      if (
        (code >= 65 and code <= 90) or
        (code >= 97 and code <= 122) or
        (code >= 48 and code <= 57) or
        code == 45 or code == 95 or code == 46 or code == 126
      ) {
        result #= Text.fromChar(c);
      } else if (code == 32) {
        result #= "+";
      } else if (code < 128) {
        result #= percentEncodeByte(code.toNat());
      } else {
        result #= "_";
      };
    };
    result;
  };

  // ── Log helpers ─────────────────────────────────────────────────────────────
  // Append a log entry, keeping at most 100 entries (drop oldest)
  public func appendLog(log : NotificationLog, entry : LogEntry) {
    log.add(entry);
    // Trim to last 100 by keeping only the last 100 entries
    if (log.size() > 100) {
      let keep = log.toArray();
      log.clear();
      let start = keep.size() - 100;
      var i = start;
      while (i < keep.size()) {
        log.add(keep[i]);
        i += 1;
      };
    };
  };

  public func getLog(log : NotificationLog) : [LogEntry] {
    log.toArray();
  };

  // ── Order request store ──────────────────────────────────────────────────────
  public func store(
    requests : OrderRequestMap,
    state : CounterState,
    customerName : Text,
    phone : Text,
    productName : Text,
    shoeSize : Text,
    quantity : Nat,
    address : Text,
    note : Text,
  ) : OrderRequestTypes.OrderRequest {
    let id = state.nextId;
    state.nextId += 1;
    let req : OrderRequestTypes.OrderRequest = {
      id;
      customerName;
      phone;
      productName;
      shoeSize;
      quantity;
      address;
      note;
      createdAt = Time.now();
    };
    requests.add(id, req);
    req;
  };

  // ── Resend API email ─────────────────────────────────────────────────────────
  // Build HTML email body for a full order
  func buildResendEmailBody(
    orderId : Text,
    customerName : Text,
    customerPhone : Text,
    shippingAddress : Text,
    pincode : Text,
    orderNotes : Text,
    cartItems : [OrderTypes.CartItemInput],
    totalInCents : Nat,
    paymentMethod : Text,
    orderDate : Text,
  ) : Text {
    var itemRows = "";
    for (item in cartItems.vals()) {
      itemRows #= item.productName # " | Size: " # item.size # " | Qty: " # item.quantity.toText() # " | Rs." # (item.priceInCents / 100).toText() # "\n";
    };
    let totalRupees = (totalInCents / 100).toText();
    "NEW ORDER — Kicks The Complete Sneakers Store\n\n" #
    "Order ID: " # orderId # "\n" #
    "Date: " # orderDate # "\n\n" #
    "CUSTOMER DETAILS\n" #
    "Name: " # customerName # "\n" #
    "Phone: " # customerPhone # "\n" #
    "Shipping Address: " # shippingAddress # "\n" #
    "Pincode: " # pincode # "\n\n" #
    "ORDER ITEMS\n" # itemRows # "\n" #
    "Total: Rs." # totalRupees # "\n" #
    "Payment Method: " # paymentMethod # "\n\n" #
    (if (orderNotes != "") "Notes: " # orderNotes # "\n" else "") #
    "\nPlease process this order promptly.";
  };

  // Send order notification email via Resend API
  public func sendResendEmail(
    apiKey : Text,
    orderId : Text,
    customerName : Text,
    customerPhone : Text,
    shippingAddress : Text,
    pincode : Text,
    orderNotes : Text,
    cartItems : [OrderTypes.CartItemInput],
    totalInCents : Nat,
    paymentMethod : Text,
    orderDate : Text,
    log : NotificationLog,
    transform : OutCall.Transform,
  ) : async Bool {
    if (apiKey == "") {
      appendLog(log, { timestamp = Time.now(); channel = "email"; success = false; message = "Resend API key not configured" });
      return false;
    };
    let textBody = buildResendEmailBody(orderId, customerName, customerPhone, shippingAddress, pincode, orderNotes, cartItems, totalInCents, paymentMethod, orderDate);
    // Escape double quotes in body for JSON embedding
    var safeBody = "";
    for (c in textBody.chars()) {
      if (c.toNat32() == 34) { safeBody #= "'" } else { safeBody #= Text.fromChar(c) };
    };
    let jsonBody =
      "{" #
      "\"from\":\"Kicks Store <onboarding@resend.dev>\"," #
      "\"to\":[\"kicks3099@gmail.com\"]," #
      "\"subject\":\"New Order " # orderId # " — Kicks The Complete\"," #
      "\"text\":\"" # safeBody # "\"" #
      "}";
    let headers : [OutCall.Header] = [
      { name = "Authorization"; value = "Bearer " # apiKey },
      { name = "Content-Type"; value = "application/json" },
    ];
    try {
      let _resp = await OutCall.httpPostRequest("https://api.resend.com/emails", headers, jsonBody, transform);
      appendLog(log, { timestamp = Time.now(); channel = "email"; success = true; message = "Order email sent: " # orderId });
      true;
    } catch (e) {
      appendLog(log, { timestamp = Time.now(); channel = "email"; success = false; message = "Email failed for " # orderId });
      false;
    };
  };

  // ── CallMeBot WhatsApp ───────────────────────────────────────────────────────
  func buildWhatsAppOrderMessage(
    orderId : Text,
    customerName : Text,
    customerPhone : Text,
    productSummary : Text,
    totalInCents : Nat,
    paymentMethod : Text,
    shippingAddress : Text,
  ) : Text {
    let totalRupees = (totalInCents / 100).toText();
    urlEncode(
      "🛒 NEW ORDER — Kicks Store\n" #
      "Order ID: " # orderId # "\n" #
      "Customer: " # customerName # "\n" #
      "Phone: " # customerPhone # "\n" #
      "Items: " # productSummary # "\n" #
      "Total: Rs." # totalRupees # "\n" #
      "Payment: " # paymentMethod # "\n" #
      "Address: " # shippingAddress
    );
  };

  public func sendWhatsAppNotification(
    apiKey : Text,
    orderId : Text,
    customerName : Text,
    customerPhone : Text,
    cartItems : [OrderTypes.CartItemInput],
    totalInCents : Nat,
    paymentMethod : Text,
    shippingAddress : Text,
    log : NotificationLog,
    transform : OutCall.Transform,
  ) : async Bool {
    if (apiKey == "") {
      appendLog(log, { timestamp = Time.now(); channel = "whatsapp"; success = false; message = "CallMeBot API key not configured" });
      return false;
    };
    // Build a compact product summary
    var summary = "";
    for (item in cartItems.vals()) {
      summary #= item.productName # "(" # item.size # "x" # item.quantity.toText() # ") ";
    };
    let encodedMsg = buildWhatsAppOrderMessage(orderId, customerName, customerPhone, summary, totalInCents, paymentMethod, shippingAddress);
    let url =
      "https://api.callmebot.com/whatsapp.php?phone=9834757639&text=" #
      encodedMsg #
      "&apikey=" # apiKey;
    try {
      let _resp = await OutCall.httpGetRequest(url, [], transform);
      appendLog(log, { timestamp = Time.now(); channel = "whatsapp"; success = true; message = "WhatsApp sent for " # orderId });
      true;
    } catch (e) {
      appendLog(log, { timestamp = Time.now(); channel = "whatsapp"; success = false; message = "WhatsApp failed for " # orderId });
      false;
    };
  };
};
