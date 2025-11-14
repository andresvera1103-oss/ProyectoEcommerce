const API_URL = 'https://fakestoreapi.com';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Función interna segura
async function fetchFromAPI(endpoint: string) {
  try {
    const url = `${API_URL}${endpoint}`;
    // Usamos no-store para asegurar que siempre intente buscar datos frescos
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Error API ${res.status} en ${endpoint}`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error(`Error de red en ${endpoint}:`, error);
    return null;
  }
}

// --- Funciones de Productos (Blindadas) ---

export async function getAllProducts(): Promise<Product[]> {
  const data = await fetchFromAPI('/products');
  // Si falla, devolvemos array vacío para que no rompa la página
  return data || [];
}

export async function getProductById(id: string): Promise<Product> {
  const data = await fetchFromAPI(`/products/${id}`);
  
  // Si falla, devolvemos un producto "fantasma" para que no rompa el detalle
  if (!data) {
    return {
      id: 0,
      title: "Producto no disponible momentáneamente",
      price: 0,
      description: "Intenta recargar la página.",
      category: "Error",
      image: "",
      rating: { rate: 0, count: 0 }
    };
  }
  return data;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const data = await fetchFromAPI(`/products/category/${category}`);
  return data || [];
}

// --- Auth ---

export async function loginUser(username: string, password: string) {
  try {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}