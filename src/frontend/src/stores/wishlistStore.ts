import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  productIds: Set<string>;
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: new Set<string>(),

      toggle: (productId) =>
        set((state) => {
          const next = new Set(state.productIds);
          if (next.has(productId)) {
            next.delete(productId);
          } else {
            next.add(productId);
          }
          return { productIds: next };
        }),

      has: (productId) => get().productIds.has(productId),
    }),
    {
      name: "ktc-wishlist",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str) as { state: { productIds: string[] } };
          return {
            state: { productIds: new Set(parsed.state.productIds) },
          };
        },
        setItem: (name, value) => {
          const toStore = {
            state: { productIds: Array.from(value.state.productIds) },
          };
          localStorage.setItem(name, JSON.stringify(toStore));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
