export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  priceInCents: number;
  imagePaths: string[];
  category: string;
  sizes: string[];
  stock: number;
  isFeatured: boolean;
  isLimited: boolean;
  badge?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  imagePath: string;
  size: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalInCents: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  stripeSessionId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  priceInCents: number;
  quantity: number;
  size: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
}
export interface OrderFormData {
  customerName: string;
  phone: string;
  productName: string;
  shoeSize: string;
  quantity: number;
  address: string;
  note?: string;
}
