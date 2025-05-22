import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { DeliveryProvider } from "./context/DeliveryContext";
import { PaymentProvider } from "./context/PaymentContext";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage/OrderConfirmationPage";

function App() {
  return (
    <PaymentProvider>
      <DeliveryProvider>
        <CartProvider>
          <Router>
            <div className="app-container">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="/user-profile" element={<h1>User-Profile</h1>} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </DeliveryProvider>
    </PaymentProvider>
  );
}

export default App;
