import { Layout } from "@/components/Layout";
import { OrderModal } from "@/components/OrderModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRODUCTS, getProductById } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, Heart, Package, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const REVIEWS = [
  {
    name: "Arjun M.",
    rating: 5,
    text: "Absolutely premium quality. The craftsmanship is unreal.",
    date: "2 days ago",
  },
  {
    name: "Priya S.",
    rating: 5,
    text: "Ordered my second pair. True to size and incredibly comfortable.",
    date: "1 week ago",
  },
  {
    name: "Rahul K.",
    rating: 4,
    text: "Looks even better in person. Delivery was fast.",
    date: "2 weeks ago",
  },
];

export default function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const product = getProductById(id);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [orderOpen, setOrderOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, has } = useWishlistStore();

  if (!product) {
    return (
      <Layout>
        <div
          className="container mx-auto px-4 py-20 text-center"
          data-ocid="product.not_found_state"
        >
          <div className="text-6xl mb-4">👟</div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <Link
            to="/shop"
            search={{ category: undefined, brand: undefined, q: undefined }}
            data-ocid="product.back_to_shop_link"
          >
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first");
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.priceInCents / 100,
      imagePath: product.imagePaths[0],
      size: selectedSize,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const related = PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.brand === product.brand || p.category === product.category),
  ).slice(0, 4);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10" data-ocid="product.page">
        {/* Breadcrumb */}
        <Link
          to="/shop"
          search={{ category: undefined, brand: undefined, q: undefined }}
          data-ocid="product.breadcrumb_link"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-card overflow-hidden aspect-square mb-3">
              <img
                src={product.imagePaths[selectedImage] ?? product.imagePaths[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.imagePaths.length > 1 && (
              <div className="flex gap-2">
                {product.imagePaths.map((path, i) => (
                  <button
                    key={path}
                    type="button"
                    data-ocid={`product.thumbnail.${i + 1}`}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-smooth ${
                      selectedImage === i
                        ? "border-primary"
                        : "border-border/30 hover:border-border"
                    }`}
                  >
                    <img
                      src={path}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge
                variant="outline"
                className="text-muted-foreground border-border/50 text-xs tracking-widest uppercase"
              >
                {product.brand}
              </Badge>
              <Badge
                variant="outline"
                className="text-muted-foreground border-border/50 text-xs"
              >
                {product.category}
              </Badge>
              {product.badge && (
                <Badge className="bg-primary text-primary-foreground text-xs">
                  {product.badge}
                </Badge>
              )}
              {product.isLimited && (
                <Badge
                  variant="outline"
                  className="border-accent/60 text-accent bg-accent/10 text-xs"
                >
                  Limited
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight text-foreground mb-3">
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {(["s1", "s2", "s3", "s4", "s5"] as const).map((sid) => (
                  <Star
                    key={sid}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({REVIEWS.length} reviews)
              </span>
            </div>

            <div className="text-4xl font-display font-black text-foreground mb-6">
              ₹{(product.priceInCents / 100).toLocaleString("en-IN")}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-foreground">
                  Select Size
                </span>
                <span className="text-xs text-muted-foreground">UK Sizes</span>
              </div>
              <div
                className="flex flex-wrap gap-2"
                data-ocid="product.size_selector"
              >
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    data-ocid={`product.size_button.${size}`}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 rounded-lg text-sm font-semibold transition-smooth border ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary shadow-glow-accent"
                        : "bg-card/60 text-foreground border-border/40 hover:border-border"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-8 text-sm">
              <Package className="w-4 h-4 text-muted-foreground" />
              <span
                className={
                  product.stock <= 5
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }
              >
                {product.stock <= 5
                  ? `Only ${product.stock} pairs left!`
                  : `${product.stock} in stock`}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                data-ocid="product.add_to_cart_button"
                size="lg"
                className="flex-1 bg-card/60 hover:bg-card border-border/40 h-12 font-semibold"
                variant="outline"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <button
                type="button"
                data-ocid="product.wishlist_button"
                onClick={() => toggle(product.id)}
                aria-label={
                  has(product.id) ? "Remove from wishlist" : "Add to wishlist"
                }
                className={`w-12 h-12 rounded-lg border transition-smooth flex items-center justify-center ${
                  has(product.id)
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "bg-card/60 border-border/40 text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${has(product.id) ? "fill-primary" : ""}`}
                />
              </button>
            </div>

            {/* Order Now */}
            <button
              type="button"
              data-ocid="product.order_now_button"
              onClick={() => setOrderOpen(true)}
              className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm tracking-wide transition-colors shadow-glow-accent flex items-center justify-center gap-2 mt-3"
            >
              Order Now
            </button>

            <Link to="/cart" className="mt-1">
              <Button
                variant="outline"
                size="lg"
                data-ocid="product.checkout_link"
                className="w-full border-border/40 h-12"
              >
                View Cart & Checkout
              </Button>
            </Link>
          </motion.div>
        </div>

        {orderOpen && (
          <OrderModal
            isOpen={orderOpen}
            onClose={() => setOrderOpen(false)}
            productName={product.name}
            productId={product.id}
          />
        )}

        {/* Reviews */}
        <section className="mt-20" data-ocid="product.reviews_section">
          <h2 className="text-2xl font-display font-bold text-foreground mb-8">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card p-5"
                data-ocid={`product.review_item.${i + 1}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground text-sm">
                    {review.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {review.date}
                  </span>
                </div>
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star
                      key={`${review.name}-star-${j}`}
                      className="w-3.5 h-3.5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20" data-ocid="product.related_section">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <Link
                  key={p.id}
                  to="/product/$id"
                  params={{ id: p.id }}
                  data-ocid={`product.related_item.${i + 1}`}
                >
                  <div className="group glass-card overflow-hidden hover:border-border/40 transition-smooth">
                    <div className="aspect-square overflow-hidden bg-muted/30">
                      <img
                        src={p.imagePaths[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                        {p.brand}
                      </div>
                      <div className="text-sm font-semibold text-foreground truncate mt-0.5">
                        {p.name}
                      </div>
                      <div className="text-sm font-bold text-foreground mt-1">
                        ₹{(p.priceInCents / 100).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
