import { a as useSearch, j as jsxRuntimeExports, m as motion, L as Link } from "./index-BepgGYDm.js";
import { L as Layout, B as Button } from "./button-rcDW-ULO.js";
import { C as CircleCheck, S as Smartphone, B as Banknote } from "./smartphone-BitHaup5.js";
import { P as Package } from "./package-C4lRBRd-.js";
function PaymentSuccess() {
  const search = useSearch({ strict: false });
  const { displayOrderId, paymentMethod, total } = search;
  const formattedTotal = total ? `₹${Number(total).toLocaleString("en-IN")}` : null;
  const isPhonePe = paymentMethod === "phonepe";
  const isCod = paymentMethod === "cod";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-[#050508] flex items-center justify-center px-4 py-24",
      "data-ocid": "payment_success.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          className: "max-w-md w-full text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center relative",
                style: {
                  background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(168,85,247,0.1) 100%)",
                  border: "1px solid rgba(236,72,153,0.3)"
                },
                animate: { scale: [1, 1.04, 1] },
                transition: {
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-pink-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "absolute inset-0 rounded-full",
                      style: { border: "2px solid rgba(236,72,153,0.4)" },
                      animate: { scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] },
                      transition: {
                        duration: 2.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.2, duration: 0.5 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-display font-black text-white mb-2", children: "Order Placed Successfully!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 mb-6", children: "Thank you for shopping with Kicks." })
                ]
              }
            ),
            displayOrderId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.3, duration: 0.5 },
                className: "glass-card p-5 mb-5 text-left",
                "data-ocid": "payment_success.order_id_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 uppercase tracking-widest mb-1", children: "Order ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent", children: displayOrderId }),
                  formattedTotal && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-400 mt-2", children: [
                    "Amount paid:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: formattedTotal })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.4, duration: 0.5 },
                className: "glass-card p-5 mb-8 text-left",
                "data-ocid": "payment_success.next_steps_card",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isPhonePe ? "bg-purple-500/20" : "bg-emerald-500/20"}`,
                      children: isPhonePe ? /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5 text-purple-400" }) : isCod ? /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-5 h-5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-pink-400" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-white text-sm mb-1", children: isPhonePe ? "PhonePe Payment Received" : isCod ? "Cash on Delivery" : "What happens next?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 leading-relaxed", children: isPhonePe ? "Payment received! Your order is being processed. Our team will contact you shortly to confirm dispatch." : isCod ? "Your order will arrive in 5–7 business days. Our team will contact you shortly on WhatsApp or phone to confirm your delivery." : "Your order has been placed. You will receive a confirmation shortly. Delivery in 5–7 business days." })
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.5, duration: 0.5 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/shop",
                    search: { category: void 0, brand: void 0, q: void 0 },
                    "data-ocid": "payment_success.continue_shopping_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold px-8 py-3 h-auto rounded-xl shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] transition-all duration-200", children: "Continue Shopping" })
                  }
                )
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
