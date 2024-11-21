export interface ProductsType {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, itemCount: number) => void;
}

export type OptionsType = Omit<ProductsType, 'imagePath'>

export interface OrderCountsType {
  products: Map<string, number>;
  options: Map<string, number>;
}

export interface UpdateItemCountProps {
  orderType: keyof OrderCountsType;
  itemName: string;
  itemCount: number;
}

export type OrderContextType = [
  {
    products: Map<string, number>;
    options: Map<string, number>;
    totals: {
      products: number;
      options: number;
      total: number;
    };
  },
  (props: UpdateItemCountProps) => void
];

