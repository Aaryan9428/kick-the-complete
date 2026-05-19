import { b as useParams, r as reactExports, j as jsxRuntimeExports, L as Link, m as motion, u as ue } from "./index-EDhnjgOJ.js";
import { c as createLucideIcon, u as useCartStore, b as useUIStore, L as Layout, B as Button, d as ShoppingCart, H as Heart } from "./button-B4gG1HGM.js";
import { u as useWishlistStore, O as OrderModal } from "./wishlistStore-eSQ1kDu6.js";
import { b as getProductById, P as PRODUCTS, B as Badge } from "./products-CVM2En7h.js";
import { P as Package } from "./package-C-aPwEYg.js";
import "./backend-C4U0oltt.js";
import "./loader-circle-Dch6iWqb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const REVIEWS = [
  {
    name: "Arjun M.",
    rating: 5,
    text: "Absolutely premium quality. The craftsmanship is unreal.",
    date: "2 days ago"
  },
  {
    name: "Priya S.",
    rating: 5,
    text: "Ordered my second pair. True to size and incredibly comfortable.",
    date: "1 week ago"
  },
  {
    name: "Rahul K.",
    rating: 4,
    text: "Looks even better in person. Delivery was fast.",
    date: "2 weeks ago"
  }
];
function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const product = getProductById(id);
  const [selectedSize, setSelectedSize] = reactExports.useState(null);
  const [selectedImage, setSelectedImage] = reactExports.useState(0);
  const [orderOpen, setOrderOpen] = reactExports.useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const { toggle, has } = useWishlistStore();
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-20 text-center",
        "data-ocid": "product.not_found_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "👟" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground mb-4", children: "Product Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/shop",
              search: { category: void 0, brand: void 0, q: void 0 },
              "data-ocid": "product.back_to_shop_link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Back to Shop" })
            }
          )
        ]
      }
    ) });
  }
  const handleAddToCart = () => {
    if (!selectedSize) {
      ue.error("Please select a size first");
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.priceInCents / 100,
      imagePath: product.imagePaths[0],
      size: selectedSize,
      quantity: 1
    });
    openCart();
    ue.success(`${product.name} added to cart!`);
  };
  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category)
  ).slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", "data-ocid": "product.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/shop",
        search: { category: void 0, brand: void 0, q: void 0 },
        "data-ocid": "product.breadcrumb_link",
        className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-8 group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
          "Back to Shop"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card overflow-hidden aspect-square mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: product.imagePaths[selectedImage] ?? product.imagePaths[0],
                alt: product.name,
                className: "w-full h-full object-cover",
                loading: "lazy",
                onError: (e) => {
                  e.target.src = "/assets/images/placeholder.svg";
                }
              }
            ) }),
            product.imagePaths.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: product.imagePaths.map((path, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `product.thumbnail.${i + 1}`,
                onClick: () => setSelectedImage(i),
                className: `w-16 h-16 rounded-lg overflow-hidden border-2 transition-smooth ${selectedImage === i ? "border-primary" : "border-border/30 hover:border-border"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: path,
                    alt: "",
                    className: "w-full h-full object-cover",
                    loading: "lazy",
                    onError: (e) => {
                      e.target.src = "/assets/images/placeholder.svg";
                    }
                  }
                )
              },
              path
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          className: "flex flex-col",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-muted-foreground border-border/50 text-xs tracking-widest uppercase",
                  children: product.brand
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-muted-foreground border-border/50 text-xs",
                  children: product.category
                }
              ),
              product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground text-xs", children: product.badge }),
              product.isLimited && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "border-accent/60 text-accent bg-accent/10 text-xs",
                  children: "Limited"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-display font-black tracking-tight text-foreground mb-3", children: product.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: ["s1", "s2", "s3", "s4", "s5"].map((sid) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: "w-4 h-4 fill-primary text-primary"
                },
                sid
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                "(",
                REVIEWS.length,
                " reviews)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-4xl font-display font-black text-foreground mb-6", children: [
              "₹",
              (product.priceInCents / 100).toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-8", children: product.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Select Size" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "UK Sizes" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-wrap gap-2",
                  "data-ocid": "product.size_selector",
                  children: product.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `product.size_button.${size}`,
                      onClick: () => setSelectedSize(size),
                      className: `w-11 h-11 rounded-lg text-sm font-semibold transition-smooth border ${selectedSize === size ? "bg-primary text-primary-foreground border-primary shadow-glow-accent" : "bg-card/60 text-foreground border-border/40 hover:border-border"}`,
                      children: size
                    },
                    size
                  ))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-8 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: product.stock <= 5 ? "text-primary font-medium" : "text-muted-foreground",
                  children: product.stock <= 5 ? `Only ${product.stock} pairs left!` : `${product.stock} in stock`
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: handleAddToCart,
                  "data-ocid": "product.add_to_cart_button",
                  size: "lg",
                  className: "flex-1 bg-card/60 hover:bg-card border-border/40 h-12 font-semibold",
                  variant: "outline",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 mr-2" }),
                    "Add to Cart"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "product.wishlist_button",
                  onClick: () => toggle(product.id),
                  "aria-label": has(product.id) ? "Remove from wishlist" : "Add to wishlist",
                  className: `w-12 h-12 rounded-lg border transition-smooth flex items-center justify-center ${has(product.id) ? "bg-primary/10 border-primary/40 text-primary" : "bg-card/60 border-border/40 text-muted-foreground hover:border-border hover:text-foreground"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Heart,
                    {
                      className: `w-5 h-5 ${has(product.id) ? "fill-primary" : ""}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "product.order_now_button",
                onClick: () => setOrderOpen(true),
                className: "w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm tracking-wide transition-colors shadow-glow-accent flex items-center justify-center gap-2 mt-3",
                children: "Order Now"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "lg",
                "data-ocid": "product.checkout_link",
                className: "w-full border-border/40 h-12",
                children: "View Cart & Checkout"
              }
            ) })
          ]
        }
      )
    ] }),
    orderOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrderModal,
      {
        isOpen: orderOpen,
        onClose: () => setOrderOpen(false),
        productName: product.name,
        productId: product.id
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-20", "data-ocid": "product.reviews_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-8", children: "Customer Reviews" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: REVIEWS.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.1 },
          className: "glass-card p-5",
          "data-ocid": `product.review_item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: review.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: review.date })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex mb-3", children: [...Array(review.rating)].map((_, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: "w-3.5 h-3.5 fill-primary text-primary"
              },
              `${review.name}-star-${j}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: review.text })
          ]
        },
        review.name
      )) })
    ] }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-20", "data-ocid": "product.related_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-8", children: "You May Also Like" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: related.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/product/$id",
          params: { id: p.id },
          "data-ocid": `product.related_item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group glass-card overflow-hidden hover:border-border/40 transition-smooth", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: p.imagePaths[0],
                alt: p.name,
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                loading: "lazy"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold tracking-widest uppercase text-muted-foreground", children: p.brand }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground truncate mt-0.5", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold text-foreground mt-1", children: [
                "₹",
                (p.priceInCents / 100).toLocaleString("en-IN")
              ] })
            ] })
          ] })
        },
        p.id
      )) })
    ] })
  ] }) });
}
export {
  ProductDetail as default
};
