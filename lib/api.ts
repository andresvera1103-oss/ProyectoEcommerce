const API_URL = 'https://dummyjson.com';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;      // 👈 Recuperamos esta propiedad para que tu diseño no se rompa
  thumbnail: string;  // Mantenemos esta por si acaso
  images: string[];
  rating: {
    rate: number;
    count: number;
  };
  discountPercentage: number;
  stock: number;
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

export async function getAllProducts(category?: string, query?: string): Promise<Product[]> {
  let endpoint = '/products?limit=100'; // Traemos bastantes para filtrar bien

  if (query) {
    endpoint = `/products/search?q=${encodeURIComponent(query)}`;
  } else if (category && category !== 'all') {
    endpoint = `/products/category/${category}`;
  }

  const data = await fetchFromAPI(endpoint);
  
  if (data && data.products) {
    // 👇 AQUÍ ESTÁ LA MAGIA: Mapeamos los datos para adaptar DummyJSON a tu App
    return data.products.map((p: any) => ({
      ...p,
      // Creamos la propiedad 'image' usando el 'thumbnail' que viene de la API
      image: p.thumbnail || p.images[0] || '', 
      rating: { 
        rate: p.rating || 4.5, 
        count: p.reviews?.length || 100 
      }
    }));
  }
  return [];
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchFromAPI('/products/categories');
  return data || [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const p = await fetchFromAPI(`/products/${id}`);
  
  if (!p) {
    // Producto fantasma para evitar errores si no se encuentra
    return {
      id: 0,
      title: "Producto no encontrado",
      price: 0,
      description: "No disponible",
      category: "Error",
      image: "https://dummyjson.com/image/150", // Placeholder seguro
      thumbnail: "",
      images: [],
      rating: { rate: 0, count: 0 },
      discountPercentage: 0,
      stock: 0
    };
  }

  // Mapeamos también el producto individual
  return {
    ...p,
    image: p.thumbnail || p.images[0] || '',
    rating: { rate: p.rating || 4.5, count: p.reviews?.length || 100 }
  };
}

// Relacionados
export async function getRelatedProducts(category: string, currentId: number): Promise<Product[]> {
  const data = await fetchFromAPI(`/products/category/${category}?limit=5`);
  if (data && data.products) {
    return data.products
      .filter((p: any) => p.id !== currentId)
      .map((p: any) => ({
        ...p,
        image: p.thumbnail || p.images[0] || '', // Mapeo aquí también
        rating: { rate: p.rating || 4.5, count: 100 }
      }));
  }
  return [];
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