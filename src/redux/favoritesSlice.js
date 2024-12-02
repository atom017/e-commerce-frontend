import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],  // Array of favorite items
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const item = action.payload;

      if (!state.items.some(favItem => favItem._id === item._id)) {
        state.items.push(item);
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

