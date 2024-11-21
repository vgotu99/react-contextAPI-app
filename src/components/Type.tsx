import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Products from "./Products";
import Options from "./Options";
import {
  ProductsType,
  OptionsType,
  OrderCountsType,
  OrderContextType,
} from "../types/ItemsType";
import ErrorBanner from "./ErrorBanner";
import { OrderContext } from "../context/OrderContext";

interface TypeProps {
  orderType: keyof OrderCountsType;
}

const Type = ({ orderType }: TypeProps) => {
  const [items, setItems] = useState<ProductsType[] | OptionsType[]>([]);
  const [error, setError] = useState(false);
  const [orderData, updateItemCount] = useContext(
    OrderContext
  ) as OrderContextType;

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType: string) => {
    try {
      const res = await axios.get(`http://localhost:4000/${orderType}`);
      setItems(res.data);
    } catch {
      setError(true);
    }
  };

  const ItemComponent = orderType === "products" ? Products : Options;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={(item as ProductsType).imagePath}
      updateItemCount={(itemName: string, itemCount: number) =>
        updateItemCount({
          itemName,
          itemCount,
          orderType,
        })
      }
    />
  ));

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  return (
    <div>
      <h2>{orderType}</h2>
      <p>Each {orderType} Price: {orderType === 'products' ? '1000' : '500'}</p>
      <p>Total {orderType} Price: {orderData.totals[orderType]}</p>
      <div
        style={{
          display: "flex",
          flexDirection: orderType === "products" ? "row" : "column",
        }}
      >
        {optionItems}
      </div>
    </div>
  );
};

export default Type;
