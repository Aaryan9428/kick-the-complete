import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function Login() {
  const { login, clear, isAuthenticated, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogin = () => {
    if (isAuthenticated) {
      clear();
      queryClient.clear();
    } else {
      login();
    }
  };

  return (
    <Layout noPadding>
      {/* Full-page hero with store sign photo */}
      <div
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-ocid="login.page"
      >
        {/* Background: store sign photo */}
        <div className="absolute inset-0">
          <img
            src="/assets/snapchat-1256927249-019e0725-6e21-72b9-a431-062d40394985.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 50% 50%, oklch(0.09 0 0 / 0.7) 0%, oklch(0.09 0 0 / 0.95) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 50% 30%, oklch(0.72 0.22 264 / 0.1) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-center mb-10">
                <div className="text-4xl font-display font-black tracking-[-0.04em] text-foreground mb-1">
                  KICKS
                </div>
                <div className="text-[10px] font-body tracking-[0.22em] uppercase text-muted-foreground mb-8">
                  The Complete Sneakers Store
                </div>
                <h1 className="text-2xl font-display font-bold text-foreground">
                  {isAuthenticated ? "Your Account" : "Welcome Back"}
                </h1>
                <p className="text-muted-foreground text-sm mt-2">
                  {isAuthenticated
                    ? "You are logged in with Internet Identity."
                    : "Sign in securely — no passwords required."}
                </p>
              </div>

              <div className="glass-card p-8" data-ocid="login.card">
                {isAuthenticated ? (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        Logged In
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Ready to shop the premium collection.
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Link
                        to="/shop"
                        search={{
                          category: undefined,
                          brand: undefined,
                          q: undefined,
                        }}
                        data-ocid="login.go_shopping_button"
                      >
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent h-11">
                          Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      <Button
                        type="button"
                        variant="outline"
                        data-ocid="login.logout_button"
                        onClick={handleLogin}
                        className="w-full border-border/40 h-11"
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
                      <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        Internet Identity uses cryptographic keys — more secure
                        than any password.
                      </span>
                    </div>

                    <Button
                      type="button"
                      data-ocid="login.submit_button"
                      onClick={handleLogin}
                      disabled={isInitializing || isLoggingIn}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent h-12 font-semibold text-base"
                    >
                      {isInitializing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Loading…
                        </>
                      ) : isLoggingIn ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Opening Identity…
                        </>
                      ) : (
                        <>Sign In with Internet Identity</>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      New to Internet Identity?{" "}
                      <a
                        href="https://identity.ic0.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        Create one free
                      </a>
                    </p>
                  </div>
                )}
              </div>

              {!isAuthenticated && (
                <motion.div
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-xs text-muted-foreground">
                    Just browsing?{" "}
                    <Link
                      to="/shop"
                      search={{
                        category: undefined,
                        brand: undefined,
                        q: undefined,
                      }}
                      data-ocid="login.browse_link"
                      className="text-foreground hover:text-primary transition-smooth underline underline-offset-2"
                    >
                      Continue without login
                    </Link>
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
