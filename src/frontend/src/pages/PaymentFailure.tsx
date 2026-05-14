import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { RotateCcw, XCircle } from "lucide-react";
import { motion } from "motion/react";

export default function PaymentFailure() {
  return (
    <Layout>
      <div
        className="container mx-auto px-4 py-24 text-center"
        data-ocid="payment_failure.page"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md mx-auto"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-3xl font-display font-black text-foreground mb-3">
            Payment Failed
          </h1>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Something went wrong with your payment. Your cart items are saved —
            try again.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/checkout" data-ocid="payment_failure.retry_button">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </Link>
            <Link to="/cart" data-ocid="payment_failure.view_cart_button">
              <Button variant="outline" className="border-border/40">
                View Cart
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
