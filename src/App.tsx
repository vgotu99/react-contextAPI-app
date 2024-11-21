import { Route, Routes } from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import SummaryPage from "./pages/SummaryPage";
import CompletePage from "./pages/CompletePage";

function App() {
  return (
    <div style={{ padding: "4rem" }}>
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/complete" element={<CompletePage />} />
      </Routes>
    </div>
  );
}

export default App;
