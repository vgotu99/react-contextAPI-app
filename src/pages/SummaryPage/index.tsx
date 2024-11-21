import React, { useContext, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import { OrderContextType } from "../../types/ItemsType";
import { useNavigate } from "react-router-dom";

const SummaryPage = () => {
  const [checked, setChecked] = useState(false);
  const [orderDetails] = useContext(OrderContext) as OrderContextType;
  const nav = useNavigate()

  const productsArr = Array.from(orderDetails.products);
  const optionsArr = Array.from(orderDetails.options.keys());

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    nav('/complete')
  }

  return (
    <div>
      <h1>Order Confirm</h1>
      <h2>Total Price: {orderDetails.totals.products}</h2>
      <ul style={{paddingLeft: '1rem'}}>
        {productsArr.map(([key, value]) => (
          <li style={{ listStyleType: "none" }} key={key}>
            - {key} {value}
          </li>
        ))}
      </ul>
      <ul style={{paddingLeft: '1rem'}}>
        {optionsArr &&
          optionsArr.map((key) => (
            <li style={{ listStyleType: "none" }} key={key}>
              - {key}
            </li>
          ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          type="checkbox"
          id="confirm-checkbox"
        />{" "}
        <label htmlFor="confirm-checkbox">
          Are you sure to confirm your order?
        </label>
        <br />
        <button disabled={!checked || orderDetails.totals.total === 0} type="submit">
          confirm
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
