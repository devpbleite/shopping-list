import { cn } from '@/lib/utils';
import { Apple, Beef, Beer, Carrot, Croissant, Milk, Salad, ShoppingBasket, SprayCan } from 'lucide-react';

interface BadgeProps {
  category: string;
  color: string;
}

const categoryToIcon: Record<string, keyof typeof iconMap> = {
  'Frutas': 'apple',
  'Alimentos': 'carrot',
  'Vegetais': 'salad',
  'Carnes': 'beef',
  'Laticínios': 'milk',
  'Padaria': 'croissant',
  'Bebidas': 'wine',
  'Limpeza': 'spray-can',
  'Outros': 'shopping-basket',
};

const iconMap = {
  apple: Apple,
  beef: Beef,
  wine: Beer,
  carrot: Carrot,
  croissant: Croissant,
  milk: Milk,
  salad: Salad,
  'shopping-basket': ShoppingBasket,
  'spray-can': SprayCan,
};

export function Badge({ category, color }: BadgeProps) {
  const iconKey = categoryToIcon[category];
  const Icon = iconKey ? iconMap[iconKey] : undefined;

  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
      color
    )}>
      {Icon && <Icon className="h-3 w-3" />}
      {category}
    </span>
  );
}