export function Header() {
  return (
    <header className="flex items-center justify-center gap-3 mb-8">
      <img
        src="/icon.png"
        alt="Lista de Compras"
        className="h-8 w-8"
      />
      <h1 className="text-2xl font-bold text-red-500">
        Lista de Compras
      </h1>
    </header>
  );
}