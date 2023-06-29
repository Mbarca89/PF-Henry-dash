import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
  categoryName: string;
  products: {
    _id: string;
  }[];
  photos: {
    url: string;
    public_id: string;
  }[];
  id: string;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      /*   console.log('fetchCategoriesSuccess:', action.payload); // Add this console log statement */
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
