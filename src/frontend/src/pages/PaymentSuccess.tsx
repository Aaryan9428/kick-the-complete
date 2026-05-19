import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link, useSearch } from "@tanstack/react-router";
import { Banknote, CheckCircle2, Package, Smartphone } from "lucide-react";
import { motion } from "motion/react";

export default function PaymentSuccess() {
  const search = useSearch({ strict: false }) as {
    orderId?: string;
    displayOrderId?: string;
    paymentMethod?: string;
    total?: string;
  };

  const { displayOrderId, paymentMethod, total } = search;
  const formattedTotal = total
    ? `₹${Number(total).toLocaleString("en-IN")}`
    : null;
  const isPhonePe = paymentMethod === "phonepe";
  const isCod = paymentMethod === "cod";

  return (
    <Layout>
      <div
        className="min-h-screen bg-[#050508] flex items-center justify-center px-4 py-24"
        data-ocid="payment_success.page"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md w-full text-center"
        >
          {/* Animated checkmark */}
          <motion.div
            className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center relative"
            style={{
              background:
                "radial-gradient(circle, rgba(220,38,38,0.25) 0%, rgba(153,27,27,0.12) 100%)",
              border: "1px solid rgba(220,38,38,0.35)",
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <CheckCircle2 className="w-12 h-12 text-red-500" />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid rgba(220,38,38,0.45)" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-display font-black text-white mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-400 mb-6">
              Thank you for shopping with Kicks.
            </p>
          </motion.div>

          {displayOrderId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="glass-card p-5 mb-5 text-left"
              data-ocid="payment_success.order_id_card"
            >
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                Order ID
              </p>
              <p className="text-xl font-display font-black bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                {displayOrderId}
              </p>
              {formattedTotal && (
                <p className="text-sm text-gray-400 mt-2">
                  Amount paid:{" "}
                  <span className="text-white font-bold">{formattedTotal}</span>
                </p>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="glass-card p-5 mb-8 text-left"
            data-ocid="payment_success.next_steps_card"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  isPhonePe ? "bg-red-500/20" : "bg-emerald-500/20"
                }`}
              >
                {isPhonePe ? (
                  <Smartphone className="w-5 h-5 text-red-400" />
                ) : isCod ? (
                  <Banknote className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Package className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div>
                <div className="font-semibold text-white text-sm mb-1">
                  {isPhonePe
                    ? "PhonePe Payment Received"
                    : isCod
                      ? "Cash on Delivery"
                      : "What happens next?"}
                </div>
                <div className="text-xs text-gray-400 leading-relaxed">
                  {isPhonePe
                    ? "Payment received! Your order is being processed. Our team will contact you shortly to confirm dispatch."
                    : isCod
                      ? "Your order will arrive in 5\u20137 business days. Our team will contact you shortly on WhatsApp or phone to confirm your delivery."
                      : "Your order has been placed. You will receive a confirmation shortly. Delivery in 5\u20137 business days."}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link
              to="/shop"
              search={{ category: undefined, brand: undefined, q: undefined }}
              data-ocid="payment_success.continue_shopping_button"
            >
              <Button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold px-8 py-3 h-auto rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-200">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
