import { createActor } from "@/backend";
import type { CartItemInput, PaymentMethod } from "@/backend";
import { Layout } from "@/components/Layout";
import { UpiPayment } from "@/components/UpiPayment";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/stores/cartStore";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Banknote,
  CheckCircle2,
  Loader2,
  Lock,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

type PaymentOption = "cod" | "phonepe";

interface FormState {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

const inputClass =
  "bg-gray-900 border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500/30 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 transition-colors outline-none w-full";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCartStore();
  const subtotal = totalPrice();
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  const navigate = useNavigate();
  const { actor } = useActor(createActor);

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentOption>("cod");
  const [phonepePaid, setPhonepePaid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const handleField = (field: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field])
      setErrors((p) => {
        const n = { ...p };
        delete n[field];
        return n;
      });
  };

  const validate = () => {
    const e: Partial<FormState> = {};
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
      toast.error("Please fill in all required fields");
      return;
    }
    if (paymentMethod === "phonepe" && !phonepePaid) {
      toast.error("Please confirm you have completed the UPI payment");
      return;
    }
    if (!actor) {
      toast.error("Connection not ready. Please try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const cartItems: CartItemInput[] = items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        size: item.size,
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(Math.round(item.price * 100)),
      }));

      const pm: PaymentMethod =
        paymentMethod === "phonepe"
          ? ("phonepe" as PaymentMethod)
          : ("cod" as PaymentMethod);

      const fullAddress = `${form.address}, ${form.city}, ${form.state}`;

      const result = await actor.placeFullOrder({
        customerName: form.name,
        customerPhone: form.phone,
        shippingAddress: fullAddress,
        pincode: form.pincode,
        orderNotes: form.notes,
        cartItems,
        paymentMethod: pm,
        totalInCents: BigInt(Math.round(total * 100)),
      });

      if (result.__kind__ === "ok") {
        clearCart();
        navigate({
          to: "/payment-success",
          search: {
            orderId: result.ok.orderId.toString(),
            displayOrderId: result.ok.displayOrderId,
            paymentMethod,
            total: total.toString(),
          },
        });
      } else {
        toast.error(result.err || "Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div
          className="container mx-auto px-4 py-20 text-center"
          data-ocid="checkout.empty_state"
        >
          <ShoppingBag className="w-16 h-16 text-muted-foreground/40 mx-auto mb-6" />
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Nothing to checkout
          </h1>
          <Link
            to="/shop"
            search={{ category: undefined, brand: undefined, q: undefined }}
          >
            <Button>Shop Now</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="min-h-screen bg-[#050508] px-4 py-10"
        data-ocid="checkout.page"
      >
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="text-xs font-semibold tracking-[0.25em] uppercase bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent mb-2">
              Secure Checkout
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-black text-white">
              Complete Your Order
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* Shipping Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 space-y-5"
                data-ocid="checkout.shipping_form"
              >
                <h2 className="font-display font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-red-400" />
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs text-gray-400">
                      Full Name *
                    </Label>
                    <input
                      id="name"
                      data-ocid="checkout.shipping_name_input"
                      placeholder="Rahul Sharma"
                      value={form.name}
                      onChange={(e) => handleField("name", e.target.value)}
                      className={inputClass}
                    />
                    {errors.name && (
                      <p
                        className="text-xs text-red-400"
                        data-ocid="checkout.shipping_name.field_error"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs text-gray-400">
                      Phone Number *
                    </Label>
                    <input
                      id="phone"
                      data-ocid="checkout.shipping_phone_input"
                      placeholder="9XXXXXXXXX"
                      value={form.phone}
                      onChange={(e) => handleField("phone", e.target.value)}
                      className={inputClass}
                    />
                    {errors.phone && (
                      <p
                        className="text-xs text-red-400"
                        data-ocid="checkout.shipping_phone.field_error"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs text-gray-400">
                    Email Address{" "}
                    <span className="text-gray-600">(optional)</span>
                  </Label>
                  <input
                    id="email"
                    data-ocid="checkout.shipping_email_input"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => handleField("email", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-xs text-gray-400">
                    Shipping Address *
                  </Label>
                  <textarea
                    id="address"
                    data-ocid="checkout.shipping_address_input"
                    placeholder="House/Flat No., Street, Area, Landmark"
                    value={form.address}
                    onChange={(e) => handleField("address", e.target.value)}
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                  {errors.address && (
                    <p
                      className="text-xs text-red-400"
                      data-ocid="checkout.shipping_address.field_error"
                    >
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="city" className="text-xs text-gray-400">
                      City *
                    </Label>
                    <input
                      id="city"
                      data-ocid="checkout.shipping_city_input"
                      placeholder="Mumbai"
                      value={form.city}
                      onChange={(e) => handleField("city", e.target.value)}
                      className={inputClass}
                    />
                    {errors.city && (
                      <p
                        className="text-xs text-red-400"
                        data-ocid="checkout.shipping_city.field_error"
                      >
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="state" className="text-xs text-gray-400">
                      State *
                    </Label>
                    <input
                      id="state"
                      data-ocid="checkout.shipping_state_input"
                      placeholder="Maharashtra"
                      value={form.state}
                      onChange={(e) => handleField("state", e.target.value)}
                      className={inputClass}
                    />
                    {errors.state && (
                      <p
                        className="text-xs text-red-400"
                        data-ocid="checkout.shipping_state.field_error"
                      >
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="pincode" className="text-xs text-gray-400">
                      Pincode *
                    </Label>
                    <input
                      id="pincode"
                      data-ocid="checkout.shipping_pincode_input"
                      placeholder="400001"
                      maxLength={6}
                      value={form.pincode}
                      onChange={(e) =>
                        handleField(
                          "pincode",
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                      className={inputClass}
                    />
                    {errors.pincode && (
                      <p
                        className="text-xs text-red-400"
                        data-ocid="checkout.shipping_pincode.field_error"
                      >
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="notes" className="text-xs text-gray-400">
                    Order Notes{" "}
                    <span className="text-gray-600">(optional)</span>
                  </Label>
                  <textarea
                    id="notes"
                    data-ocid="checkout.order_notes_input"
                    placeholder="Any special instructions for delivery..."
                    value={form.notes}
                    onChange={(e) => handleField("notes", e.target.value)}
                    rows={2}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card p-6 space-y-4"
                data-ocid="checkout.payment_section"
              >
                <h2 className="font-display font-bold text-white">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {/* COD */}
                  <button
                    type="button"
                    data-ocid="checkout.payment_cod_tab"
                    onClick={() => setPaymentMethod("cod")}
                    className={`w-full rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                      paymentMethod === "cod"
                        ? "border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                        : "border-gray-700 bg-gray-900/50 hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          paymentMethod === "cod"
                            ? "bg-red-500/20"
                            : "bg-gray-800"
                        }`}
                      >
                        <Banknote
                          className={`w-5 h-5 ${
                            paymentMethod === "cod"
                              ? "text-red-400"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white text-sm">
                            Cash on Delivery
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Free
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Pay when your order arrives
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          paymentMethod === "cod"
                            ? "border-red-500 bg-red-500"
                            : "border-gray-600"
                        }`}
                      >
                        {paymentMethod === "cod" && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* UPI Payment */}
                  <button
                    type="button"
                    data-ocid="checkout.payment_phonepe_tab"
                    onClick={() => setPaymentMethod("phonepe")}
                    className={`w-full rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                      paymentMethod === "phonepe"
                        ? "border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                        : "border-gray-700 bg-gray-900/50 hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          paymentMethod === "phonepe"
                            ? "bg-red-500/20"
                            : "bg-gray-800"
                        }`}
                      >
                        <Smartphone
                          className={`w-5 h-5 ${
                            paymentMethod === "phonepe"
                              ? "text-red-400"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white text-sm">
                            UPI Payment
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                            Instant
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Pay instantly via UPI
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          paymentMethod === "phonepe"
                            ? "border-red-500 bg-red-500"
                            : "border-gray-600"
                        }`}
                      >
                        {paymentMethod === "phonepe" && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </button>
                </div>

                {/* UPI Payment Panel */}
                <AnimatePresence>
                  {paymentMethod === "phonepe" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <UpiPayment
                        total={total}
                        orderId="PENDING"
                        onPaymentConfirmed={() => setPhonepePaid(true)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* RIGHT COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-4 lg:sticky lg:top-24"
            >
              {/* Order Summary */}
              <div
                className="glass-card p-6"
                data-ocid="checkout.order_summary"
              >
                <h2 className="font-display font-bold text-white mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5">
                  {items.map((item, i) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-3 items-center py-2 border-b border-gray-800 last:border-0"
                      data-ocid={`checkout.item.${i + 1}`}
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                        <img
                          src={item.imagePath}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Size {item.size} &times; {item.quantity}
                        </div>
                      </div>
                      <div className="text-sm font-bold text-white shrink-0">
                        {fmt(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white">{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>GST (18%)</span>
                    <span className="text-white">{fmt(gst)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-emerald-400 font-medium">Free</span>
                  </div>
                  <div className="h-px bg-gray-700 my-1" />
                  <div className="flex justify-between font-bold text-base">
                    <span className="text-white">Total</span>
                    <span className="bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent">
                      {fmt(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Place Order CTA */}
              <div className="glass-card p-4">
                <button
                  type="button"
                  data-ocid="checkout.place_order_button"
                  onClick={handlePlaceOrder}
                  disabled={
                    isSubmitting ||
                    (paymentMethod === "phonepe" && !phonepePaid)
                  }
                  className="w-full relative overflow-hidden rounded-xl py-4 px-6 font-display font-bold text-white text-base tracking-wide bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Placing Order…
                    </span>
                  ) : paymentMethod === "cod" ? (
                    <span className="flex items-center justify-center gap-2">
                      <Banknote className="w-5 h-5" />
                      Place Order (COD)
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Confirm UPI Payment
                    </span>
                  )}
                </button>

                <p className="text-center text-xs text-gray-600 mt-3 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Your order details are secure and encrypted
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
