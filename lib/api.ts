const API_URL = 'https://dummyjson.com';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string; // DummyJSON usa thumbnail
  images: string[];
  rating: number;
  discountPercentage: number; // Nuevo campo útil
  stock: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

async function fetchFromAPI(endpoint: string) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

// --- PRODUCTOS ---

export async function getAllProducts(category?: string, query?: string): Promise<Product[]> {
  let endpoint = '/products?limit=100'; // Traemos más para filtrar mejor

  if (query) {
    endpoint = `/products/search?q=${encodeURIComponent(query)}`;
  } else if (category && category !== 'all') {
    endpoint = `/products/category/${category}`;
  }

  const data = await fetchFromAPI(endpoint);
  return data?.products || [];
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchFromAPI('/products/categories');
  return data || [];
}

export async function getProductById(id: string): Promise<Product | null> {
  return fetchFromAPI(`/products/${id}`);
}

// Nueva función: Productos Relacionados
export async function getRelatedProducts(category: string, currentId: number): Promise<Product[]> {
  const data = await fetchFromAPI(`/products/category/${category}?limit=4`);
  // Filtramos para que no salga el mismo producto que estamos viendo
  return data?.products?.filter((p: Product) => p.id !== currentId) || [];
}

// --- AUTH ---
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