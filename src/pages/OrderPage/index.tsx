import { useContext } from "react";
import Type from "../../components/Type";

import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../context/OrderContext";
import { OrderContextType } from "../../types/ItemsType";

const OrderPage = () => {
  const [orderData] = useContext(OrderContext) as OrderContextType;
  const nav = useNavigate();

  return (
    <div>
      <h1>Travel Products</h1>
      <div>
        <Type orderType="products" />
      </div>
      <div style={{ display: "flex", marginTop: "20" }}>
        <div style={{ width: "50%" }}>
          <Type orderType="options" />
        </div>
        <div style={{ width: "50%" }}>
          <h2>TotalPrice: {orderData.totals.total}</h2>
          <button onClick={() => nav("/summary")}>Order</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
