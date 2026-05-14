import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  /** Pass true to let the page handle its own top padding (e.g. fullscreen hero) */
  noPadding?: boolean;
}

export function Layout({ children, noPadding = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className={`flex-1 ${noPadding ? "" : "pt-16 md:pt-20"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
