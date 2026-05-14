import { j as jsxRuntimeExports, m as motion, L as Link } from "./index-CQiv2YrY.js";
import { c as createLucideIcon, L as Layout, B as Button } from "./button-DfzMutqC.js";
import { P as Package } from "./package-9UKpTSxu.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
function PaymentSuccess() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "container mx-auto px-4 py-24 text-center",
      "data-ocid": "payment_success.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          className: "max-w-md mx-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6",
                animate: { scale: [1, 1.05, 1] },
                transition: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-accent" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-black text-foreground mb-3", children: "Order Confirmed!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Your payment was successful. Your premium kicks are being prepared for dispatch." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6 mb-8 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-accent shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm", children: "What happens next?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "You'll receive a confirmation email. Delivery in 3-5 business days." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/shop",
                search: { category: void 0, brand: void 0, q: void 0 },
                "data-ocid": "payment_success.continue_shopping_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent", children: "Continue Shopping" })
              }
            )
          ]
        }
      )
    }
  ) });
}
export {
  PaymentSuccess as default
};
