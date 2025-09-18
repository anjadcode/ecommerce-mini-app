import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { 
  fetchProductsStart, 
  fetchProductsSuccess, 
  fetchProductsFailure,
  addToCart 
} from '../redux/slices/productSlice';
import axios from 'axios';

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items: products, loading, error, cart } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(fetchProductsStart());
        // Menggunakan endpoint lokal backend
        const response = await axios.get('http://localhost:8000/products/');
        dispatch(fetchProductsSuccess(response.data));
      } catch (err) {
        dispatch(fetchProductsFailure(err instanceof Error ? err.message : 'An error occurred'));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list">
      <h2>Our Products</h2>
      <div className="cart-summary">
        Cart: {cart.length} item(s)
      </div>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button 
              onClick={() => handleAddToCart(product)}
              disabled={cart.some(item => item.id === product.id)}
            >
              {cart.some(item => item.id === product.id) ? 'In Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
