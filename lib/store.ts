import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './api';

export interface CartItem extends Product {
  quantity: number;
}

// 1. Definimos la TARIFA DE IVA (15% = 0.15)
const IVA_RATE = 0.15;

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
  getTotalItems: () => number;
  // 2. Creamos una función que devuelva todos los cálculos
  getTotals: () => {
    subtotal: number;
    iva: number;
    total: number;
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, count = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + count }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: count }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // 3. Implementamos la nueva función de totales
      getTotals: () => {
        const subtotal = get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const iva = subtotal * IVA_RATE;
        const total = subtotal + iva;
        return { subtotal, iva, total };
      },
    }),
    {
      name: 'ecommerce-cart',
    }
  )
);