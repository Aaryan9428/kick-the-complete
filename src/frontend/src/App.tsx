import { LoadingScreen } from "@/components/LoadingScreen";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/Home"));
const ShopPage = lazy(() => import("@/pages/Shop"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetail"));
const CartPage = lazy(() => import("@/pages/Cart"));
const CheckoutPage = lazy(() => import("@/pages/Checkout"));
const LoginPage = lazy(() => import("@/pages/Login"));
const PaymentSuccessPage = lazy(() => import("@/pages/PaymentSuccess"));
const PaymentFailurePage = lazy(() => import("@/pages/PaymentFailure"));

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  validateSearch: (search: Record<string, unknown>) => ({
    category: search.category as string | undefined,
    brand: search.brand as string | undefined,
    q: search.q as string | undefined,
  }),
  component: ShopPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductDetailPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-success",
  component: PaymentSuccessPage,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-failure",
  component: PaymentFailurePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
  loginRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
