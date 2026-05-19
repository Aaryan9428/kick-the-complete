import { j as jsxRuntimeExports } from "./index-EDhnjgOJ.js";
import { h as Slot, a as cn, i as cva } from "./button-B4gG1HGM.js";
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const PRODUCTS = [
  {
    id: "p01",
    name: "Air Jordan 1 High",
    brand: "Premium",
    description: "Premium court-to-street high-top silhouette with triple-density foam midsole. Perforated leather upper delivers breathability without sacrificing structure.",
    priceInCents: 1299900,
    imagePaths: [
      "/assets/snapchat-74182342-019e0725-6a4f-7569-a07c-dde45c1c55a4.jpg"
    ],
    category: "Sneakers",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    stock: 12,
    isFeatured: true,
    isLimited: false,
    badge: "Best Seller"
  },
  {
    id: "p02",
    name: "Air Force 1",
    brand: "Limited Edition",
    description: "Born on the court, perfected on the streets. Full-length Air cushioning meets a timeless low-top silhouette that owns every room.",
    priceInCents: 1899900,
    imagePaths: [
      "/assets/snapchat-552582316-019e0725-6a4f-72ec-adc7-dd078dbe971c.jpg"
    ],
    category: "Limited Edition",
    sizes: ["7", "8", "9", "10", "11"],
    stock: 5,
    isFeatured: true,
    isLimited: true,
    badge: "Limited Drop"
  },
  {
    id: "p03",
    name: "Air Zoom Vomero",
    brand: "New Arrivals",
    description: "Responsive zoom energy-return midsole wrapped in engineered mesh upper. Built for runners who demand performance and style in equal measure.",
    priceInCents: 1699900,
    imagePaths: [
      "/assets/snapchat-519172482-019e0725-6ae1-736d-9418-c916ffbdadf6.jpg"
    ],
    category: "Sports",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    stock: 20,
    isFeatured: true,
    isLimited: false,
    badge: "New Arrival"
  },
  {
    id: "p04",
    name: "Air Jordan 1 Mid",
    brand: "Premium",
    description: "High-top mid street silhouette reborn for the urban runner. Premium suede panels contrast against clean leather overlays.",
    priceInCents: 1499900,
    imagePaths: [
      "/assets/snapchat-651984858-019e0725-6ada-7046-8494-bf91c60fb95d.jpg"
    ],
    category: "Sneakers",
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 8,
    isFeatured: false,
    isLimited: false
  },
  {
    id: "p05",
    name: "EQ21 Run",
    brand: "Premium",
    description: "Street-ready running silhouette with signature cushioning pods. Modern urban design meets world-class athletic engineering.",
    priceInCents: 1399900,
    imagePaths: [
      "/assets/snapchat-25268531-019e0725-6ab3-70ec-b8ad-68025f907182.jpg"
    ],
    category: "Streetwear",
    sizes: ["6", "7", "8", "9", "10", "11"],
    stock: 15,
    isFeatured: false,
    isLimited: false,
    badge: "Fan Favourite"
  },
  {
    id: "p06",
    name: "Zig Kinetica",
    brand: "New Arrivals",
    description: "Advanced Zig foam technology delivers a plush, responsive ride. Wide base and rocker geometry for a smooth heel-to-toe transition.",
    priceInCents: 1599900,
    imagePaths: [
      "/assets/snapchat-794509771-019e0725-6bc1-70a2-90a8-6e60fa4c0aeb.jpg"
    ],
    category: "Sports",
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 18,
    isFeatured: false,
    isLimited: false
  },
  {
    id: "p07",
    name: "Air Force 1 LV Monogram",
    brand: "Premium",
    description: "Heritage low-top silhouette reissued with premium monogram materials. Sculpted midsole and rich leather upper — court culture perfected.",
    priceInCents: 1199900,
    imagePaths: [
      "/assets/snapchat-999219426-019e0725-6c15-735d-9c38-3afd8523916d.jpg"
    ],
    category: "Sneakers",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    stock: 22,
    isFeatured: false,
    isLimited: false,
    badge: "Classic"
  },
  {
    id: "p08",
    name: "327",
    brand: "Premium",
    description: "Full-length visible cushion unit with heritage running DNA. 360 impact absorption and reflective detailing for standout day-or-night style.",
    priceInCents: 1749900,
    imagePaths: [
      "/assets/snapchat-891787037-019e0725-6cae-766d-9235-a524c4345b65.jpg"
    ],
    category: "Sneakers",
    sizes: ["7", "8", "9", "10", "11"],
    stock: 7,
    isFeatured: true,
    isLimited: false,
    badge: "Iconic"
  },
  {
    id: "p09",
    name: "LiteRide",
    brand: "Limited Edition",
    description: "Next-gen foam architecture elevated to luxury status. LiteRide EVA foam midsole, engineered mesh upper, full-length cushion stack — relentlessly comfortable.",
    priceInCents: 2499900,
    imagePaths: [
      "/assets/snapchat-799503199-019e0725-6e24-7582-b1b9-032cb72b5cbd.jpg"
    ],
    category: "Limited Edition",
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 3,
    isFeatured: true,
    isLimited: true,
    badge: "Exclusive"
  },
  {
    id: "p10",
    name: "Air Zoom Vomero Grey",
    brand: "Premium",
    description: "Distressed vintage grey finish honours the originals. Herringbone outsole pattern, soft zoom foam insole, and premium mesh upper for effortless everyday wear.",
    priceInCents: 1099900,
    imagePaths: [
      "/assets/snapchat-1816019002-019e0725-6e3c-7085-af36-34bb0aa00e37.jpg"
    ],
    category: "Sneakers",
    sizes: ["6", "7", "8", "9", "10", "11"],
    stock: 25,
    isFeatured: false,
    isLimited: false
  },
  {
    id: "p11",
    name: "Stan Smith",
    brand: "Premium",
    description: "The original court icon reimagined in premium full-grain leather. Understated tonal perforations and cloud-soft cushioning.",
    priceInCents: 999900,
    imagePaths: [
      "/assets/snapchat-1788609277-019e0725-6e16-700f-b6e4-efd9f1439312.jpg"
    ],
    category: "Sneakers",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    stock: 30,
    isFeatured: false,
    isLimited: false,
    badge: "Timeless"
  },
  {
    id: "p12",
    name: "Classic Leather",
    brand: "Limited Edition",
    description: "Heritage leather construction perfected for the streets. Dual density foam plus premium full-grain upper — the most iconic silhouette ever made.",
    priceInCents: 2199900,
    imagePaths: [
      "/assets/snapchat-2010385672-019e0725-6e5a-727d-b939-f13e2dfafddf.jpg"
    ],
    category: "Sports",
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 10,
    isFeatured: false,
    isLimited: true,
    badge: "Pro Edition"
  },
  {
    id: "p13",
    name: "Air Jordan 1 UNC",
    brand: "Limited Edition",
    description: "Archival high-top silhouette meets future material science. Advanced cushioning system, premium leather, and coveted University Blue colorway.",
    priceInCents: 1849900,
    imagePaths: [
      "/assets/snapchat-1248588398-019e0725-6e3b-730b-99c5-9c3536503c5e.jpg"
    ],
    category: "Streetwear",
    sizes: ["7", "8", "9", "10", "11"],
    stock: 6,
    isFeatured: false,
    isLimited: true,
    badge: "Collectors"
  },
  {
    id: "p14",
    name: "AF1 Naruto Edition",
    brand: "Limited Edition",
    description: "The silhouette that started a revolution, reimagined as a collector piece. Tumbled leather upper, air-cushion sole, and anime-inspired details — every stitch is a piece of history.",
    priceInCents: 1999900,
    imagePaths: [
      "/assets/snapchat-844653338-019e0725-6e15-71d8-a64e-11e5a3c8d63b.jpg"
    ],
    category: "Limited Edition",
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 4,
    isFeatured: true,
    isLimited: true,
    badge: "Legendary"
  },
  {
    id: "p15",
    name: "Retro Runner",
    brand: "New Arrivals",
    description: "Elevated reinterpretation of the suede runner classic. Chunky platform sole adds modern street height without compromising the iconic silhouette.",
    priceInCents: 1149900,
    imagePaths: [
      "/assets/snapchat-1096384696-019e0725-6e1b-7438-a749-d357bd28d3c2.jpg"
    ],
    category: "Sneakers",
    sizes: ["5", "6", "7", "8", "9", "10"],
    stock: 16,
    isFeatured: false,
    isLimited: false
  },
  {
    id: "p16",
    name: "Air Force 1 LV Beige",
    brand: "New Arrivals",
    description: "Minimalist low-top in premium beige leather with second-skin fit. Segmented sole flex grooves mirror natural foot movement for every stride.",
    priceInCents: 1349900,
    imagePaths: [
      "/assets/snapchat-1449134242-019e0725-6e30-70fc-9ffc-d8f9c52e3eb8.jpg"
    ],
    category: "Sports",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    stock: 19,
    isFeatured: false,
    isLimited: false,
    badge: "Natural Motion"
  },
  {
    id: "p17",
    name: "Air Zoom",
    brand: "Premium",
    description: "Indoor sports heritage turned streetwear icon. Zoom Air unit, suede toe overlay, and precision construction that defined a generation.",
    priceInCents: 1099900,
    imagePaths: [
      "/assets/snapchat-1256927249-019e0725-6e21-72b9-a431-062d40394985.jpg"
    ],
    category: "Streetwear",
    sizes: ["6", "7", "8", "9", "10", "11"],
    stock: 14,
    isFeatured: false,
    isLimited: false,
    badge: "Street Icon"
  },
  {
    id: "p18",
    name: "Jordan 1 High Yellow",
    brand: "New Arrivals",
    description: "Weather-resistant high-top in a head-turning yellow and black colorway. Zoom cushion unit in the forefoot for all-conditions performance with reflective detailing.",
    priceInCents: 1649900,
    imagePaths: [
      "/assets/snapchat-1165606418-019e0725-6e2f-710c-bafd-aa967cd9dae9.jpg"
    ],
    category: "Sports",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    stock: 11,
    isFeatured: false,
    isLimited: false
  },
  {
    id: "p19",
    name: "NB 990",
    brand: "Premium",
    description: "Premium suede and mesh construction on a beloved heritage running silhouette. Gum outsole and rich earth tones make this an enduring classic.",
    priceInCents: 1249900,
    imagePaths: [
      "/assets/snapchat-1592945222-019e0725-6adb-703a-b1fc-8e3c54af6bc4.jpg"
    ],
    category: "Sneakers",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    stock: 13,
    isFeatured: false,
    isLimited: false,
    badge: "Heritage"
  }
];
const getFeaturedProducts = () => PRODUCTS.filter((p) => p.isFeatured);
const getProductById = (id) => PRODUCTS.find((p) => p.id === id);
const CATEGORIES = [
  "All",
  "Sneakers",
  "Sports",
  "Streetwear",
  "Limited Edition"
];
const BRANDS = ["All", "Premium", "Limited Edition", "New Arrivals"];
export {
  Badge as B,
  CATEGORIES as C,
  PRODUCTS as P,
  BRANDS as a,
  getProductById as b,
  getFeaturedProducts as g
};
