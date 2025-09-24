import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { store } from './redux/store';
import ProductList from './pages/ProductList';
import Checkout from './pages/Checkout';
import OrderList from './pages/OrderList';
import './App.css';

// Komponen Navbar dengan cart counter
const Navbar: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.products);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          E-Commerce Mini
        </Link>
        
        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/checkout" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              Checkout 
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/orders" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<OrderList />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
