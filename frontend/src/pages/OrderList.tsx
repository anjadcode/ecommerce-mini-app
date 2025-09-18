import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { 
  fetchOrdersStart, 
  fetchOrdersSuccess, 
  fetchOrdersFailure 
} from '../redux/slices/orderSlice';
import axios from 'axios';

const OrderList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch(fetchOrdersStart());
        // Menggunakan endpoint lokal backend untuk mengambil daftar pesanan
        const response = await axios.get('http://localhost:8000/orders/');
        dispatch(fetchOrdersSuccess(response.data));
      } catch (err) {
        dispatch(fetchOrdersFailure(err instanceof Error ? err.message : 'An error occurred'));
      }
    };

    fetchOrders();
  }, [dispatch]);

  if (loading) return (
    <div className="order-list-loading">
      <div className="spinner"></div>
      <p>Loading orders...</p>
    </div>
  );

  if (error) return (
    <div className="order-list-error">
      <p>Error: {error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  return (
    <div className="order-list-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <div className="order-list-empty">
          <p>No orders found</p>
          <p>Start shopping to place your first order!</p>
        </div>
      ) : (
        <div className="order-list-table-container">
          <table className="order-list-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="order-list-row">
                  <td className="order-id">#{order.id}</td>
                  <td className="order-total">${order.total.toFixed(2)}</td>
                  <td className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </td>
                  <td className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="order-items">
                    {order.items.map(item => (
                      <div key={item.id} className="order-item">
                        {item.name} (${item.price.toFixed(2)})
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
