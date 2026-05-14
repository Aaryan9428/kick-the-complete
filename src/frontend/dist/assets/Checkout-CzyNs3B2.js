import { r as reactExports, j as jsxRuntimeExports, e as useNavigate, L as Link, m as motion, u as ue } from "./index-BepgGYDm.js";
import { u as useLayoutEffect2, b as Presence, P as Primitive$1, a as useControllableState, c as composeEventHandlers, e as createContextScope, h as useActor, i as createActor } from "./index-DBimtIV6.js";
import { c as createLucideIcon, e as useComposedRefs, a as cn, j as createSlot, u as useCartStore, L as Layout, i as ShoppingBag, B as Button, A as AnimatePresence } from "./button-rcDW-ULO.js";
import { B as Banknote, S as Smartphone, C as CircleCheck } from "./smartphone-BitHaup5.js";
import { L as LoaderCircle } from "./loader-circle-Cpv7GnKP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$1);
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
function usePrevious(value) {
  const ref = reactExports.useRef({ value, previous: value });
  return reactExports.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}
function useSize(element) {
  const [size, setSize] = reactExports.useState(void 0);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size;
}
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive$1.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive$1.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive$1.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
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
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
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
const inputClass = "bg-gray-900 border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 transition-colors outline-none w-full";
function Checkout() {
  const { items, totalPrice, clearCart } = useCartStore();
  const subtotal = totalPrice();
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [paymentMethod, setPaymentMethod] = reactExports.useState("cod");
  const [phonepePaid, setPhonepePaid] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
  const handleField = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field])
      setErrors((p) => {
        const n = { ...p };
        delete n[field];
        return n;
      });
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/^\+91\s?/, "")))
      e.phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";
    if (!form.pincode.trim()) e.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(form.pincode))
      e.pincode = "Enter a valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      navigate({ to: "/cart" });
      return;
    }
    if (!validate()) {
      ue.error("Please fill in all required fields");
      return;
    }
    if (paymentMethod === "phonepe" && !phonepePaid) {
      ue.error("Please confirm you have completed the PhonePe payment");
      return;
    }
    if (!actor) {
      ue.error("Connection not ready. Please try again.");
      return;
    }
    setIsSubmitting(true);
    try {
      const cartItems = items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        size: item.size,
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(Math.round(item.price * 100))
      }));
      const pm = paymentMethod === "phonepe" ? "phonepe" : "cod";
      const fullAddress = `${form.address}, ${form.city}, ${form.state}`;
      const result = await actor.placeFullOrder({
        customerName: form.name,
        customerPhone: form.phone,
        shippingAddress: fullAddress,
        pincode: form.pincode,
        orderNotes: form.notes,
        cartItems,
        paymentMethod: pm,
        totalInCents: BigInt(Math.round(total * 100))
      });
      if (result.__kind__ === "ok") {
        clearCart();
        navigate({
          to: "/payment-success",
          search: {
            orderId: result.ok.orderId.toString(),
            displayOrderId: result.ok.displayOrderId,
            paymentMethod,
            total: total.toString()
          }
        });
      } else {
        ue.error(result.err || "Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      ue.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-[#050508] px-4 py-10",
      "data-ocid": "checkout.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "mb-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold tracking-[0.25em] uppercase bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2", children: "Secure Checkout" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-display font-black text-white", children: "Complete Your Order" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.5 },
                className: "glass-card p-6 space-y-5",
                "data-ocid": "checkout.shipping_form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-white flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-pink-400" }),
                    "Shipping Information"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-xs text-gray-400", children: "Full Name *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "name",
                          "data-ocid": "checkout.shipping_name_input",
                          placeholder: "Rahul Sharma",
                          value: form.name,
                          onChange: (e) => handleField("name", e.target.value),
                          className: inputClass
                        }
                      ),
                      errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-pink-400",
                          "data-ocid": "checkout.shipping_name.field_error",
                          children: errors.name
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", className: "text-xs text-gray-400", children: "Phone Number *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "phone",
                          "data-ocid": "checkout.shipping_phone_input",
                          placeholder: "9XXXXXXXXX",
                          value: form.phone,
                          onChange: (e) => handleField("phone", e.target.value),
                          className: inputClass
                        }
                      ),
                      errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-pink-400",
                          "data-ocid": "checkout.shipping_phone.field_error",
                          children: errors.phone
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", className: "text-xs text-gray-400", children: [
                      "Email Address",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "(optional)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "email",
                        "data-ocid": "checkout.shipping_email_input",
                        type: "email",
                        placeholder: "you@example.com",
                        value: form.email,
                        onChange: (e) => handleField("email", e.target.value),
                        className: inputClass
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", className: "text-xs text-gray-400", children: "Shipping Address *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "address",
                        "data-ocid": "checkout.shipping_address_input",
                        placeholder: "House/Flat No., Street, Area, Landmark",
                        value: form.address,
                        onChange: (e) => handleField("address", e.target.value),
                        rows: 3,
                        className: `${inputClass} resize-none`
                      }
                    ),
                    errors.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-pink-400",
                        "data-ocid": "checkout.shipping_address.field_error",
                        children: errors.address
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city", className: "text-xs text-gray-400", children: "City *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "city",
                          "data-ocid": "checkout.shipping_city_input",
                          placeholder: "Mumbai",
                          value: form.city,
                          onChange: (e) => handleField("city", e.target.value),
                          className: inputClass
                        }
                      ),
                      errors.city && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-pink-400",
                          "data-ocid": "checkout.shipping_city.field_error",
                          children: errors.city
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "state", className: "text-xs text-gray-400", children: "State *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "state",
                          "data-ocid": "checkout.shipping_state_input",
                          placeholder: "Maharashtra",
                          value: form.state,
                          onChange: (e) => handleField("state", e.target.value),
                          className: inputClass
                        }
                      ),
                      errors.state && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-pink-400",
                          "data-ocid": "checkout.shipping_state.field_error",
                          children: errors.state
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pincode", className: "text-xs text-gray-400", children: "Pincode *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "pincode",
                          "data-ocid": "checkout.shipping_pincode_input",
                          placeholder: "400001",
                          maxLength: 6,
                          value: form.pincode,
                          onChange: (e) => handleField(
                            "pincode",
                            e.target.value.replace(/\D/g, "")
                          ),
                          className: inputClass
                        }
                      ),
                      errors.pincode && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-pink-400",
                          "data-ocid": "checkout.shipping_pincode.field_error",
                          children: errors.pincode
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "notes", className: "text-xs text-gray-400", children: [
                      "Order Notes",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "(optional)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "notes",
                        "data-ocid": "checkout.order_notes_input",
                        placeholder: "Any special instructions for delivery...",
                        value: form.notes,
                        onChange: (e) => handleField("notes", e.target.value),
                        rows: 2,
                        className: `${inputClass} resize-none`
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.5, delay: 0.1 },
                className: "glass-card p-6 space-y-4",
                "data-ocid": "checkout.payment_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-white", children: "Payment Method" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "checkout.payment_cod_tab",
                        onClick: () => setPaymentMethod("cod"),
                        className: `w-full rounded-xl border-2 p-4 text-left transition-all duration-200 ${paymentMethod === "cod" ? "border-pink-500 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.2)]" : "border-gray-700 bg-gray-900/50 hover:border-gray-500"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === "cod" ? "bg-pink-500/20" : "bg-gray-800"}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Banknote,
                                {
                                  className: `w-5 h-5 ${paymentMethod === "cod" ? "text-pink-400" : "text-gray-400"}`
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white text-sm", children: "Cash on Delivery" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30", children: "Free" })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Pay when your order arrives" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === "cod" ? "border-pink-500 bg-pink-500" : "border-gray-600"}`,
                              children: paymentMethod === "cod" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-white" })
                            }
                          )
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "checkout.payment_phonepe_tab",
                        onClick: () => setPaymentMethod("phonepe"),
                        className: `w-full rounded-xl border-2 p-4 text-left transition-all duration-200 ${paymentMethod === "phonepe" ? "border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]" : "border-gray-700 bg-gray-900/50 hover:border-gray-500"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === "phonepe" ? "bg-purple-500/20" : "bg-gray-800"}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Smartphone,
                                {
                                  className: `w-5 h-5 ${paymentMethod === "phonepe" ? "text-purple-400" : "text-gray-400"}`
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white text-sm", children: "PhonePe / UPI" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30", children: "Instant" })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Pay instantly via PhonePe UPI" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === "phonepe" ? "border-purple-500 bg-purple-500" : "border-gray-600"}`,
                              children: paymentMethod === "phonepe" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-white" })
                            }
                          )
                        ] })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: paymentMethod === "phonepe" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, height: 0 },
                      animate: { opacity: 1, height: "auto" },
                      exit: { opacity: 0, height: 0 },
                      transition: { duration: 0.3 },
                      className: "overflow-hidden",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-purple-500/30 bg-purple-500/5 p-5 space-y-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💜" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white text-sm", children: "PhonePe Payment Instructions" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-purple-500/30 text-purple-300 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5", children: "1" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-300", children: "Send payment to UPI ID:" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "mt-1.5 inline-block bg-gray-900 border border-purple-500/40 rounded-lg px-3 py-1.5 text-purple-300 font-mono text-sm font-bold tracking-wider", children: "9834757639@ybl" })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-purple-500/30 text-purple-300 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5", children: "2" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-300", children: "Amount to pay:" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mt-1", children: fmt(total) })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-purple-500/30 text-purple-300 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5", children: "3" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-300", children: "Take a screenshot of the payment confirmation for your reference." })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-purple-500/20 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "label",
                          {
                            className: "flex items-start gap-3 cursor-pointer group",
                            htmlFor: "phonepe-confirmed",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Checkbox,
                                {
                                  id: "phonepe-confirmed",
                                  "data-ocid": "checkout.phonepe_paid_checkbox",
                                  checked: phonepePaid,
                                  onCheckedChange: (v) => setPhonepePaid(!!v),
                                  className: "mt-0.5 border-purple-500/50 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-300 group-hover:text-white transition-colors", children: [
                                "I have completed the PhonePe payment of",
                                " ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-purple-400", children: fmt(total) })
                              ] })
                            ]
                          }
                        ) })
                      ] })
                    }
                  ) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5, delay: 0.15 },
              className: "space-y-4 lg:sticky lg:top-24",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass-card p-6",
                    "data-ocid": "checkout.order_summary",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-white mb-5", children: "Order Summary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-5", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex gap-3 items-center py-2 border-b border-gray-800 last:border-0",
                          "data-ocid": `checkout.item.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-lg overflow-hidden bg-gray-800 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: item.imagePath,
                                alt: item.name,
                                className: "w-full h-full object-cover",
                                loading: "lazy"
                              }
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-white truncate", children: item.name }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500 mt-0.5", children: [
                                "Size ",
                                item.size,
                                " × ",
                                item.quantity
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-white shrink-0", children: fmt(item.price * item.quantity) })
                          ]
                        },
                        `${item.productId}-${item.size}`
                      )) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-400", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: fmt(subtotal) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-400", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST (18%)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: fmt(gst) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-400", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-medium", children: "Free" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-gray-700 my-1" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-base", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "Total" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent", children: fmt(total) })
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "checkout.place_order_button",
                      onClick: handlePlaceOrder,
                      disabled: isSubmitting || paymentMethod === "phonepe" && !phonepePaid,
                      className: "w-full relative overflow-hidden rounded-xl py-4 px-6 font-display font-bold text-white text-base tracking-wide bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] active:scale-[0.99]",
                      children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }),
                        "Placing Order…"
                      ] }) : paymentMethod === "cod" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-5 h-5" }),
                        "Place Order (COD)"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
                        "Confirm PhonePe Payment"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-gray-600 mt-3 flex items-center justify-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                    "Your order details are secure and encrypted"
                  ] })
                ] })
              ]
            }
          )
        ] })
      ] })
    }
  ) });
}
export {
  Checkout as default
};
