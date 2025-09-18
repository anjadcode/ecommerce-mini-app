import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductState {
  items: Product[];  // Semua produk
  cart: Product[];   // Produk di keranjang
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  cart: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Menambahkan produk ke keranjang
    addToCart: (state, action: PayloadAction<Product>) => {
      // Cek apakah produk sudah ada di keranjang
      const existingProduct = state.cart.find(item => item.id === action.payload.id);
      
      if (!existingProduct) {
        // Jika belum ada, tambahkan produk ke keranjang
        state.cart.push(action.payload);
      }
    },
    // Menghapus produk dari keranjang
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    // Mengosongkan keranjang
    clearCart: (state) => {
      state.cart = [];
    }
  },
});

export const { 
  fetchProductsStart, 
  fetchProductsSuccess, 
  fetchProductsFailure,
  addToCart,
  removeFromCart,
  clearCart
} = productSlice.actions;

export default productSlice.reducer;
