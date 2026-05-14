import { createActor } from "@/backend";
import type { ShoppingItem } from "@/backend";
import type { CheckoutSession } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProduct(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["stripe-configured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (items: ShoppingItem[]): Promise<CheckoutSession> => {
      if (!actor) throw new Error("Actor not available");
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success`;
      const cancelUrl = `${baseUrl}/payment-failure`;
      const result = await actor.createCheckoutSession(
        items,
        successUrl,
        cancelUrl,
      );
      const session = JSON.parse(result) as CheckoutSession;
      if (!session?.url) throw new Error("Stripe session missing url");
      return session;
    },
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (config: {
      secretKey: string;
      allowedCountries: string[];
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setStripeConfiguration(config);
    },
  });
}
