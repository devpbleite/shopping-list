export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  checked: boolean;
}

export type Category = {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
};