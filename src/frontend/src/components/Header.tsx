import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [{ label: "Shop", to: "/shop" }];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useUIStore((s) => s.openCart);
  const { isAuthenticated } = useInternetIdentity();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const prevPathRef = useRef(currentPath);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  if (prevPathRef.current !== currentPath) {
    prevPathRef.current = currentPath;
    if (mobileOpen) setMobileOpen(false);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-card/80 backdrop-blur-xl border-b border-border/30 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            data-ocid="header.logo_link"
            className="flex flex-col leading-none group"
          >
            <span className="text-xl md:text-2xl font-display font-black tracking-[-0.04em] text-foreground group-hover:text-primary transition-smooth">
              KICKS
            </span>
            <span className="text-[8px] font-body font-semibold tracking-[0.18em] uppercase text-muted-foreground leading-tight">
              The Complete Sneakers Store
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                search={{ category: undefined, brand: undefined, q: undefined }}
                data-ocid="header.nav_link"
                className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-smooth relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1 md:gap-2">
            <Link
              to="/shop"
              search={{ category: undefined, brand: undefined, q: undefined }}
              data-ocid="header.search_button"
              className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth rounded-lg hover:bg-muted/40"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Link>

            <Link
              to="/shop"
              search={{ category: undefined, brand: undefined, q: undefined }}
              data-ocid="header.wishlist_button"
              className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth rounded-lg hover:bg-muted/40"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={openCart}
              data-ocid="header.cart_button"
              className="relative w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth rounded-lg hover:bg-muted/40"
              aria-label="Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            <Link
              to="/login"
              data-ocid="header.login_button"
              className={`hidden md:flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium transition-smooth ${
                isAuthenticated
                  ? "bg-muted/40 text-foreground hover:bg-muted"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-red"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              {isAuthenticated ? "Account" : "Login"}
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              data-ocid="header.mobile_menu_button"
              className="md:hidden w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth rounded-lg hover:bg-muted/40"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border/30"
            data-ocid="header.mobile_menu"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  search={{
                    category: undefined,
                    brand: undefined,
                    q: undefined,
                  }}
                  className="flex items-center h-11 px-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-smooth"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                className="flex items-center gap-2 h-11 px-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted/40 transition-smooth mt-2 border-t border-border/20 pt-3"
                onClick={() => setMobileOpen(false)}
              >
                <User className="w-4 h-4" />
                {isAuthenticated ? "Account" : "Login / Register"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
