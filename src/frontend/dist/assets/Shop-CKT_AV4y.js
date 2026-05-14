import { a as useSearch, r as reactExports, j as jsxRuntimeExports, m as motion, L as Link, u as ue } from "./index-CQiv2YrY.js";
import { c as createLucideIcon, u as useCartStore, L as Layout, S as Search, B as Button, H as Heart } from "./button-DfzMutqC.js";
import { u as useWishlistStore, O as OrderModal } from "./wishlistStore-j7epipU7.js";
import { P as PRODUCTS, C as CATEGORIES, a as BRANDS, B as Badge } from "./products-S1TnAfQC.js";
import { I as Input } from "./input-CcKVrE4h.js";
import "./backend-BHlQehYT.js";
import "./loader-circle-CxQ5ylIP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function Shop() {
  const search = useSearch({ from: "/shop" });
  const [query, setQuery] = reactExports.useState(search.q ?? "");
  const [activeCategory, setActiveCategory] = reactExports.useState(
    search.category ?? "All"
  );
  const [activeBrand, setActiveBrand] = reactExports.useState(search.brand ?? "All");
  const [sortBy, setSortBy] = reactExports.useState(
    "featured"
  );
  const { toggle, has } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const [orderProduct, setOrderProduct] = reactExports.useState(null);
  const filtered = reactExports.useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory !== "All")
      list = list.filter((p) => p.category === activeCategory);
    if (activeBrand !== "All")
      list = list.filter((p) => p.brand === activeBrand);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    if (sortBy === "price-asc")
      list = [...list].sort((a, b) => a.priceInCents - b.priceInCents);
    else if (sortBy === "price-desc")
      list = [...list].sort((a, b) => b.priceInCents - a.priceInCents);
    else
      list = [...list].sort(
        (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
      );
    return list;
  }, [activeCategory, activeBrand, query, sortBy]);
  const handleQuickAdd = (product) => {
    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.priceInCents / 100,
      imagePath: product.imagePaths[0],
      size: product.sizes[Math.floor(product.sizes.length / 2)],
      quantity: 1
    });
    ue.success(`${product.name} added to cart`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", "data-ocid": "shop.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "mb-10",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2", children: "All Products" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "section-heading", children: "Shop Collection" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-2 text-sm", children: [
              "Discover ",
              PRODUCTS.length,
              " premium pairs from our curated collection."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "shop.search_input",
              placeholder: "Search sneakers…",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              className: "pl-9 bg-card/60 border-border/40 focus:border-border"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              "data-ocid": "shop.sort_select",
              value: sortBy,
              onChange: (e) => setSortBy(e.target.value),
              className: "h-9 rounded-lg border border-border/40 bg-card/60 text-sm text-foreground px-3 focus:outline-none focus:border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "featured", children: "Featured First" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-asc", children: "Price: Low → High" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-desc", children: "Price: High → Low" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `shop.category_filter.${cat.toLowerCase().replace(/\s/g, "_")}`,
            onClick: () => setActiveCategory(cat),
            className: `px-3 py-1.5 rounded-full text-xs font-medium transition-smooth border ${activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card/50 text-muted-foreground border-border/40 hover:border-border"}`,
            children: cat
          },
          cat
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: BRANDS.map((brand) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `shop.brand_filter.${brand.toLowerCase()}`,
            onClick: () => setActiveBrand(brand),
            className: `px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-smooth border ${activeBrand === brand ? "bg-accent/20 text-accent border-accent/60" : "bg-card/50 text-muted-foreground border-border/40 hover:border-border"}`,
            children: brand
          },
          brand
        )) })
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "shop.empty_state",
          className: "flex flex-col items-center justify-center py-24 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "👟" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-semibold text-foreground mb-2", children: "No results found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Try adjusting your filters or search query." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => {
                  setQuery("");
                  setActiveCategory("All");
                  setActiveBrand("All");
                },
                children: "Clear Filters"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: Math.min(i * 0.05, 0.4) },
          "data-ocid": `shop.product_item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group glass-card overflow-hidden hover:border-border/40 transition-smooth hover:shadow-glow-blue relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `shop.wishlist_button.${i + 1}`,
                onClick: (e) => {
                  e.preventDefault();
                  toggle(product.id);
                },
                "aria-label": has(product.id) ? "Remove from wishlist" : "Add to wishlist",
                className: "absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Heart,
                  {
                    className: `w-3.5 h-3.5 transition-smooth ${has(product.id) ? "text-primary fill-primary" : "text-muted-foreground"}`
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$id", params: { id: product.id }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square overflow-hidden bg-muted/30 relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.imagePaths[0],
                    alt: product.name,
                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                    loading: "lazy"
                  }
                ),
                product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground text-[9px] py-0 font-semibold", children: product.badge }) }),
                product.isLimited && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "border-accent/60 text-accent bg-accent/10 text-[9px] py-0",
                    children: "Limited"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold tracking-widest uppercase text-muted-foreground", children: product.brand }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground truncate mt-0.5", children: product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-foreground", children: [
                    "₹",
                    (product.priceInCents / 100).toLocaleString("en-IN")
                  ] }),
                  product.stock <= 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-primary font-medium", children: [
                    "Only ",
                    product.stock,
                    " left"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-3 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `shop.quick_add_button.${i + 1}`,
                  onClick: () => handleQuickAdd(product),
                  className: "w-full h-8 text-xs font-semibold bg-muted/40 hover:bg-primary hover:text-primary-foreground text-foreground rounded-md transition-smooth opacity-100 sm:opacity-0 sm:group-hover:opacity-100",
                  children: "Quick Add"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `shop.order_now_button.${i + 1}`,
                  onClick: () => setOrderProduct({ id: product.id, name: product.name }),
                  className: "w-full h-8 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-smooth opacity-100 sm:opacity-0 sm:group-hover:opacity-100",
                  children: "Order Now"
                }
              )
            ] })
          ] })
        },
        product.id
      )) })
    ] }),
    orderProduct && /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrderModal,
      {
        isOpen: !!orderProduct,
        onClose: () => setOrderProduct(null),
        productName: orderProduct.name,
        productId: orderProduct.id
      }
    )
  ] });
}
export {
  Shop as default
};
