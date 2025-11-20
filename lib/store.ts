import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './api';

export interface CartItem extends Product {
  quantity: number;
}

// Definimos cómo se ve una Orden
export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pagado' | 'Procesando';
}

const IVA_RATE = 0.15;

interface CartState {
  items: CartItem[];
  orders: Order[]; // Nueva lista para el historial
  
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
  // Nueva acción para finalizar compra
  createOrder: () => void;

  getTotalItems: () => number;
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
      orders: [], // Inicializamos vacío

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

      // Lógica para mover del Carrito -> Historial de Pedidos
      createOrder: () => {
        const { items, getTotals, orders } = get();
        const { total } = getTotals();
        
        const newOrder: Order = {
          id: Math.random().toString(36).substr(2, 9).toUpperCase(), // ID único random
          date: new Date().toLocaleDateString(),
          items: [...items], // Copiamos los items actuales
          total: total,
          status: 'Pagado'
        };

        set({ 
          orders: [newOrder, ...orders], // Agregamos al principio de la lista
          items: [] // Vaciamos el carrito
        });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotals: () => {
        const subtotal = get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const iva = subtotal * IVA_RATE;
        const total = subtotal + iva;
        return { subtotal, iva, total };
      },
    }),
    {
      name: 'ecommerce-storage', // Cambié el nombre para asegurar que se actualice la estructura
    }
  )
);