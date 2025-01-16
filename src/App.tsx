import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Index } from "@/pages/Index";
import { Auth } from "@/pages/Auth";
import { RestaurantDashboard } from "@/components/layouts/RestaurantDashboard";
import { CustomerDashboard } from "@/components/layouts/CustomerDashboard";
import { MenuManagement } from "@/pages/MenuManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/dashboard" element={<RestaurantDashboard />}>
          <Route path="menu-management" element={<MenuManagement />} />
        </Route>
        <Route path="/customer/*" element={<CustomerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;