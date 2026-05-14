import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Package } from "lucide-react";
import { motion } from "motion/react";

export default function PaymentSuccess() {
  return (
    <Layout>
      <div
        className="container mx-auto px-4 py-24 text-center"
        data-ocid="payment_success.page"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md mx-auto"
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </motion.div>

          <h1 className="text-3xl font-display font-black text-foreground mb-3">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Your payment was successful. Your premium kicks are being prepared
            for dispatch.
          </p>

          <div className="glass-card p-6 mb-8 flex items-center gap-4">
            <Package className="w-8 h-8 text-accent shrink-0" />
            <div className="text-left">
              <div className="font-semibold text-foreground text-sm">
                What happens next?
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                You'll receive a confirmation email. Delivery in 3-5 business
                days.
              </div>
            </div>
          </div>

          <Link
            to="/shop"
            search={{ category: undefined, brand: undefined, q: undefined }}
            data-ocid="payment_success.continue_shopping_button"
          >
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}
