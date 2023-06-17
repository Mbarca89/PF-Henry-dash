import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

export interface modelState {
  postProductModalisActive: boolean;
  postAddOtherProductModalisActive: boolean;
  toastModal: {
    isActive: boolean;
    message: string;
    type: string;
  };
}

const initialState: modelState = {
  postProductModalisActive: false,
  postAddOtherProductModalisActive: false,
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
    activePostAddOtherModal: (state) => {
      state.postAddOtherProductModalisActive = true;
    },
    hiddenPostAddOtherModal: (state) => {
      state.postAddOtherProductModalisActive = false;
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
  activePostAddOtherModal,
  hiddenPostAddOtherModal,
  hiddenPostProductModal,
  activeToast,
  clearStateToast,
} = modalSlice.actions;

export default modalSlice.reducer;
