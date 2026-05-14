import { Layout } from "@/components/Layout";
import { OrderModal } from "@/components/OrderModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BRANDS, CATEGORIES, PRODUCTS } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useSearch } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Heart, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function Shop() {
  const search = useSearch({ from: "/shop" });
  const [query, setQuery] = useState(search.q ?? "");
  const [activeCategory, setActiveCategory] = useState(
    search.category ?? "All",
  );
  const [activeBrand, setActiveBrand] = useState(search.brand ?? "All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">(
    "featured",
  );

  const { toggle, has } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const [orderProduct, setOrderProduct] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory !== "All")
      list = list.filter((p) => p.category === activeCategory);
    if (activeBrand !== "All")
      list = list.filter((p) => p.brand === activeBrand);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
      );
    }
    if (sortBy === "price-asc")
      list = [...list].sort((a, b) => a.priceInCents - b.priceInCents);
    else if (sortBy === "price-desc")
      list = [...list].sort((a, b) => b.priceInCents - a.priceInCents);
    else
      list = [...list].sort(
        (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0),
      );
    return list;
  }, [activeCategory, activeBrand, query, sortBy]);

  const handleQuickAdd = (product: (typeof PRODUCTS)[0]) => {
    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.priceInCents / 100,
      imagePath: product.imagePaths[0],
      size: product.sizes[Math.floor(product.sizes.length / 2)],
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10" data-ocid="shop.page">
        {/* Page header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">
            All Products
          </div>
          <h1 className="section-heading">Shop Collection</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Discover {PRODUCTS.length} premium pairs from our curated
            collection.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="shop.search_input"
              placeholder="Search sneakers…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 bg-card/60 border-border/40 focus:border-border"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <select
              data-ocid="shop.sort_select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-9 rounded-lg border border-border/40 bg-card/60 text-sm text-foreground px-3 focus:outline-none focus:border-border"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`shop.category_filter.${cat.toLowerCase().replace(/\s/g, "_")}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-smooth border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card/50 text-muted-foreground border-border/40 hover:border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            {BRANDS.map((brand) => (
              <button
                key={brand}
                type="button"
                data-ocid={`shop.brand_filter.${brand.toLowerCase()}`}
                onClick={() => setActiveBrand(brand)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-smooth border ${
                  activeBrand === brand
                    ? "bg-accent/20 text-accent border-accent/60"
                    : "bg-card/50 text-muted-foreground border-border/40 hover:border-border"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div
            data-ocid="shop.empty_state"
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="text-5xl mb-4">👟</div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">
              No results found
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Try adjusting your filters or search query.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
                setActiveBrand("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                data-ocid={`shop.product_item.${i + 1}`}
              >
                <div className="group glass-card overflow-hidden hover:border-border/40 transition-smooth hover:shadow-glow-blue relative">
                  {/* Wishlist */}
                  <button
                    type="button"
                    data-ocid={`shop.wishlist_button.${i + 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggle(product.id);
                    }}
                    aria-label={
                      has(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-smooth ${
                        has(product.id)
                          ? "text-primary fill-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>

                  <Link to="/product/$id" params={{ id: product.id }}>
                    <div className="aspect-square overflow-hidden bg-muted/30 relative">
                      <img
                        src={product.imagePaths[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {product.badge && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-primary text-primary-foreground text-[9px] py-0 font-semibold">
                            {product.badge}
                          </Badge>
                        </div>
                      )}
                      {product.isLimited && (
                        <div className="absolute bottom-2 left-2">
                          <Badge
                            variant="outline"
                            className="border-accent/60 text-accent bg-accent/10 text-[9px] py-0"
                          >
                            Limited
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                        {product.brand}
                      </div>
                      <h3 className="font-display font-semibold text-sm text-foreground truncate mt-0.5">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-foreground">
                          ₹
                          {(product.priceInCents / 100).toLocaleString("en-IN")}
                        </span>
                        {product.stock <= 5 && (
                          <span className="text-[10px] text-primary font-medium">
                            Only {product.stock} left
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Actions */}
                  <div className="px-3 pb-3 flex flex-col gap-1.5">
                    <button
                      type="button"
                      data-ocid={`shop.quick_add_button.${i + 1}`}
                      onClick={() => handleQuickAdd(product)}
                      className="w-full h-8 text-xs font-semibold bg-muted/40 hover:bg-primary hover:text-primary-foreground text-foreground rounded-md transition-smooth opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      Quick Add
                    </button>
                    <button
                      type="button"
                      data-ocid={`shop.order_now_button.${i + 1}`}
                      onClick={() =>
                        setOrderProduct({ id: product.id, name: product.name })
                      }
                      className="w-full h-8 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-smooth opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {orderProduct && (
        <OrderModal
          isOpen={!!orderProduct}
          onClose={() => setOrderProduct(null)}
          productName={orderProduct.name}
          productId={orderProduct.id}
        />
      )}
    </Layout>
  );
}
