import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { DeliveryProvider } from "./context/DeliveryContext";
import { PaymentProvider } from "./context/PaymentContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Header from "./components/Layout/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage/OrderConfirmationPage";
import UserPage from "./pages/UserPage/UserPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Footer from "./components/Layout/Footer/Footer";

function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <DeliveryProvider>
          <CartProvider>
            <Router>
              <div className="app-container">
                <Header />
                <div className="routes-wrapper">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route
                      path="/order-confirmation"
                      element={<OrderConfirmationPage />}
                    />
                    <Route
                      path="/user"
                      element={
                        <ProtectedRoute>
                          <UserPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </Router>
          </CartProvider>
        </DeliveryProvider>
      </PaymentProvider>
    </AuthProvider>
  );
}

export default App;
