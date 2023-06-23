import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

export interface modelState {
  postProductModalisActive: boolean;
  valuesPostModalProducts: {
    name: string,
    category?: string,
    freeShipping: boolean,
    description: string,
    price: number,
    stock: number,
}
  toastModal: {
    isActive: boolean;
    message: string;
    type: string;
  };
}

const initialState: modelState = {
  postProductModalisActive: false,
  valuesPostModalProducts: {
    name: "",
    category:"",
    freeShipping:false,
    description:'',
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
  activeToast,
  clearStateToast,
} = modalSlice.actions;

export default modalSlice.reducer;
