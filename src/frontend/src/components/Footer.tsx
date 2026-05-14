import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Cart", to: "/cart" },
  { label: "Login", to: "/login" },
];

const CATEGORIES = ["Sneakers", "Sports", "Streetwear", "Limited Edition"];
const BRANDS = ["Premium", "Limited Edition"];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/30 mt-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="text-2xl font-display font-black tracking-[-0.04em] text-foreground">
              KICKS
              <span className="block text-[9px] font-body font-medium tracking-[0.2em] text-muted-foreground mt-0.5 uppercase">
                THE COMPLETE SNEAKERS STORE
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium sneakers and sports footwear. Where elite performance
              meets luxury street style.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Navigate
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Categories
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    to="/shop"
                    search={{ category: cat, brand: undefined, q: undefined }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div className="space-y-4">
            <h4 className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Brands
            </h4>
            <ul className="space-y-2">
              {BRANDS.map((brand) => (
                <li key={brand}>
                  <Link
                    to="/shop"
                    search={{ brand, category: undefined, q: undefined }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get early access to limited drops and exclusive deals.
            </p>
            <a
              href="/shop"
              className="inline-block text-sm font-semibold text-accent hover:text-accent/80 transition-smooth"
            >
              Shop New Arrivals &rarr;
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/20 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Kicks The Complete Sneakers Store. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
