import { j as jsxRuntimeExports, m as motion, L as Link, u as ue } from "./index-CQiv2YrY.js";
import { c as createLucideIcon, u as useCartStore, L as Layout, B as Button } from "./button-DfzMutqC.js";
import { S as ShoppingBag } from "./shopping-bag-CC5oXzFw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();
  const total = totalPrice();
  const count = totalItems();
  if (count === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "container mx-auto px-4 py-20 text-center",
        "data-ocid": "cart.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-20 h-20 text-muted-foreground/40 mx-auto mb-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-3", children: "Your Cart is Empty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-sm mx-auto", children: "Looks like you haven't added any pairs yet. Time to step up your game." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/shop",
                  search: { category: void 0, brand: void 0, q: void 0 },
                  "data-ocid": "cart.shop_link",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent", children: "Explore Collection" })
                }
              )
            ]
          }
        )
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", "data-ocid": "cart.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2", children: [
            count,
            " Items"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "section-heading mb-10", children: "Your Cart" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-4", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4, delay: i * 0.08 },
          className: "glass-card p-4 flex gap-4 items-center",
          "data-ocid": `cart.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/product/$id",
                params: { id: item.productId },
                className: "shrink-0",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-lg overflow-hidden bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: item.imagePath,
                    alt: item.name,
                    className: "w-full h-full object-cover"
                  }
                ) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold tracking-widest uppercase text-muted-foreground", children: item.brand }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-foreground truncate", children: item.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Size: ",
                item.size
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold text-foreground mt-1", children: [
                "₹",
                (item.price * item.quantity).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `cart.decrease_button.${i + 1}`,
                  onClick: () => updateQuantity(
                    item.productId,
                    item.size,
                    item.quantity - 1
                  ),
                  className: "w-7 h-7 rounded-md bg-muted/60 hover:bg-muted flex items-center justify-center text-foreground transition-smooth",
                  "aria-label": "Decrease quantity",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center text-sm font-semibold text-foreground", children: item.quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `cart.increase_button.${i + 1}`,
                  onClick: () => updateQuantity(
                    item.productId,
                    item.size,
                    item.quantity + 1
                  ),
                  className: "w-7 h-7 rounded-md bg-muted/60 hover:bg-muted flex items-center justify-center text-foreground transition-smooth",
                  "aria-label": "Increase quantity",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `cart.delete_button.${i + 1}`,
                onClick: () => {
                  removeItem(item.productId, item.size);
                  ue.success("Item removed");
                },
                "aria-label": "Remove item",
                className: "w-8 h-8 rounded-lg bg-muted/40 hover:bg-primary/10 hover:text-primary text-muted-foreground flex items-center justify-center transition-smooth shrink-0",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ]
        },
        `${item.productId}-${item.size}`
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.2 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-card p-6 sticky top-24",
              "data-ocid": "cart.summary_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-6", children: "Order Summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Subtotal (",
                      count,
                      " items)"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                      "₹",
                      total.toLocaleString("en-IN")
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST (18%)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                      "₹",
                      Math.round(total * 0.18).toLocaleString("en-IN")
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-medium", children: "Free" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/30 my-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-foreground font-bold text-base", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "₹",
                      (total + Math.round(total * 0.18)).toLocaleString("en-IN")
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/checkout",
                    className: "block mt-6",
                    "data-ocid": "cart.checkout_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent h-12 font-semibold", children: "Proceed to Checkout" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/shop",
                    search: { category: void 0, brand: void 0, q: void 0 },
                    className: "block mt-3",
                    "data-ocid": "cart.continue_shopping_link",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full border-border/40", children: "Continue Shopping" })
                  }
                )
              ]
            }
          )
        }
      )
    ] })
  ] }) });
}
export {
  Cart as default
};
