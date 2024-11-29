import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import favoritesReducer from './favoritesSlice';  // Import favorites reducer

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    favorites: favoritesReducer,  
  },
});

export default store;
