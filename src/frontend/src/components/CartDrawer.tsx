import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  const subtotal = totalPrice();
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.dialog
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm flex flex-col m-0 p-0 border-0 bg-transparent outline-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,15,25,0.98) 0%, rgba(10,10,20,0.99) 100%)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              maxHeight: "100dvh",
            }}
            aria-label="Shopping cart"
            aria-modal="true"
            open
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-red-500" />
                <h2 className="text-base font-display font-bold text-foreground tracking-wide">
                  Shopping Cart
                </h2>
                {items.length > 0 && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-white">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={closeCart}
                data-ocid="cart_drawer.close_button"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-smooth"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div
              className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
              data-ocid="cart_drawer.list"
            >
              {items.length === 0 ? (
                <div
                  data-ocid="cart_drawer.empty_state"
                  className="flex flex-col items-center justify-center h-full gap-4 text-center py-16"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-foreground">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add some sneakers to get started
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-2 text-sm font-medium text-red-500 hover:text-red-400 transition-smooth"
                  >
                    Continue Shopping →
                  </button>
                </div>
              ) : (
                items.map((item, idx) => (
                  <motion.div
                    key={`${item.productId}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.05 }}
                    data-ocid={`cart_drawer.item.${idx + 1}`}
                    className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/8 hover:border-white/15 transition-smooth"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                      <img
                        src={item.imagePath}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate leading-snug">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/10 text-muted-foreground tracking-wide">
                          UK {item.size}
                        </span>
                      </div>
                      <p
                        className="text-sm font-bold mt-1.5"
                        style={{
                          background:
                            "linear-gradient(90deg, #dc2626, #991b1b)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Qty + Remove */}
                    <div className="flex flex-col items-end justify-between gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, item.size)}
                        data-ocid={`cart_drawer.delete_button.${idx + 1}`}
                        className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-smooth"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          data-ocid={`cart_drawer.qty_minus.${idx + 1}`}
                          className="w-6 h-6 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 text-foreground transition-smooth"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          data-ocid={`cart_drawer.qty_plus.${idx + 1}`}
                          className="w-6 h-6 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 text-foreground transition-smooth"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer totals + CTA */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-white/10 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="text-foreground font-medium">
                      {formatPrice(gst)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-1.5 border-t border-white/10">
                    <span className="text-foreground">Total</span>
                    <span
                      style={{
                        background: "linear-gradient(90deg, #dc2626, #991b1b)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  onClick={closeCart}
                  data-ocid="cart_drawer.checkout_button"
                  className="block w-full py-3 rounded-xl text-center text-sm font-bold text-white transition-smooth hover:opacity-90 active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(90deg, #dc2626, #991b1b)",
                    boxShadow: "0 0 24px rgba(220,38,38,0.40)",
                  }}
                >
                  Proceed to Checkout
                </Link>

                <button
                  type="button"
                  onClick={closeCart}
                  data-ocid="cart_drawer.continue_shopping"
                  className="block w-full py-2.5 rounded-xl text-center text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-smooth border border-white/10"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  );
}
