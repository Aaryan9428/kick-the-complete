import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductInput {
    id: string;
    name: string;
    description: string;
    sizes: Array<string>;
    stock: bigint;
    isFeatured: boolean;
    isLimited: boolean;
    category: string;
    badge?: string;
    brand: string;
    imagePaths: Array<string>;
    priceInCents: bigint;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface OrderItem {
    size: string;
    productId: ProductId;
    productName: string;
    quantity: bigint;
    priceInCents: bigint;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    userId: UserId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    totalInCents: bigint;
    items: Array<OrderItem>;
    stripeSessionId?: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type ProductId = string;
export interface Product {
    id: string;
    name: string;
    description: string;
    sizes: Array<string>;
    stock: bigint;
    isFeatured: boolean;
    isLimited: boolean;
    category: string;
    badge?: string;
    brand: string;
    imagePaths: Array<string>;
    priceInCents: bigint;
}
export type OrderId = bigint;
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    paid = "paid",
    delivered = "delivered"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    confirmPayment(sessionId: string): Promise<boolean>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteProduct(id: string): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getOrder(id: OrderId): Promise<Order | null>;
    getProduct(id: string): Promise<Product | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listAllOrders(): Promise<Array<Order>>;
    listFeaturedProducts(): Promise<Array<Product>>;
    listMyOrders(): Promise<Array<Order>>;
    listProducts(): Promise<Array<Product>>;
    listProductsByBrand(brand: string): Promise<Array<Product>>;
    listProductsByCategory(category: string): Promise<Array<Product>>;
    placeOrder(items: Array<OrderItem>, totalInCents: bigint): Promise<Order>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitOrderRequest(customerName: string, phone: string, productName: string, shoeSize: string, quantity: bigint, address: string, note: string): Promise<{
        __kind__: "ok";
        ok: OrderId;
    } | {
        __kind__: "err";
        err: string;
    }>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<boolean>;
    upsertProduct(product: ProductInput): Promise<void>;
}
