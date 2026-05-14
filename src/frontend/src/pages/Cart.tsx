import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } =
    useCartStore();
  const total = totalPrice();
  const count = totalItems();

  if (count === 0) {
    return (
      <Layout>
        <div
          className="container mx-auto px-4 py-20 text-center"
          data-ocid="cart.empty_state"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingBag className="w-20 h-20 text-muted-foreground/40 mx-auto mb-6" />
            <h1 className="text-3xl font-display font-bold text-foreground mb-3">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              Looks like you haven't added any pairs yet. Time to step up your
              game.
            </p>
            <Link
              to="/shop"
              search={{ category: undefined, brand: undefined, q: undefined }}
              data-ocid="cart.shop_link"
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent">
                Explore Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10" data-ocid="cart.page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">
            {count} Items
          </div>
          <h1 className="section-heading mb-10">Your Cart</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={`${item.productId}-${item.size}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card p-4 flex gap-4 items-center"
                data-ocid={`cart.item.${i + 1}`}
              >
                <Link
                  to="/product/$id"
                  params={{ id: item.productId }}
                  className="shrink-0"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted/30">
                    <img
                      src={item.imagePath}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                    {item.brand}
                  </div>
                  <div className="font-display font-semibold text-foreground truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Size: {item.size}
                  </div>
                  <div className="text-sm font-bold text-foreground mt-1">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    data-ocid={`cart.decrease_button.${i + 1}`}
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.size,
                        item.quantity - 1,
                      )
                    }
                    className="w-7 h-7 rounded-md bg-muted/60 hover:bg-muted flex items-center justify-center text-foreground transition-smooth"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-foreground">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    data-ocid={`cart.increase_button.${i + 1}`}
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.size,
                        item.quantity + 1,
                      )
                    }
                    className="w-7 h-7 rounded-md bg-muted/60 hover:bg-muted flex items-center justify-center text-foreground transition-smooth"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  type="button"
                  data-ocid={`cart.delete_button.${i + 1}`}
                  onClick={() => {
                    removeItem(item.productId, item.size);
                    toast.success("Item removed");
                  }}
                  aria-label="Remove item"
                  className="w-8 h-8 rounded-lg bg-muted/40 hover:bg-primary/10 hover:text-primary text-muted-foreground flex items-center justify-center transition-smooth shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="glass-card p-6 sticky top-24"
              data-ocid="cart.summary_panel"
            >
              <h2 className="font-display font-bold text-lg text-foreground mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({count} items)</span>
                  <span className="text-foreground font-medium">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST (18%)</span>
                  <span className="text-foreground font-medium">
                    ₹{Math.round(total * 0.18).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-accent font-medium">Free</span>
                </div>
                <div className="h-px bg-border/30 my-2" />
                <div className="flex justify-between text-foreground font-bold text-base">
                  <span>Total</span>
                  <span>
                    ₹
                    {(total + Math.round(total * 0.18)).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block mt-6"
                data-ocid="cart.checkout_button"
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent h-12 font-semibold">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link
                to="/shop"
                search={{ category: undefined, brand: undefined, q: undefined }}
                className="block mt-3"
                data-ocid="cart.continue_shopping_link"
              >
                <Button variant="outline" className="w-full border-border/40">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
