import { ShoppingItem as Item } from '@/types';
import { ShoppingListItem } from './ShoppingListItem';

interface ShoppingListProps {
  items: Item[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Item>) => void;
}

export function ShoppingList({ items, onToggle, onRemove, onUpdate }: ShoppingListProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <ShoppingListItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}