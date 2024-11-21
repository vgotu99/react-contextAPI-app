import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { OrderContextProvider } from "./context/OrderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <OrderContextProvider>
      <App />
    </OrderContextProvider>
  </BrowserRouter>
);
