# eCommerce Moderno 🛒

Este proyecto es una aplicación de comercio electrónico moderna construida con **Next.js 14**, diseñada para demostrar un flujo completo de compra, gestión de estado global y autenticación simulada.

## 🚀 Tecnologías Utilizadas

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
* **Estado Global:** [Zustand](https://github.com/pmndrs/zustand) (con persistencia en LocalStorage)
* **Autenticación:** [NextAuth.js](https://next-auth.js.org/)
* **APIs Externas:**
    * Productos: [FakeStoreAPI](https://fakestoreapi.com/)
    * Auth: [DummyJSON](https://dummyjson.com/)

## 🛠️ Instalación y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-de-tu-repo>
    cd ecommerce-moderno
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes variables:
    ```bash
    NEXT_PUBLIC_API_URL=[https://fakestoreapi.com](https://fakestoreapi.com)
    NEXTAUTH_SECRET=tu_clave_secreta_aqui
    NEXTAUTH_URL=http://localhost:3000
    ```

4.  **Correr el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

5.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔑 Autenticación Simulada

El proyecto utiliza **NextAuth** conectado a la API de **DummyJSON** para simular un inicio de sesión real. Como no se utiliza una base de datos propia, se deben usar usuarios preexistentes en DummyJSON.

**Credenciales de Prueba:**

* **Usuario:** `emilys`
* **Contraseña:** `emilyspass`

## 📦 Funcionalidades Principales

1.  **Catálogo de Productos:** Visualización dinámica de productos traídos de FakeStoreAPI.
2.  **Detalle de Producto:** Páginas dinámicas (`/product/[id]`) con información extendida.
3.  **Carrito de Compras:**
    * Persiste al recargar la página.
    * Panel lateral (Sheet) para gestión rápida.
    * Modificación de cantidades y cálculo automático de totales.
4.  **Checkout:** Simulación de proceso de pago con validación de formulario y limpieza de carrito post-compra.

## 📂 Estructura del Proyecto

* `/app`: Rutas y páginas (App Router).
* `/components`: Componentes de React (UI y Lógica).
* `/lib`: Lógica de negocio (API calls, Store de Zustand).