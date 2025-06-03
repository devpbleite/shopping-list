import { useShoppingList } from "@/hooks/useShoppingList";
import { AddItemForm } from "@/components/AddItemForm";
import { ShoppingList } from "@/components/ShoppingList";
import { Header } from "@/components/Header";
import { Container } from "@/components/Container";

export default function App() {
  const { items, addItem, toggleItem, removeItem, updateItem } =
    useShoppingList();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-violet-50">
      <div className="min-h-screen md:flex md:items-center">
        <Container>
          <Header />
          <AddItemForm onAdd={addItem} />
          <div className="mt-8">
            <ShoppingList
              items={items}
              onToggle={toggleItem}
              onRemove={removeItem}
              onUpdate={updateItem}
            />
            {items.length === 0 && (
              <div className="text-center text-slate-500 py-8">
                <p className="text-sm">Sua lista está vazia</p>
                <p className="text-xs mt-1">
                  Adicione alguns itens para começar
                </p>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
