import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { store } from './redux/store';
import ProductList from './pages/ProductList';
import Checkout from './pages/Checkout';
import OrderList from './pages/OrderList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li><Link to="/">Products</Link></li>
              <li><Link to="/checkout">Checkout</Link></li>
              <li><Link to="/orders">Orders</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderList />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
