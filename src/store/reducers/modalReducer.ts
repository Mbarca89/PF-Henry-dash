import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

export type valuesUpdateProduct = {
  name: string;
  category: string;
  freeShipping: boolean;
  description: string;
  price: number;
  stock: number;
};

export interface modelState {
  postProductModalisActive: boolean;
  updateProductModal: {
    isActive: boolean;
    values: valuesUpdateProduct;
  };
  valuesPostModalProducts: {
    name?: string;
    category?: string;
    freeShipping?: boolean;
    description?: string;
    price?: number;
    stock?: number;
  };
  toastModal: {
    isActive: boolean;
    message: string;
    type: string;
  };
}

const initialState: modelState = {
  postProductModalisActive: false,
  updateProductModal: {
    isActive: false,
    values: {
      name: '',
      category: '',
      freeShipping: false,
      description: '',
      price: 0,
      stock: 0,
    },
  },
  valuesPostModalProducts: {
    name: '',
    category: '',
    freeShipping: false,
    description: '',
    price: 0,
    stock: 1,
  },
  toastModal: {
    isActive: false,
    message: '',
    type: '',
  },
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    activePostProductModal: (state) => {
      state.postProductModalisActive = true;
    },
    hiddenPostProductModal: (state) => {
      state.postProductModalisActive = false;
    },
    activeUpdateProductModal: (
      state,
      action: PayloadAction<{ isActive: boolean; values?: valuesUpdateProduct }>
    ) => {
      state.updateProductModal.isActive = action.payload.isActive;
      if (action.payload.values) {
        state.updateProductModal.values = action.payload?.values;
      }
    },
    hiddenUpdateProductModal: (state) => {
      state.updateProductModal.isActive = false;
      state.updateProductModal.values = {
        name: '',
        category: '',
        freeShipping: false,
        description: '',
        price: 0,
        stock: 0,
      };
    },
    activeToast: (
      state,
      action: PayloadAction<{ isOk: boolean; message: string }>
    ) => {
      state.toastModal.isActive = true;
      state.toastModal.message = action.payload.message;
      if (action.payload.isOk) {
        state.toastModal.type = 'success';
      } else {
        state.toastModal.type = 'error';
      }
    },
    clearStateToast: (state) => {
      state.toastModal.isActive = false;
      state.toastModal.message = '';
      state.toastModal.type = '';
    },
  },
});

export const {
  activePostProductModal,
  hiddenPostProductModal,
  activeUpdateProductModal,
  hiddenUpdateProductModal,
  activeToast,
  clearStateToast,
} = modalSlice.actions;

export default modalSlice.reducer;
