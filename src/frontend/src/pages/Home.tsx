import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRODUCTS, getFeaturedProducts } from "@/data/products";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Trophy, Zap } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const STATS = [
  { value: "100+", label: "Premium Models" },
  { value: "1000+", label: "Happy Customers" },
  { value: "50+", label: "Limited Editions" },
  { value: "100%", label: "Authentic" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Same-day dispatch on all orders placed before 3pm.",
  },
  {
    icon: Shield,
    title: "Verified Authentic",
    description: "Every pair authenticated by our expert team.",
  },
  {
    icon: Trophy,
    title: "Elite Selection",
    description:
      "Only the finest premium sneakers and streetwear footwear make our cut.",
  },
];

const BRAND_PILLS = [
  { name: "Trending Shoes", filter: "All" },
  { name: "Premium Collection", filter: "Premium" },
  { name: "Sports Footwear", filter: "All" },
  { name: "Limited Edition", filter: "Limited Edition" },
  { name: "Luxury Streetwear", filter: "All" },
  { name: "Best Sellers", filter: "New Arrivals" },
];

const GALLERY_IMAGES = [
  {
    src: "/assets/snapchat-1256927249-019e0725-6e21-72b9-a431-062d40394985.jpg",
    alt: "Store interior",
  },
  {
    src: "/assets/snapchat-1165606418-019e0725-6e2f-710c-bafd-aa967cd9dae9.jpg",
    alt: "Store collection",
  },
  {
    src: "/assets/snapchat-844653338-019e0725-6e15-71d8-a64e-11e5a3c8d63b.jpg",
    alt: "Premium sneaker display",
  },
  {
    src: "/assets/snapchat-1096384696-019e0725-6e1b-7438-a749-d357bd28d3c2.jpg",
    alt: "Exclusive drops",
  },
  {
    src: "/assets/snapchat-1449134242-019e0725-6e30-70fc-9ffc-d8f9c52e3eb8.jpg",
    alt: "Limited collection",
  },
];

export default function Home() {
  const featured = getFeaturedProducts();
  const latest = PRODUCTS.slice(0, 6);

  return (
    <Layout noPadding>
      {/* Hero */}
      <section
        data-ocid="home.hero_section"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden overflow-x-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/assets/snapchat-1592945222-019e0725-6adb-703a-b1fc-8e3c54af6bc4.jpg"
            alt=""
            className="w-full h-full object-cover opacity-25"
            aria-hidden="true"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.09 0 0 / 0.65) 0%, oklch(0.09 0 0 / 0.3) 40%, oklch(0.09 0 0 / 0.85) 80%, oklch(0.09 0 0) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 10%, oklch(0.72 0.22 264 / 0.15) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 40% 30% at 80% 70%, oklch(0.62 0.25 22 / 0.10) 0%, transparent 50%)",
            }}
          />
        </div>

        {(["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"] as const).map(
          (id, i) => (
            <motion.div
              key={id}
              className="absolute w-1 h-1 rounded-full bg-accent/40"
              style={{
                left: `${12 + i * 10}%`,
                top: `${18 + (i % 4) * 20}%`,
              }}
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.35,
                ease: "easeInOut",
              }}
            />
          ),
        )}

        <div className="relative z-10 container mx-auto px-4 text-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform" }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-accent/40 text-accent bg-accent/10 text-xs tracking-widest uppercase"
            >
              New Collection 2026
            </Badge>

            <h1 className="gradient-text text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] font-display font-black tracking-tighter leading-none mb-2">
              KICKS
            </h1>
            <p className="text-lg md:text-2xl font-light tracking-[0.3em] text-gray-300 uppercase mt-4 mb-10">
              THE COMPLETE SNEAKER STORE
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/shop"
                search={{ category: undefined, brand: undefined, q: undefined }}
                data-ocid="home.shop_cta_button"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 font-bold text-base group hover:shadow-glow-purple transition-smooth"
                  style={{ boxShadow: "0 0 30px oklch(0.62 0.25 22 / 0.4)" }}
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link
                to="/shop"
                search={{
                  category: "Limited Edition",
                  brand: undefined,
                  q: undefined,
                }}
                data-ocid="home.limited_drops_button"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-accent/40 text-accent hover:bg-accent/10 px-10 font-semibold text-base"
                >
                  Explore Drops
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-muted-foreground/50" />
          <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </section>

      {/* Stats */}
      <section
        data-ocid="home.stats_section"
        className="bg-card/60 border-y border-border/20 py-10"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className="text-3xl md:text-4xl font-display font-black"
                  style={{
                    color:
                      i % 2 === 0 ? "oklch(0.98 0 0)" : "oklch(0.72 0.22 264)",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground tracking-widest uppercase mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        data-ocid="home.featured_section"
        className="py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="flex items-end justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">
                Handpicked
              </div>
              <h2 className="section-heading gradient-text">Featured Drops</h2>
            </div>
            <Link
              to="/shop"
              search={{ category: undefined, brand: undefined, q: undefined }}
              data-ocid="home.view_all_link"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`home.featured_item.${i + 1}`}
              >
                <Link to="/product/$id" params={{ id: product.id }}>
                  <div className="group glass-card overflow-hidden hover:border-border/40 transition-smooth hover:shadow-glow-pink">
                    <div className="relative aspect-square overflow-hidden bg-muted/30">
                      <img
                        src={product.imagePaths[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {product.badge && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary text-primary-foreground text-[10px] font-semibold tracking-wide">
                            {product.badge}
                          </Badge>
                        </div>
                      )}
                      {product.isLimited && (
                        <div className="absolute top-3 right-3">
                          <Badge
                            variant="outline"
                            className="border-accent/60 text-accent bg-accent/10 text-[10px]"
                          >
                            Limited
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                        {product.brand}
                      </div>
                      <h3 className="font-display font-semibold text-foreground truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-foreground">
                          ₹
                          {(product.priceInCents / 100).toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {product.stock <= 5
                            ? `Only ${product.stock} left`
                            : "In Stock"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section data-ocid="home.brands_section" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-3">
              Our Collections
            </div>
            <h2 className="section-heading mb-10">Shop By Collection</h2>
          </motion.div>

          {/* Brand pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {BRAND_PILLS.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  to="/shop"
                  search={{
                    brand: brand.filter,
                    category: undefined,
                    q: undefined,
                  }}
                  data-ocid={`home.brand_pill.${i + 1}`}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-border/30 hover:border-accent/40 transition-smooth hover:bg-accent/5"
                >
                  <span className="text-sm font-bold text-foreground group-hover:text-accent transition-smooth tracking-wide">
                    {brand.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Collection cards */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {(["Premium", "Limited Edition"] as const).map((collection, i) => (
              <motion.div
                key={collection}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link
                  to="/shop"
                  search={{
                    brand: collection,
                    category: undefined,
                    q: undefined,
                  }}
                  data-ocid={`home.brand_link.${i + 1}`}
                  className="group block glass-card px-12 py-10 hover:border-border/40 transition-smooth hover:shadow-glow-accent"
                >
                  <div className="text-4xl font-display font-black tracking-tight text-foreground group-hover:text-primary transition-smooth">
                    {collection.toUpperCase()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 tracking-widest uppercase">
                    Shop {collection} &rarr;
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Gallery */}
      <section data-ocid="home.gallery_section" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-3">
              In-Store Experience
            </div>
            <h2 className="section-heading">Visit The Store</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={i === 0 ? "col-span-2 md:col-span-1" : ""}
              >
                <div className="group overflow-hidden rounded-xl border border-border/20 hover:border-accent/30 transition-smooth aspect-square">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section
        data-ocid="home.new_arrivals_section"
        className="py-20 bg-muted/20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">
              Fresh Stock
            </div>
            <h2 className="section-heading">Latest Arrivals</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {latest.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                data-ocid={`home.latest_item.${i + 1}`}
              >
                <Link to="/product/$id" params={{ id: product.id }}>
                  <div className="group glass-card overflow-hidden hover:border-border/40 transition-smooth">
                    <div className="aspect-square overflow-hidden bg-muted/30">
                      <img
                        src={product.imagePaths[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2">
                      <div className="text-[9px] font-semibold tracking-widest uppercase text-muted-foreground">
                        {product.brand}
                      </div>
                      <div className="text-xs font-semibold text-foreground truncate mt-0.5">
                        {product.name}
                      </div>
                      <div className="text-xs font-bold text-primary mt-1">
                        ₹{(product.priceInCents / 100).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/shop"
              search={{ category: undefined, brand: undefined, q: undefined }}
              data-ocid="home.explore_all_button"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-border/50 hover:bg-card"
              >
                Explore Full Collection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        data-ocid="home.newsletter_section"
        className="py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-10 md:p-14 relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 0%, oklch(0.72 0.22 264 / 0.08) 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <div className="text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-3">
                  Stay Updated
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-3">
                  First To Know.
                </h2>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                  Get early access to limited drops, exclusive deals, and new
                  arrivals — straight to your inbox.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("You're on the list! 🔥");
                    (e.target as HTMLFormElement).reset();
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    required
                    data-ocid="home.newsletter_input"
                    placeholder="Enter your email address"
                    className="flex-1 h-12 px-4 rounded-lg bg-muted/30 border border-border/40 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-smooth"
                  />
                  <Button
                    type="submit"
                    data-ocid="home.newsletter_submit_button"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 font-semibold shrink-0"
                    style={{
                      boxShadow: "0 0 20px oklch(0.62 0.25 22 / 0.3)",
                    }}
                  >
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground/60 mt-4">
                  No spam. Unsubscribe any time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section
        data-ocid="home.features_section"
        className="py-20 bg-card/30 border-t border-border/20"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
