const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

// Función interna para fetch
async function fetchFromAPI(endpoint: string) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    next: { revalidate: 3600 } 
  });

  if (!res.ok) {
    throw new Error(`Error fetching data from ${endpoint}`);
  }

  return res.json();
}

// --- Funciones de Productos ---

export async function getAllProducts(): Promise<Product[]> {
  return fetchFromAPI('/products');
}

export async function getProductById(id: string): Promise<Product> {
  return fetchFromAPI(`/products/${id}`);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return fetchFromAPI(`/products/category/${category}`);
}

// --- NUEVA FUNCIÓN: AUTENTICACIÓN CON DUMMYJSON ---

export async function loginUser(username: string, password: string) {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      // expiresInMins: 60, // opcional
    })
  });

  if (!res.ok) {
    throw new Error('Credenciales inválidas');
  }

  return res.json();
}