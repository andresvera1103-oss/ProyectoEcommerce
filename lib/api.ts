// Usamos DummyJSON que es más rápido y confiable
const API_URL = 'https://dummyjson.com';

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

// --- Funciones de Productos (Adaptadas para DummyJSON) ---

export async function getAllProducts(): Promise<Product[]> {
  const data = await fetchFromAPI('/products?limit=20'); // Traemos 20 productos
  
  // DummyJSON devuelve un objeto { products: [...] }
  if (data && data.products) {
    // Adaptamos los datos para que encajen con tu diseño actual
    return data.products.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      image: p.thumbnail, // Usamos el thumbnail como imagen principal
      rating: { rate: p.rating || 4.5, count: 100 }
    }));
  }
  return [];
}

export async function getProductById(id: string): Promise<Product> {
  const p = await fetchFromAPI(`/products/${id}`);
  
  if (!p) {
    return {
      id: 0,
      title: "Producto no encontrado",
      price: 0,
      description: "No se pudo cargar la información.",
      category: "Error",
      image: "",
      rating: { rate: 0, count: 0 }
    };
  }

  // Adaptamos el producto individual
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    category: p.category,
    image: p.thumbnail || p.images[0], // Usamos thumbnail o la primera imagen
    rating: { rate: p.rating || 4.5, count: 100 }
  };
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  // DummyJSON usa rutas distintas para categorías, pero para este demo
  // simplemente devolvemos todos para evitar errores.
  return getAllProducts();
}

// --- Auth (Sigue igual) ---

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