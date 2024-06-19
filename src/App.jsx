// import './App.css'
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUP from "./pages/SignUp";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard/Dashboard";
import Cart from "./pages/buyer/cart/Cart";
import Orders from "./pages/buyer/orders/Orders";
import Customers from "./pages/seller/customers/Customers";
import Home from "./pages/common/home/Home";
import SellerAnalytics from "./pages/seller/analytics/SellerAnalytics";


function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/home" element={<Home />} />
            <Route path="/my-customers" element={<Customers />} />
            <Route path="/seller-analytics" element={<SellerAnalytics />} />

          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUP />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
