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

export interface Category {
  slug: string;
  name: string;
  url: string;
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

// --- Funciones de Productos ---

// Modificamos esta función para aceptar una categoría opcional
export async function getAllProducts(category?: string): Promise<Product[]> {
  // Si hay categoría, usamos el endpoint de filtrado, si no, traemos todos
  const endpoint = category && category !== 'all' 
    ? `/products/category/${category}` 
    : '/products?limit=0'; // Limit 0 trae todos en DummyJSON (o pon un numero alto)

  const data = await fetchFromAPI(endpoint);
  
  if (data && data.products) {
    return data.products.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      image: p.thumbnail,
      rating: { rate: p.rating || 4.5, count: 100 }
    }));
  }
  return [];
}

// Nueva función para obtener la lista de categorías
export async function getCategories(): Promise<Category[]> {
  const data = await fetchFromAPI('/products/categories');
  // DummyJSON devuelve un array de objetos { slug, name, url }
  return data || []; 
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

  return {
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    category: p.category,
    image: p.thumbnail || p.images[0],
    rating: { rate: p.rating || 4.5, count: 100 }
  };
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