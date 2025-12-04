export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Barra superior exclusiva del Admin */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200">
        <h2 className="font-bold text-xl text-gray-800">🛠️ Panel de Administración</h2>
        <p className="text-sm text-gray-500">Gestiona tus productos y ventas aquí</p>
      </div>

      {/* Contenido de la página de admin */}
      <section className="mt-4">
        {children}
      </section>
    </div>
  );
}