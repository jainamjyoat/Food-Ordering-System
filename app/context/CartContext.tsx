"use client";
import React, { createContext, useContext, useState } from 'react';

// Define the Order Type
type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: any) => void;
  updateQuantity: (id: number, delta: number) => void;
  // New Methods
  placeOrder: () => void;
  activeOrder: Order | null;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // --- NEW: Place Order Logic ---
  const placeOrder = () => {
    const newOrder: Order = {
      id: "#FD-" + Math.floor(1000 + Math.random() * 9000), // Random ID
      items: [...cart],
      total: totalPrice,
      date: new Date().toLocaleTimeString(),
    };
    setActiveOrder(newOrder);
    setCart([]); // Clear cart
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, totalItems, totalPrice, placeOrder, activeOrder }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}