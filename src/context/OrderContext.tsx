import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import {
  OrderContextType,
  OrderCountsType,
  UpdateItemCountProps,
} from "../types/ItemsType";

interface OrderContextProviderProps {
  children: ReactNode;
}

interface CalculateSubTotalProps {
  orderType: keyof OrderCountsType;
  orderCounts: OrderCountsType;
}

export const OrderContext = createContext<OrderContextType | null>(null);

export const OrderContextProvider = ({
  children,
}: OrderContextProviderProps) => {
  const [orderCounts, setOrderCounts] = useState<OrderCountsType>({
    products: new Map(),
    options: new Map(),
  });
  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  const pricePerItem = {
    products: 1000,
    options: 500,
  };

  const calculateSubTotal = ({
    orderType,
    orderCounts,
  }: CalculateSubTotalProps) => {
    let optionCount = 0;
    for (const count of orderCounts[orderType].values()) {
      optionCount += count;
    }

    return optionCount * pricePerItem[orderType];
  };

  useEffect(() => {
    const productsTotal = calculateSubTotal({
      orderType: "products",
      orderCounts,
    });
    const optionsTotal = calculateSubTotal({
      orderType: "options",
      orderCounts,
    });
    const total = productsTotal + optionsTotal;

    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    const updateItemCount = ({
      itemName,
      itemCount,
      orderType,
    }: UpdateItemCountProps) => {
      const newOrderCounts = { ...orderCounts };
      console.log(newOrderCounts);
      const ordercountsMap = newOrderCounts[orderType];
      console.log(ordercountsMap);
      ordercountsMap.set(itemName, itemCount);

      setOrderCounts(newOrderCounts);
    };

    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts, totals]);

  return (
    <OrderContext.Provider value={value as OrderContextType}>
      {children}
    </OrderContext.Provider>
  );
};
