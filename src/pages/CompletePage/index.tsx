import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import axios from "axios";
import { OrderContextType } from "../../types/ItemsType";
import { useNavigate } from "react-router-dom";

type OrderDataType = OrderContextType[0];

interface OrderHistoryType {
  orderNumber: number;
  price: number;
}

const CompletePage = () => {
  const [orderData] = useContext(OrderContext) as OrderContextType;
  const [orderHistory, setOrderHistory] = useState<OrderHistoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  console.log(orderHistory);

  useEffect(() => {
    orderCompleted(orderData);
  }, [orderData]);

  const orderCompleted = async (orderData: OrderDataType) => {
    try {
      const res = await axios.post<OrderHistoryType[]>(
        "http://localhost:4000/order",
        orderData
      );
      setOrderHistory(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>...loading</div>;
  }

  return (
    <div style={{ }}>
      <h2>Your order has been successfully placed.</h2>
      <h3>Order History</h3>
      <table>
        <tbody>
        <tr>
          <td>orderNumber</td>
          <td>price</td>
        </tr>
          {orderHistory.map((item) => (
              <tr>
                <th>{item.orderNumber}</th>
                <th>{item.price}</th>
              </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={() => nav("/")}>Back to Main</button>
    </div>
  );
};

export default CompletePage;
