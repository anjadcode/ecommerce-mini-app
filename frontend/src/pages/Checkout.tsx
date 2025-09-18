import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { 
  createOrderStart, 
  createOrderSuccess, 
  createOrderFailure 
} from '../redux/slices/orderSlice';
import { 
  clearCart,
  removeFromCart 
} from '../redux/slices/productSlice';
import axios from 'axios';

const Checkout: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { cart: products } = useSelector((state: RootState) => state.products);
  const { currentOrder, loading, error } = useSelector((state: RootState) => state.orders);

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      dispatch(createOrderStart());
      
      // Pastikan data sesuai dengan skema backend
      const orderData = {
        items: products.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price
        })),
        total: calculateTotal(),
        customerName,
        customerEmail,
        status: 'pending'
      };

      // Menggunakan endpoint lokal backend untuk membuat pesanan
      const response = await axios.post('http://localhost:8000/orders/', orderData);

      dispatch(createOrderSuccess(response.data));
      
      // Kosongkan keranjang setelah checkout berhasil
      dispatch(clearCart());
    } catch (err) {
      console.error('Checkout error:', err);
      dispatch(createOrderFailure(err instanceof Error ? err.message : 'Checkout failed'));
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {products.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <form onSubmit={handleCheckout}>
          <div>
            <label>Name:</label>
            <input 
              type="text" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required 
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required 
            />
          </div>
          <h3>Order Summary</h3>
          {products.map(product => (
            <div key={product.id} className="cart-item">
              <p>{product.name} - ${product.price}</p>
              <button 
                type="button" 
                onClick={() => handleRemoveItem(product.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <p>Total: ${calculateTotal()}</p>
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Complete Order'}
          </button>
          {error && <p style={{color: 'red'}}>{error}</p>}
          {currentOrder && <p>Order Successful! Order ID: {currentOrder.id}</p>}
        </form>
      )}
    </div>
  );
};

export default Checkout;
