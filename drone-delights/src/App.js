import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<h1>Register</h1>} />
          <Route path="/menu" element={<h1>Menu</h1>} />
          <Route path="/basket" element={<h1>Basket</h1>} />
          <Route path="/checkout" element={<h1>Checkout</h1>} />
          <Route path="/user-profile" element={<h1>User-Profile</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
