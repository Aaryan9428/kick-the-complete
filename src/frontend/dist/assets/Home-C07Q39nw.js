import { j as jsxRuntimeExports, m as motion, L as Link, u as ue } from "./index-BepgGYDm.js";
import { c as createLucideIcon, L as Layout, B as Button } from "./button-rcDW-ULO.js";
import { g as getFeaturedProducts, B as Badge, P as PRODUCTS } from "./products-U2Q5Zptf.js";
import { A as ArrowRight } from "./arrow-right-Dm1O90fu.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode$1);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const STATS = [
  { value: "100+", label: "Premium Models" },
  { value: "1000+", label: "Happy Customers" },
  { value: "50+", label: "Limited Editions" },
  { value: "100%", label: "Authentic" }
];
const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Same-day dispatch on all orders placed before 3pm."
  },
  {
    icon: Shield,
    title: "Verified Authentic",
    description: "Every pair authenticated by our expert team."
  },
  {
    icon: Trophy,
    title: "Elite Selection",
    description: "Only the finest premium sneakers and streetwear footwear make our cut."
  }
];
const BRAND_PILLS = [
  { name: "Trending Shoes", filter: "All" },
  { name: "Premium Collection", filter: "Premium" },
  { name: "Sports Footwear", filter: "All" },
  { name: "Limited Edition", filter: "Limited Edition" },
  { name: "Luxury Streetwear", filter: "All" },
  { name: "Best Sellers", filter: "New Arrivals" }
];
const GALLERY_IMAGES = [
  {
    src: "/assets/snapchat-1256927249-019e0725-6e21-72b9-a431-062d40394985.jpg",
    alt: "Store interior"
  },
  {
    src: "/assets/snapchat-1165606418-019e0725-6e2f-710c-bafd-aa967cd9dae9.jpg",
    alt: "Store collection"
  },
  {
    src: "/assets/snapchat-844653338-019e0725-6e15-71d8-a64e-11e5a3c8d63b.jpg",
    alt: "Premium sneaker display"
  },
  {
    src: "/assets/snapchat-1096384696-019e0725-6e1b-7438-a749-d357bd28d3c2.jpg",
    alt: "Exclusive drops"
  },
  {
    src: "/assets/snapchat-1449134242-019e0725-6e30-70fc-9ffc-d8f9c52e3eb8.jpg",
    alt: "Limited collection"
  }
];
function Home() {
  const featured = getFeaturedProducts();
  const latest = PRODUCTS.slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { noPadding: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "home.hero_section",
        className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden overflow-x-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/snapchat-1592945222-019e0725-6adb-703a-b1fc-8e3c54af6bc4.jpg",
                alt: "",
                className: "w-full h-full object-cover opacity-25",
                "aria-hidden": "true",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0",
                style: {
                  background: "linear-gradient(to bottom, oklch(0.09 0 0 / 0.65) 0%, oklch(0.09 0 0 / 0.3) 40%, oklch(0.09 0 0 / 0.85) 80%, oklch(0.09 0 0) 100%)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0",
                style: {
                  background: "radial-gradient(ellipse 60% 50% at 50% 10%, oklch(0.72 0.22 264 / 0.15) 0%, transparent 60%)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0",
                style: {
                  background: "radial-gradient(ellipse 40% 30% at 80% 70%, oklch(0.62 0.25 22 / 0.10) 0%, transparent 50%)"
                }
              }
            )
          ] }),
          ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"].map(
            (id, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute w-1 h-1 rounded-full bg-accent/40",
                style: {
                  left: `${12 + i * 10}%`,
                  top: `${18 + i % 4 * 20}%`
                },
                animate: { y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] },
                transition: {
                  duration: 3 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.35,
                  ease: "easeInOut"
                }
              },
              id
            )
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 container mx-auto px-4 text-center pt-24 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              style: { willChange: "transform" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "mb-6 border-accent/40 text-accent bg-accent/10 text-xs tracking-widest uppercase",
                    children: "New Collection 2026"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "gradient-text text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] font-display font-black tracking-tighter leading-none mb-2", children: "KICKS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-2xl font-light tracking-[0.3em] text-gray-300 uppercase mt-4 mb-10", children: "THE COMPLETE SNEAKER STORE" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/shop",
                      search: { category: void 0, brand: void 0, q: void 0 },
                      "data-ocid": "home.shop_cta_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "lg",
                          className: "bg-primary hover:bg-primary/90 text-primary-foreground px-10 font-bold text-base group hover:shadow-glow-purple transition-smooth",
                          style: { boxShadow: "0 0 30px oklch(0.62 0.25 22 / 0.4)" },
                          children: [
                            "Shop Now",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" })
                          ]
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/shop",
                      search: {
                        category: "Limited Edition",
                        brand: void 0,
                        q: void 0
                      },
                      "data-ocid": "home.limited_drops_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "outline",
                          size: "lg",
                          className: "border-accent/40 text-accent hover:bg-accent/10 px-10 font-semibold text-base",
                          children: "Explore Drops"
                        }
                      )
                    }
                  )
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
              animate: { y: [0, 8, 0] },
              transition: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-12 bg-gradient-to-b from-transparent to-muted-foreground/50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-1 rounded-full bg-muted-foreground/50" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.stats_section",
        className: "bg-card/60 border-y border-border/20 py-10",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center",
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: i * 0.1 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "text-3xl md:text-4xl font-display font-black",
                  style: {
                    color: i % 2 === 0 ? "oklch(0.98 0 0)" : "oklch(0.72 0.22 264)"
                  },
                  children: stat.value
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground tracking-widest uppercase mt-1", children: stat.label })
            ]
          },
          stat.label
        )) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.featured_section",
        className: "py-20 bg-background",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex items-end justify-between mb-12",
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2", children: "Handpicked" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-heading gradient-text", children: "Featured Drops" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/shop",
                    search: { category: void 0, brand: void 0, q: void 0 },
                    "data-ocid": "home.view_all_link",
                    className: "hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth group",
                    children: [
                      "View All",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: featured.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: i * 0.1 },
              "data-ocid": `home.featured_item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group glass-card overflow-hidden hover:border-border/40 transition-smooth hover:shadow-glow-pink", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: product.imagePaths[0],
                      alt: product.name,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                      loading: "lazy"
                    }
                  ),
                  product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground text-[10px] font-semibold tracking-wide", children: product.badge }) }),
                  product.isLimited && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "border-accent/60 text-accent bg-accent/10 text-[10px]",
                      children: "Limited"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-1", children: product.brand }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate", children: product.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-foreground", children: [
                      "₹",
                      (product.priceInCents / 100).toLocaleString("en-IN")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: product.stock <= 5 ? `Only ${product.stock} left` : "In Stock" })
                  ] })
                ] })
              ] }) })
            },
            product.id
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "home.brands_section", className: "py-20 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-3", children: "Our Collections" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-heading mb-10", children: "Shop By Collection" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 justify-center mb-12", children: BRAND_PILLS.map((brand, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 15 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.07 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/shop",
              search: {
                brand: brand.filter,
                category: void 0,
                q: void 0
              },
              "data-ocid": `home.brand_pill.${i + 1}`,
              className: "group flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-border/30 hover:border-accent/40 transition-smooth hover:bg-accent/5",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground group-hover:text-accent transition-smooth tracking-wide", children: brand.name })
            }
          )
        },
        brand.name
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-6 justify-center", children: ["Premium", "Limited Edition"].map((collection, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: i === 0 ? -30 : 30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: i * 0.15 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/shop",
              search: {
                brand: collection,
                category: void 0,
                q: void 0
              },
              "data-ocid": `home.brand_link.${i + 1}`,
              className: "group block glass-card px-12 py-10 hover:border-border/40 transition-smooth hover:shadow-glow-accent",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-display font-black tracking-tight text-foreground group-hover:text-primary transition-smooth", children: collection.toUpperCase() }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-2 tracking-widest uppercase", children: [
                  "Shop ",
                  collection,
                  " →"
                ] })
              ]
            }
          )
        },
        collection
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "home.gallery_section", className: "py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-3", children: "In-Store Experience" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-heading", children: "Visit The Store" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4", children: GALLERY_IMAGES.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.08 },
          className: i === 0 ? "col-span-2 md:col-span-1" : "",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "group overflow-hidden rounded-xl border border-border/20 hover:border-accent/30 transition-smooth aspect-square", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: img.src,
              alt: img.alt,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
              loading: "lazy"
            }
          ) })
        },
        img.src
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.new_arrivals_section",
        className: "py-20 bg-muted/20",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "mb-12",
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2", children: "Fresh Stock" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-heading", children: "Latest Arrivals" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3", children: latest.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { duration: 0.4, delay: i * 0.06 },
              "data-ocid": `home.latest_item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group glass-card overflow-hidden hover:border-border/40 transition-smooth", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.imagePaths[0],
                    alt: product.name,
                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500",
                    loading: "lazy"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-semibold tracking-widest uppercase text-muted-foreground", children: product.brand }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-foreground truncate mt-0.5", children: product.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold text-primary mt-1", children: [
                    "₹",
                    (product.priceInCents / 100).toLocaleString("en-IN")
                  ] })
                ] })
              ] }) })
            },
            product.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/shop",
              search: { category: void 0, brand: void 0, q: void 0 },
              "data-ocid": "home.explore_all_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "lg",
                  className: "border-border/50 hover:bg-card",
                  children: [
                    "Explore Full Collection",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                  ]
                }
              )
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.newsletter_section",
        className: "py-20 bg-background",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "max-w-2xl mx-auto text-center",
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-10 md:p-14 relative overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: "radial-gradient(ellipse 70% 60% at 50% 0%, oklch(0.72 0.22 264 / 0.08) 0%, transparent 70%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-3", children: "Stay Updated" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-display font-black text-foreground mb-3", children: "First To Know." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 text-sm leading-relaxed", children: "Get early access to limited drops, exclusive deals, and new arrivals — straight to your inbox." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "form",
                  {
                    onSubmit: (e) => {
                      e.preventDefault();
                      ue.success("You're on the list! 🔥");
                      e.target.reset();
                    },
                    className: "flex flex-col sm:flex-row gap-3",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "email",
                          required: true,
                          "data-ocid": "home.newsletter_input",
                          placeholder: "Enter your email address",
                          className: "flex-1 h-12 px-4 rounded-lg bg-muted/30 border border-border/40 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-smooth"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "submit",
                          "data-ocid": "home.newsletter_submit_button",
                          className: "bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 font-semibold shrink-0",
                          style: {
                            boxShadow: "0 0 20px oklch(0.62 0.25 22 / 0.3)"
                          },
                          children: "Subscribe"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-4", children: "No spam. Unsubscribe any time." })
              ] })
            ] })
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.features_section",
        className: "py-20 bg-card/30 border-t border-border/20",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: FEATURES.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex items-start gap-4",
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: i * 0.15 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: f.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: f.description })
              ] })
            ]
          },
          f.title
        )) }) })
      }
    )
  ] });
}
export {
  Home as default
};
