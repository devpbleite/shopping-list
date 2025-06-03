import { MoreVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShoppingItem } from "@/types";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Badge } from "./Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ShoppingItem>) => void;
}

export function ShoppingListItem({
  item,
  onToggle,
  onRemove,
}: ShoppingListItemProps) {
  const category = categories.find((c) => c.name === item.category);

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-lg",
        "bg-white/50 md:bg-white hover:bg-white/80 transition-colors",
        "border border-violet-100",
        item.checked && "opacity-50"
      )}
    >
      <div className="flex items-center gap-4">
        <Checkbox
          checked={item.checked}
          onCheckedChange={() => onToggle(item.id)}
          className="border-violet-200 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
        />
        <div>
          <p
            className={cn(
              "font-medium text-slate-700",
              item.checked && "line-through text-slate-400"
            )}
          >
            {item.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-slate-500">
              {item.quantity} unidade{item.quantity !== 1 && "s"}
            </p>
            {category && (
              <Badge
                category={category.name}
                color={cn(
                  "bg-opacity-10 text-opacity-90",
                  category.bgColor,
                  category.textColor
                )}
              />
            )}
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-slate-600"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white border-violet-100">
          <DropdownMenuItem
            className="text-red-500 focus:text-red-600 focus:bg-red-50"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remover
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
