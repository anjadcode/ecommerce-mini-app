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

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="order-list">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table>
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
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {order.items.map(item => (
                    <div key={item.id}>{item.name}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
