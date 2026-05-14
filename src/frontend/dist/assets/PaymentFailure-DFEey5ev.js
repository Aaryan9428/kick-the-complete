import { j as jsxRuntimeExports, m as motion, L as Link } from "./index-BepgGYDm.js";
import { c as createLucideIcon, L as Layout, B as Button } from "./button-rcDW-ULO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
function PaymentFailure() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "container mx-auto px-4 py-24 text-center",
      "data-ocid": "payment_failure.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          className: "max-w-md mx-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-10 h-10 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-black text-foreground mb-3", children: "Payment Failed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-10 leading-relaxed", children: "Something went wrong with your payment. Your cart items are saved — try again." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", "data-ocid": "payment_failure.retry_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 mr-2" }),
                "Try Again"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", "data-ocid": "payment_failure.view_cart_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "border-border/40", children: "View Cart" }) })
            ] })
          ]
        }
      )
    }
  ) });
}
export {
  PaymentFailure as default
};
