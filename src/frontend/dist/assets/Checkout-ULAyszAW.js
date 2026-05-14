var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { S as Subscribable, s as shallowEqualObjects, h as hashKey, g as getDefaultState, n as notifyManager, f as useQueryClient, r as reactExports, i as noop, k as shouldThrowError, j as jsxRuntimeExports, l as useNavigate, o as useInternetIdentity, L as Link, m as motion, u as ue } from "./index-CQiv2YrY.js";
import { c as createLucideIcon, i as createSlot, g as cn, u as useCartStore, L as Layout, B as Button } from "./button-DfzMutqC.js";
import { I as Input } from "./input-CcKVrE4h.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-BHlQehYT.js";
import { S as ShoppingBag } from "./shopping-bag-CC5oXzFw.js";
import { L as LoaderCircle } from "./loader-circle-CxQ5ylIP.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a2;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a2 = props.onMouseDown) == null ? void 0 : _a2.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function useIsStripeConfigured() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["stripe-configured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (items) => {
      if (!actor) throw new Error("Actor not available");
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success`;
      const cancelUrl = `${baseUrl}/payment-failure`;
      const result = await actor.createCheckoutSession(
        items,
        successUrl,
        cancelUrl
      );
      const session = JSON.parse(result);
      if (!(session == null ? void 0 : session.url)) throw new Error("Stripe session missing url");
      return session;
    }
  });
}
function useSetStripeConfiguration() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (config) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setStripeConfiguration(config);
    }
  });
}
function Checkout() {
  const { items, totalPrice, clearCart } = useCartStore();
  const total = totalPrice();
  const navigate = useNavigate();
  const { isAuthenticated } = useInternetIdentity();
  const { data: stripeConfigured, isLoading: checkingStripe } = useIsStripeConfigured();
  const createCheckout = useCreateCheckoutSession();
  const setStripeConfig = useSetStripeConfiguration();
  const [stripeKey, setStripeKey] = reactExports.useState("");
  const [countries, setCountries] = reactExports.useState("US,GB,CA,AU,IN");
  const [showStripeSetup, setShowStripeSetup] = reactExports.useState(false);
  const [shippingForm, setShippingForm] = reactExports.useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });
  const [shippingErrors, setShippingErrors] = reactExports.useState(
    {}
  );
  const validateShipping = () => {
    const errors = {};
    if (!shippingForm.name.trim()) errors.name = "Name is required";
    if (!shippingForm.email.trim()) errors.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(shippingForm.email))
      errors.email = "Invalid email";
    if (!shippingForm.address.trim()) errors.address = "Address is required";
    if (!shippingForm.city.trim()) errors.city = "City is required";
    if (!shippingForm.state.trim()) errors.state = "State is required";
    if (!shippingForm.zip.trim()) errors.zip = "ZIP code is required";
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleFieldChange = (field, value) => {
    setShippingForm((prev) => ({ ...prev, [field]: value }));
    if (shippingErrors[field]) {
      setShippingErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  };
  const handleStripeSetup = async () => {
    if (!stripeKey.trim()) {
      ue.error("Enter your Stripe secret key");
      return;
    }
    try {
      await setStripeConfig.mutateAsync({
        secretKey: stripeKey.trim(),
        allowedCountries: countries.split(",").map((c) => c.trim()).filter(Boolean)
      });
      ue.success("Stripe configured successfully!");
      setShowStripeSetup(false);
    } catch {
      ue.error("Failed to configure Stripe");
    }
  };
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
      return;
    }
    if (items.length === 0) {
      navigate({ to: "/cart" });
      return;
    }
    if (!validateShipping()) {
      ue.error("Please fill in all shipping details");
      return;
    }
    const shoppingItems = items.map((item) => ({
      productName: item.name,
      currency: "inr",
      quantity: BigInt(item.quantity),
      priceInCents: BigInt(Math.round(item.price * 100)),
      productDescription: `${item.brand} - Size ${item.size}`
    }));
    try {
      const session = await createCheckout.mutateAsync(shoppingItems);
      if (!(session == null ? void 0 : session.url)) throw new Error("Missing session url");
      clearCart();
      window.location.href = session.url;
    } catch (_err) {
      ue.error("Checkout failed. Please try again.");
    }
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-20 text-center",
        "data-ocid": "checkout.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-16 h-16 text-muted-foreground/40 mx-auto mb-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground mb-4", children: "Nothing to checkout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/shop",
              search: { category: void 0, brand: void 0, q: void 0 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Shop Now" })
            }
          )
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", "data-ocid": "checkout.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2", children: "Secure Checkout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "section-heading mb-10", children: "Complete Your Order" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground mb-6", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-6", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-card p-3 flex gap-3 items-center",
                "data-ocid": `checkout.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-lg overflow-hidden bg-muted/30 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: item.imagePath,
                      alt: item.name,
                      className: "w-full h-full object-cover"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground truncate", children: item.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                      "Size ",
                      item.size,
                      " × ",
                      item.quantity
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold text-foreground shrink-0", children: [
                    "₹",
                    (item.price * item.quantity).toLocaleString("en-IN")
                  ] })
                ]
              },
              `${item.productId}-${item.size}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-4 space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                  "₹",
                  total.toLocaleString("en-IN")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Free" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground text-base", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "₹",
                  total.toLocaleString("en-IN")
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "space-y-6",
          children: [
            !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3 p-4 rounded-lg border border-primary/30 bg-primary/5",
                "data-ocid": "checkout.auth_warning",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm", children: "Login Required" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "You need to login to complete your purchase." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-2 inline-block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        className: "bg-primary text-primary-foreground text-xs h-7",
                        "data-ocid": "checkout.login_redirect_button",
                        children: "Login Now"
                      }
                    ) })
                  ] })
                ]
              }
            ),
            isAuthenticated && !checkingStripe && !stripeConfigured && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-card p-5",
                "data-ocid": "checkout.stripe_setup_panel",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-accent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Configure Stripe Payments" })
                  ] }),
                  showStripeSetup ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          htmlFor: "stripe-key",
                          className: "text-xs text-muted-foreground",
                          children: "Stripe Secret Key"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "stripe-key",
                          "data-ocid": "checkout.stripe_key_input",
                          type: "password",
                          placeholder: "sk_test_...",
                          value: stripeKey,
                          onChange: (e) => setStripeKey(e.target.value),
                          className: "bg-muted/30 border-border/40 text-sm"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          htmlFor: "stripe-countries",
                          className: "text-xs text-muted-foreground",
                          children: "Allowed Countries (comma-separated)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "stripe-countries",
                          "data-ocid": "checkout.stripe_countries_input",
                          placeholder: "US,GB,IN",
                          value: countries,
                          onChange: (e) => setCountries(e.target.value),
                          className: "bg-muted/30 border-border/40 text-sm"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          "data-ocid": "checkout.stripe_save_button",
                          onClick: handleStripeSetup,
                          disabled: setStripeConfig.isPending,
                          className: "bg-primary text-primary-foreground text-sm h-9",
                          children: setStripeConfig.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Save"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          onClick: () => setShowStripeSetup(false),
                          className: "text-sm h-9 border-border/40",
                          "data-ocid": "checkout.stripe_cancel_button",
                          children: "Cancel"
                        }
                      )
                    ] })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Admin: Configure Stripe to enable real payments." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        "data-ocid": "checkout.stripe_configure_button",
                        onClick: () => setShowStripeSetup(true),
                        variant: "outline",
                        className: "border-accent/40 text-accent hover:bg-accent/10 text-sm",
                        children: "Configure Stripe"
                      }
                    )
                  ] })
                ]
              }
            ),
            isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-card p-6 space-y-4",
                "data-ocid": "checkout.shipping_form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-accent" }),
                    " Shipping Information"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          htmlFor: "ship-name",
                          className: "text-xs text-muted-foreground",
                          children: "Full Name *"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "ship-name",
                          "data-ocid": "checkout.shipping_name_input",
                          placeholder: "John Doe",
                          value: shippingForm.name,
                          onChange: (e) => handleFieldChange("name", e.target.value),
                          className: "bg-muted/30 border-border/40 text-sm"
                        }
                      ),
                      shippingErrors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-primary",
                          "data-ocid": "checkout.shipping_name.field_error",
                          children: shippingErrors.name
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          htmlFor: "ship-email",
                          className: "text-xs text-muted-foreground",
                          children: "Email *"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "ship-email",
                          "data-ocid": "checkout.shipping_email_input",
                          type: "email",
                          placeholder: "you@example.com",
                          value: shippingForm.email,
                          onChange: (e) => handleFieldChange("email", e.target.value),
                          className: "bg-muted/30 border-border/40 text-sm"
                        }
                      ),
                      shippingErrors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-primary",
                          "data-ocid": "checkout.shipping_email.field_error",
                          children: shippingErrors.email
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "ship-address",
                        className: "text-xs text-muted-foreground",
                        children: "Address *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "ship-address",
                        "data-ocid": "checkout.shipping_address_input",
                        placeholder: "123 Main Street, Apt 4B",
                        value: shippingForm.address,
                        onChange: (e) => handleFieldChange("address", e.target.value),
                        className: "bg-muted/30 border-border/40 text-sm"
                      }
                    ),
                    shippingErrors.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-primary",
                        "data-ocid": "checkout.shipping_address.field_error",
                        children: shippingErrors.address
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          htmlFor: "ship-city",
                          className: "text-xs text-muted-foreground",
                          children: "City *"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "ship-city",
                          "data-ocid": "checkout.shipping_city_input",
                          placeholder: "Mumbai",
                          value: shippingForm.city,
                          onChange: (e) => handleFieldChange("city", e.target.value),
                          className: "bg-muted/30 border-border/40 text-sm"
                        }
                      ),
                      shippingErrors.city && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-primary",
                          "data-ocid": "checkout.shipping_city.field_error",
                          children: shippingErrors.city
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          htmlFor: "ship-state",
                          className: "text-xs text-muted-foreground",
                          children: "State *"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "ship-state",
                          "data-ocid": "checkout.shipping_state_input",
                          placeholder: "Maharashtra",
                          value: shippingForm.state,
                          onChange: (e) => handleFieldChange("state", e.target.value),
                          className: "bg-muted/30 border-border/40 text-sm"
                        }
                      ),
                      shippingErrors.state && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-primary",
                          "data-ocid": "checkout.shipping_state.field_error",
                          children: shippingErrors.state
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          htmlFor: "ship-zip",
                          className: "text-xs text-muted-foreground",
                          children: "ZIP Code *"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "ship-zip",
                          "data-ocid": "checkout.shipping_zip_input",
                          placeholder: "400001",
                          value: shippingForm.zip,
                          onChange: (e) => handleFieldChange("zip", e.target.value),
                          className: "bg-muted/30 border-border/40 text-sm"
                        }
                      ),
                      shippingErrors.zip && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-primary",
                          "data-ocid": "checkout.shipping_zip.field_error",
                          children: shippingErrors.zip
                        }
                      )
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Secured by Stripe. Your payment details are encrypted." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": "checkout.pay_button",
                  onClick: handleCheckout,
                  disabled: createCheckout.isPending || !isAuthenticated,
                  className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent h-12 font-semibold text-base",
                  children: createCheckout.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 mr-2 animate-spin" }),
                    " ",
                    "Processing…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    "Pay ₹",
                    total.toLocaleString("en-IN"),
                    " with Stripe"
                  ] })
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] }) });
}
export {
  Checkout as default
};
