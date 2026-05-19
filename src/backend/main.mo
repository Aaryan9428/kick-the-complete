import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Map "mo:core/Map";
import Common "types/common";
import ProductTypes "types/products";
import OrderTypes "types/orders";
import ProductsMixin "mixins/products-api";
import OrdersMixin "mixins/orders-api";
import ProductLib "lib/products";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";
import OrderRequestTypes "types/order-requests";
import OrderNotifLib "lib/order-notifications";
import OrderNotificationsMixin "mixins/order-notifications";
import List "mo:core/List";



persistent actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Products state
  let productCatalog = Map.empty<Text, ProductTypes.Product>();

  // Seed products on first deploy (catalog is empty only before any products are added)
  do {
    if (productCatalog.isEmpty()) {
      let seeds : [ProductTypes.ProductInput] = [
        {
          id = "nb-327-black";
          name = "327 Black/Grey";
          brand = "Premium";
          description = "A bold retro runner fusing heritage design with modern performance. The 327 features an asymmetric logo and suede/mesh upper for premium street style.";
          priceInCents = 1299900;
          imagePaths = ["/assets/snapchat-74182342-019e0725-6a4f-7569-a07c-dde45c1c55a4.jpg"];
          category = "lifestyle";
          sizes = ["6", "7", "8", "9", "10", "11", "12"];
          stock = 15;
          isFeatured = true;
          isLimited = false;
          badge = null;
        },
        {
          id = "nike-af1-lv-black";
          name = "Air Force 1 LV Monogram";
          brand = "Premium";
          description = "The iconic Air Force 1 elevated with a luxury LV-inspired monogram pattern. All-black construction with premium leather upper — a collector's statement piece.";
          priceInCents = 1699900;
          imagePaths = [
            "/assets/snapchat-552582316-019e0725-6a4f-72ec-adc7-dd078dbe971c.jpg",
            "/assets/snapchat-25268531-019e0725-6ab3-70ec-b8ad-68025f907182.jpg",
            "/assets/snapchat-1449134242-019e0725-6e30-70fc-9ffc-d8f9c52e3eb8.jpg"
          ];
          category = "lifestyle";
          sizes = ["6", "7", "8", "9", "10", "11", "12"];
          stock = 8;
          isFeatured = false;
          isLimited = true;
          badge = ?"LIMITED";
        },
        {
          id = "nb-grey-retro";
          name = "Retro Runner";
          brand = "Premium";
          description = "Classic retro running silhouette with premium suede paneling and a plush foam midsole. Timeless grey tones for everyday luxury.";
          priceInCents = 1199900;
          imagePaths = ["/assets/snapchat-519172482-019e0725-6ae1-736d-9418-c916ffbdadf6.jpg"];
          category = "lifestyle";
          sizes = ["6", "7", "8", "9", "10", "11", "12"];
          stock = 20;
          isFeatured = false;
          isLimited = false;
          badge = null;
        },
        {
          id = "reebok-zig";
          name = "Zig Kinetica";
          brand = "Signature";
          description = "Futuristic Zig energy return technology meets bold design. Explosive cushioning for runners who refuse to compromise on style.";
          priceInCents = 999900;
          imagePaths = ["/assets/snapchat-651984858-019e0725-6ada-7046-8494-bf91c60fb95d.jpg"];
          category = "running";
          sizes = ["6", "7", "8", "9", "10", "11", "12"];
          stock = 12;
          isFeatured = false;
          isLimited = false;
          badge = null;
        },
        {
          id = "nike-zoom-cyan";
          name = "Air Zoom Vomero Cyan";
          brand = "Premium";
          description = "Maximum cushion meets race-day speed. Full-length Zoom Air unit and plush foam deliver elite comfort in a striking cyan colorway.";
          priceInCents = 1399900;
          imagePaths = ["/assets/snapchat-794509771-019e0725-6bc1-70a2-90a8-6e60fa4c0aeb.jpg"];
          category = "running";
          sizes = ["6", "7", "8", "9", "10", "11", "12"];
          stock = 10;
          isFeatured = false;
          isLimited = false;
          badge = null;
        },
        {
          id = "jordan-1-yellow";
          name = "Air Jordan 1 High Yellow/Black";
          brand = "Limited Edition";
          description = "The legendary Jordan 1 in a head-turning yellow and black colorway. High-top ankle support with premium leather construction — a grail for every collector.";
          priceInCents = 1899900;
          imagePaths = ["/assets/snapchat-999219426-019e0725-6c15-735d-9c38-3afd8523916d.jpg"];
          category = "basketball";
          sizes = ["7", "8", "9", "10", "11", "12"];
          stock = 5;
          isFeatured = true;
          isLimited = true;
          badge = ?"HOT";
        },
        {
          id = "nike-af1-naruto";
          name = "AF1 Naruto Akatsuki Edition";
          brand = "Premium";
          description = "Ultra-rare Air Force 1 collaboration inspired by the Akatsuki clan. Hand-crafted details, embroidered cloud motifs, and a crimson sole — only 3 pairs remain.";
          priceInCents = 2299900;
          imagePaths = [
            "/assets/snapchat-891787037-019e0725-6cae-766d-9235-a524c4345b65.jpg",
            "/assets/snapchat-1096384696-019e0725-6e1b-7438-a749-d357bd28d3c2.jpg"
          ];
          category = "limited";
          sizes = ["7", "8", "9", "10", "11"];
          stock = 3;
          isFeatured = true;
          isLimited = true;
          badge = ?"RARE";
        },
        {
          id = "crocs-literide";
          name = "LiteRide White/Blue";
          brand = "Comfort";
          description = "Revolutionary LiteRide foam footbed provides next-level softness and comfort. A classic silhouette reimagined for premium everyday wear.";
          priceInCents = 699900;
          imagePaths = ["/assets/snapchat-799503199-019e0725-6e24-7582-b1b9-032cb72b5cbd.jpg"];
          category = "lifestyle";
          sizes = ["6", "7", "8", "9", "10", "11", "12"];
          stock = 25;
          isFeatured = false;
          isLimited = false;
          badge = null;
        },
        {
          id = "jordan-1-mid-red";
          name = "Air Jordan 1 Mid Black/Red";
          brand = "Limited Edition";
          description = "The iconic Mid silhouette in the classic Black/Red Chicago-inspired palette. Premium leather with responsive Air cushioning — the sneaker that started the revolution.";
          priceInCents = 1799900;
          imagePaths = ["/assets/snapchat-1816019002-019e0725-6e3c-7085-af36-34bb0aa00e37.jpg"];
          category = "basketball";
          sizes = ["7", "8", "9", "10", "11", "12"];
          stock = 7;
          isFeatured = true;
          isLimited = false;
          badge = null;
        },
        {
          id = "jordan-1-unc";
          name = "Air Jordan 1 University Blue";
          brand = "Limited Edition";
          description = "Pay homage to Carolina roots with this coveted University Blue Jordan 1. Impeccable leather quality, clean UNC colourway — a must-have for serious collectors.";
          priceInCents = 2099900;
          imagePaths = ["/assets/snapchat-1788609277-019e0725-6e16-700f-b6e4-efd9f1439312.jpg"];
          category = "basketball";
          sizes = ["7", "8", "9", "10", "11", "12"];
          stock = 4;
          isFeatured = true;
          isLimited = true;
          badge = ?"MUST HAVE";
        },
        {
          id = "adidas-eq21";
          name = "EQ21 Run Triple Black";
          brand = "Premium";
          description = "All-black stealth runner engineered for everyday training. Responsive Bounce midsole and durable outsole deliver premium performance in a sleek blacked-out package.";
          priceInCents = 1099900;
          imagePaths = ["/assets/snapchat-2010385672-019e0725-6e5a-727d-b939-f13e2dfafddf.jpg"];
          category = "running";
          sizes = ["6", "7", "8", "9", "10", "11", "12"];
          stock = 14;
          isFeatured = false;
          isLimited = false;
          badge = null;
        },
        {
          id = "nike-zoom-grey";
          name = "Air Zoom Vomero Grey/Red";
          brand = "Premium";
          description = "Elite road running performance in a bold grey and red colourway. Full-length Zoom Air cushioning and engineered mesh upper for speed without sacrifice.";
          priceInCents = 1349900;
          imagePaths = ["/assets/snapchat-1248588398-019e0725-6e3b-730b-99c5-9c3536503c5e.jpg"];
          category = "running";
          sizes = ["6", "7", "8", "9", "10", "11", "12"];
          stock = 18;
          isFeatured = false;
          isLimited = false;
          badge = null;
        },
        {
          id = "nike-af1-lv-beige";
          name = "Air Force 1 LV Beige/Gold";
          brand = "Premium";
          description = "Luxury meets street culture in this beige and gold AF1. Premium tumbled leather upper with gold accents — the pinnacle of understated opulence.";
          priceInCents = 1599900;
          imagePaths = ["/assets/snapchat-844653338-019e0725-6e15-71d8-a64e-11e5a3c8d63b.jpg"];
          category = "lifestyle";
          sizes = ["6", "7", "8", "9", "10", "11", "12"];
          stock = 9;
          isFeatured = false;
          isLimited = true;
          badge = ?"PREMIUM";
        },
      ];
      for (seed in seeds.vals()) {
        ProductLib.upsert(productCatalog, seed);
      };
    };
  };

  // Orders state
  let orderStore = Map.empty<Common.OrderId, OrderTypes.Order>();
  let orderState = { var nextOrderId : Nat = 0 };

  // Order requests state (anonymous order notification system)
  let orderRequestStore = Map.empty<Common.OrderId, OrderRequestTypes.OrderRequest>();
  let orderRequestState : OrderNotifLib.CounterState = { var nextId : Nat = 0 };
  // Notification config (mutable keys set via Candid UI)
  let notifConfig : OrderNotifLib.NotifConfig = { var resendApiKey = ""; var callMeBotApiKey = "" };
  // Notification delivery log (last 100 entries)
  let notifLog = List.empty<OrderNotifLib.LogEntry>();

  // Stripe configuration state
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  // Domain mixins
  include ProductsMixin(accessControlState, productCatalog);
  // Stripe-required functions (must live directly in actor)
  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfiguration := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Domain mixins that require transform (must come after transform definition)
  include OrdersMixin(accessControlState, orderStore, orderState, notifConfig, notifLog, transform);

  // Order notification mixin (after transform so the shared query func is in scope)
  include OrderNotificationsMixin(orderRequestStore, orderRequestState, notifConfig, notifLog, transform);
};
