import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Profile from './pages/Profile';
import AdminDashboard from './Admin/AdminDashboard';
import AdminOrder from './Admin/AdminOrder';
import AdminUsers from './Admin/AdminUsers';
import AdminProducts from './Admin/AdminProducts';
import AdminAddProduct from './Admin/AdminAddProduct';
function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/success" element={<Success />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/adminOrders" element={<AdminOrder />} />
          <Route path="/adminUsers" element={<AdminUsers />} />
          <Route path="/adminProducts" element={<AdminProducts />} />
          <Route path="/addProduct" element={<AdminAddProduct />} />

          <Route path="*" element={<h1>404 Not Found</h1>} /> 
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;