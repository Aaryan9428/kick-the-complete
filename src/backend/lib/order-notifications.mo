import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Char "mo:core/Char";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import OrderRequestTypes "../types/order-requests";
import OrderTypes "../types/orders";
import Common "../types/common";

module {
  public type OrderRequestMap = Map.Map<Common.OrderId, OrderRequestTypes.OrderRequest>;
  public type CounterState = { var nextId : Nat };

  // Hex digits for percent-encoding
  let hexChars : [Text] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

  // URL-encode a single byte value as %XX
  func percentEncodeByte(b : Nat) : Text {
    "%" # hexChars[b / 16] # hexChars[b % 16];
  };

  // URL-encode a text string — safe chars are A-Z a-z 0-9 - _ . ~
  public func urlEncode(input : Text) : Text {
    var result = "";
    for (c in input.toIter()) {
      let code = c.toNat32();
      // unreserved chars: A-Z (65-90), a-z (97-122), 0-9 (48-57), - (45), _ (95), . (46), ~ (126)
      if (
        (code >= 65 and code <= 90) or
        (code >= 97 and code <= 122) or
        (code >= 48 and code <= 57) or
        code == 45 or code == 95 or code == 46 or code == 126
      ) {
        result #= Text.fromChar(c);
      } else if (code == 32) {
        // space -> +
        result #= "+";
      } else if (code < 128) {
        // ASCII non-safe: encode as single %XX byte
        result #= percentEncodeByte(code.toNat());
      } else {
        // Non-ASCII: skip for safety (all inputs are expected to be simple ASCII)
        result #= "_";
      };
    };
    result;
  };

  // Store an order request in stable state and return the assigned ID
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

  // Build the EmailJS JSON body
  func buildEmailBody(
    req : OrderRequestTypes.OrderRequest,
    dateText : Text,
  ) : Text {
    let templateParams =
      "{" #
      "\"customer_name\":\"" # req.customerName # "\"," #
      "\"customer_phone\":\"" # req.phone # "\"," #
      "\"product_name\":\"" # req.productName # "\"," #
      "\"shoe_size\":\"" # req.shoeSize # "\"," #
      "\"quantity\":\"" # req.quantity.toText() # "\"," #
      "\"delivery_address\":\"" # req.address # "\"," #
      "\"note\":\"" # req.note # "\"," #
      "\"order_date\":\"" # dateText # "\"" #
      "}";
    "{" #
    "\"service_id\":\"service_kicks\"," #
    "\"template_id\":\"template_order\"," #
    "\"user_id\":\"user_kicks_store\"," #
    "\"template_params\":" # templateParams #
    "}";
  };

  // Build the WhatsApp message text
  func buildWhatsAppMessage(req : OrderRequestTypes.OrderRequest) : Text {
    "New Order from Kicks Store!%0A" #
    "Customer: " # urlEncode(req.customerName) # "%0A" #
    "Phone: " # urlEncode(req.phone) # "%0A" #
    "Product: " # urlEncode(req.productName) # "%0A" #
    "Size: " # urlEncode(req.shoeSize) # "%0A" #
    "Quantity: " # req.quantity.toText() # "%0A" #
    "Address: " # urlEncode(req.address) # "%0A" #
    "Note: " # urlEncode(req.note);
  };

  // Send email notification via EmailJS REST API
  public func sendEmail(req : OrderRequestTypes.OrderRequest, transform : OutCall.Transform) : async Bool {
    let dateText = req.createdAt.toText();
    let body = buildEmailBody(req, dateText);
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "origin"; value = "http://localhost" },
    ];
    try {
      let _resp = await OutCall.httpPostRequest("https://api.emailjs.com/api/v1.0/email/send", headers, body, transform);
      true;
    } catch (_) {
      false;
    };
  };

  // Send WhatsApp notification via CallMeBot API
  public func sendWhatsApp(req : OrderRequestTypes.OrderRequest, transform : OutCall.Transform) : async Bool {
    let message = buildWhatsAppMessage(req);
    let url =
      "https://api.callmebot.com/whatsapp.php?phone=9834757639&text=" #
      message #
      "&apikey=CALLMEBOT_API_KEY";
    try {
      let _resp = await OutCall.httpGetRequest(url, [], transform);
      true;
    } catch (_) {
      false;
    };
  };
  // Send full order details email to kicks3099@gmail.com via EmailJS
  public func sendFullOrderEmail(
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
    transform : OutCall.Transform,
  ) : async Bool {
    // Build items list as plain text
    var itemsList = "";
    for (item in cartItems.vals()) {
      itemsList #= item.productName # " | Size: " # item.size # " | Qty: " # item.quantity.toText() # " | Price: Rs." # (item.priceInCents / 100).toText() # "\n";
    };
    let totalRupees = (totalInCents / 100).toText();
    let templateParams =
      "{" #
      "\"order_id\":\"" # orderId # "\"," #
      "\"customer_name\":\"" # customerName # "\"," #
      "\"customer_phone\":\"" # customerPhone # "\"," #
      "\"shipping_address\":\"" # shippingAddress # "\"," #
      "\"pincode\":\"" # pincode # "\"," #
      "\"order_notes\":\"" # orderNotes # "\"," #
      "\"items\":\"" # itemsList # "\"," #
      "\"total_amount\":\"Rs." # totalRupees # "\"," #
      "\"payment_method\":\"" # paymentMethod # "\"," #
      "\"order_date\":\"" # orderDate # "\"" #
      "}";
    let body =
      "{" #
      "\"service_id\":\"service_kicks\"," #
      "\"template_id\":\"template_full_order\"," #
      "\"user_id\":\"user_kicks_store\"," #
      "\"accessToken\":\"kicks3099@gmail.com\"," #
      "\"template_params\":" # templateParams #
      "}";
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "origin"; value = "http://localhost" },
    ];
    try {
      let _resp = await OutCall.httpPostRequest("https://api.emailjs.com/api/v1.0/email/send", headers, body, transform);
      true;
    } catch (_) {
      false;
    };
  };
};
