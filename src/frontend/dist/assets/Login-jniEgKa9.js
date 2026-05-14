import { a1 as useInternetIdentity, a0 as useQueryClient, j as jsxRuntimeExports, m as motion, L as Link } from "./index-BepgGYDm.js";
import { c as createLucideIcon, L as Layout, B as Button } from "./button-rcDW-ULO.js";
import { A as ArrowRight } from "./arrow-right-Dm1O90fu.js";
import { L as LoaderCircle } from "./loader-circle-Cpv7GnKP.js";
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
function Login() {
  const { login, clear, isAuthenticated, isInitializing, isLoggingIn } = useInternetIdentity();
  const queryClient = useQueryClient();
  const handleLogin = () => {
    if (isAuthenticated) {
      clear();
      queryClient.clear();
    } else {
      login();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { noPadding: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative min-h-screen flex items-center justify-center overflow-hidden",
      "data-ocid": "login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/snapchat-1256927249-019e0725-6e21-72b9-a431-062d40394985.jpg",
              alt: "",
              className: "w-full h-full object-cover opacity-20",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0",
              style: {
                background: "radial-gradient(ellipse 80% 80% at 50% 50%, oklch(0.09 0 0 / 0.7) 0%, oklch(0.09 0 0 / 0.95) 100%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0",
              style: {
                background: "radial-gradient(ellipse 50% 40% at 50% 30%, oklch(0.72 0.22 264 / 0.1) 0%, transparent 60%)"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-full container mx-auto px-4 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-display font-black tracking-[-0.04em] text-foreground mb-1", children: "KICKS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-body tracking-[0.22em] uppercase text-muted-foreground mb-8", children: "The Complete Sneakers Store" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: isAuthenticated ? "Your Account" : "Welcome Back" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2", children: isAuthenticated ? "You are logged in with Internet Identity." : "Sign in securely — no passwords required." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card p-8", "data-ocid": "login.card", children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-accent" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground", children: "Logged In" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: "Ready to shop the premium collection." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/shop",
                      search: {
                        category: void 0,
                        brand: void 0,
                        q: void 0
                      },
                      "data-ocid": "login.go_shopping_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent h-11", children: [
                        "Shop Now ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      "data-ocid": "login.logout_button",
                      onClick: handleLogin,
                      className: "w-full border-border/40 h-11",
                      children: "Sign Out"
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-accent shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-relaxed", children: "Internet Identity uses cryptographic keys — more secure than any password." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "login.submit_button",
                    onClick: handleLogin,
                    disabled: isInitializing || isLoggingIn,
                    className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-accent h-12 font-semibold text-base",
                    children: isInitializing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 mr-2 animate-spin" }),
                      "Loading…"
                    ] }) : isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 mr-2 animate-spin" }),
                      "Opening Identity…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Sign In with Internet Identity" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
                  "New to Internet Identity?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "https://identity.ic0.app/",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-accent hover:underline",
                      children: "Create one free"
                    }
                  )
                ] })
              ] }) }),
              !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "mt-8 text-center",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.4 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Just browsing?",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/shop",
                        search: {
                          category: void 0,
                          brand: void 0,
                          q: void 0
                        },
                        "data-ocid": "login.browse_link",
                        className: "text-foreground hover:text-primary transition-smooth underline underline-offset-2",
                        children: "Continue without login"
                      }
                    )
                  ] })
                }
              )
            ]
          }
        ) }) })
      ]
    }
  ) });
}
export {
  Login as default
};
