import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateCheckoutSession,
  useIsStripeConfigured,
  useSetStripeConfiguration,
} from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CreditCard,
  Loader2,
  Lock,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCartStore();
  const total = totalPrice();
  const navigate = useNavigate();
  const { isAuthenticated } = useInternetIdentity();
  const { data: stripeConfigured, isLoading: checkingStripe } =
    useIsStripeConfigured();
  const createCheckout = useCreateCheckoutSession();
  const setStripeConfig = useSetStripeConfiguration();

  const [stripeKey, setStripeKey] = useState("");
  const [countries, setCountries] = useState("US,GB,CA,AU,IN");
  const [showStripeSetup, setShowStripeSetup] = useState(false);

  const [shippingForm, setShippingForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>(
    {},
  );

  const validateShipping = () => {
    const errors: Record<string, string> = {};
    if (!shippingForm.name.trim()) errors.name = "Name is required";
    if (!shippingForm.email.trim()) errors.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(shippingForm.email))
      errors.email = "Invalid email";
    if (!shippingForm.address.trim()) errors.address = "Address is required";
    if (!shippingForm.city.trim()) errors.city = "City is required";
    if (!shippingForm.state.trim()) errors.state = "State is required";
    if (!shippingForm.zip.trim()) errors.zip = "ZIP code is required";
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (field: string, value: string) => {
    setShippingForm((prev) => ({ ...prev, [field]: value }));
    if (shippingErrors[field]) {
      setShippingErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  };

  const handleStripeSetup = async () => {
    if (!stripeKey.trim()) {
      toast.error("Enter your Stripe secret key");
      return;
    }
    try {
      await setStripeConfig.mutateAsync({
        secretKey: stripeKey.trim(),
        allowedCountries: countries
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
      });
      toast.success("Stripe configured successfully!");
      setShowStripeSetup(false);
    } catch {
      toast.error("Failed to configure Stripe");
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
      return;
    }
    if (items.length === 0) {
      navigate({ to: "/cart" });
      return;
    }
    if (!validateShipping()) {
      toast.error("Please fill in all shipping details");
      return;
    }

    const shoppingItems = items.map((item) => ({
      productName: item.name,
      currency: "inr",
      quantity: BigInt(item.quantity),
      priceInCents: BigInt(Math.round(item.price * 100)),
      productDescription: `${item.brand} - Size ${item.size}`,
    }));

    try {
      const session = await createCheckout.mutateAsync(shoppingItems);
      if (!session?.url) throw new Error("Missing session url");
      clearCart();
      window.location.href = session.url;
    } catch (_err) {
      toast.error("Checkout failed. Please try again.");
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
      <div className="container mx-auto px-4 py-10" data-ocid="checkout.page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">
            Secure Checkout
          </div>
          <h1 className="section-heading mb-10">Complete Your Order</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-foreground mb-6">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              {items.map((item, i) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="glass-card p-3 flex gap-3 items-center"
                  data-ocid={`checkout.item.${i + 1}`}
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted/30 shrink-0">
                    <img
                      src={item.imagePath}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Size {item.size} &times; {item.quantity}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-foreground shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card p-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-accent">Free</span>
              </div>
              <div className="h-px bg-border/30" />
              <div className="flex justify-between font-bold text-foreground text-base">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </motion.div>

          {/* Payment */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Auth warning */}
            {!isAuthenticated && (
              <div
                className="flex items-start gap-3 p-4 rounded-lg border border-primary/30 bg-primary/5"
                data-ocid="checkout.auth_warning"
              >
                <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    Login Required
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    You need to login to complete your purchase.
                  </div>
                  <Link to="/login" className="mt-2 inline-block">
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground text-xs h-7"
                      data-ocid="checkout.login_redirect_button"
                    >
                      Login Now
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Stripe Setup (admin) */}
            {isAuthenticated && !checkingStripe && !stripeConfigured && (
              <div
                className="glass-card p-5"
                data-ocid="checkout.stripe_setup_panel"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-accent" />
                  <h3 className="font-display font-semibold text-foreground">
                    Configure Stripe Payments
                  </h3>
                </div>
                {showStripeSetup ? (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="stripe-key"
                        className="text-xs text-muted-foreground"
                      >
                        Stripe Secret Key
                      </Label>
                      <Input
                        id="stripe-key"
                        data-ocid="checkout.stripe_key_input"
                        type="password"
                        placeholder="sk_test_..."
                        value={stripeKey}
                        onChange={(e) => setStripeKey(e.target.value)}
                        className="bg-muted/30 border-border/40 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="stripe-countries"
                        className="text-xs text-muted-foreground"
                      >
                        Allowed Countries (comma-separated)
                      </Label>
                      <Input
                        id="stripe-countries"
                        data-ocid="checkout.stripe_countries_input"
                        placeholder="US,GB,IN"
                        value={countries}
                        onChange={(e) => setCountries(e.target.value)}
                        className="bg-muted/30 border-border/40 text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        data-ocid="checkout.stripe_save_button"
                        onClick={handleStripeSetup}
                        disabled={setStripeConfig.isPending}
                        className="bg-primary text-primary-foreground text-sm h-9"
                      >
                        {setStripeConfig.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Save"
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowStripeSetup(false)}
                        className="text-sm h-9 border-border/40"
                        data-ocid="checkout.stripe_cancel_button"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Admin: Configure Stripe to enable real payments.
                    </p>
                    <Button
                      type="button"
                      data-ocid="checkout.stripe_configure_button"
                      onClick={() => setShowStripeSetup(true)}
                      variant="outline"
                      className="border-accent/40 text-accent hover:bg-accent/10 text-sm"
                    >
                      Configure Stripe
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Shipping Form */}
            {isAuthenticated && (
              <div
                className="glass-card p-6 space-y-4"
                data-ocid="checkout.shipping_form"
              >
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4 text-accent" /> Shipping Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="ship-name"
                      className="text-xs text-muted-foreground"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="ship-name"
                      data-ocid="checkout.shipping_name_input"
                      placeholder="John Doe"
                      value={shippingForm.name}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                      className="bg-muted/30 border-border/40 text-sm"
                    />
                    {shippingErrors.name && (
                      <p
                        className="text-xs text-primary"
                        data-ocid="checkout.shipping_name.field_error"
                      >
                        {shippingErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="ship-email"
                      className="text-xs text-muted-foreground"
                    >
                      Email *
                    </Label>
                    <Input
                      id="ship-email"
                      data-ocid="checkout.shipping_email_input"
                      type="email"
                      placeholder="you@example.com"
                      value={shippingForm.email}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                      className="bg-muted/30 border-border/40 text-sm"
                    />
                    {shippingErrors.email && (
                      <p
                        className="text-xs text-primary"
                        data-ocid="checkout.shipping_email.field_error"
                      >
                        {shippingErrors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="ship-address"
                    className="text-xs text-muted-foreground"
                  >
                    Address *
                  </Label>
                  <Input
                    id="ship-address"
                    data-ocid="checkout.shipping_address_input"
                    placeholder="123 Main Street, Apt 4B"
                    value={shippingForm.address}
                    onChange={(e) =>
                      handleFieldChange("address", e.target.value)
                    }
                    className="bg-muted/30 border-border/40 text-sm"
                  />
                  {shippingErrors.address && (
                    <p
                      className="text-xs text-primary"
                      data-ocid="checkout.shipping_address.field_error"
                    >
                      {shippingErrors.address}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="ship-city"
                      className="text-xs text-muted-foreground"
                    >
                      City *
                    </Label>
                    <Input
                      id="ship-city"
                      data-ocid="checkout.shipping_city_input"
                      placeholder="Mumbai"
                      value={shippingForm.city}
                      onChange={(e) =>
                        handleFieldChange("city", e.target.value)
                      }
                      className="bg-muted/30 border-border/40 text-sm"
                    />
                    {shippingErrors.city && (
                      <p
                        className="text-xs text-primary"
                        data-ocid="checkout.shipping_city.field_error"
                      >
                        {shippingErrors.city}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="ship-state"
                      className="text-xs text-muted-foreground"
                    >
                      State *
                    </Label>
                    <Input
                      id="ship-state"
                      data-ocid="checkout.shipping_state_input"
                      placeholder="Maharashtra"
                      value={shippingForm.state}
                      onChange={(e) =>
                        handleFieldChange("state", e.target.value)
                      }
                      className="bg-muted/30 border-border/40 text-sm"
                    />
                    {shippingErrors.state && (
                      <p
                        className="text-xs text-primary"
                        data-ocid="checkout.shipping_state.field_error"
                      >
                        {shippingErrors.state}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="ship-zip"
                      className="text-xs text-muted-foreground"
                    >
                      ZIP Code *
                    </Label>
                    <Input
                      id="ship-zip"
                      data-ocid="checkout.shipping_zip_input"
                      placeholder="400001"
                      value={shippingForm.zip}
                      onChange={(e) => handleFieldChange("zip", e.target.value)}
                      className="bg-muted/30 border-border/40 text-sm"
                    />
                    {shippingErrors.zip && (
                      <p
                        className="text-xs text-primary"
                        data-ocid="checkout.shipping_zip.field_error"
                      >
                        {shippingErrors.zip}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Pay button */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">
                  Secured by Stripe. Your payment details are encrypted.
                </span>
              </div>
              <Button
                type="button"
                data-ocid="checkout.pay_button"
                onClick={handleCheckout}
                disabled={createCheckout.isPending || !isAuthenticated}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent h-12 font-semibold text-base"
              >
                {createCheckout.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />{" "}
                    Processing…
                  </>
                ) : (
                  <>Pay ₹{total.toLocaleString("en-IN")} with Stripe</>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
