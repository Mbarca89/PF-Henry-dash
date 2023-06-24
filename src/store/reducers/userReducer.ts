import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Products, User } from '../../types';
import { getProducts, getUser } from '../thunks';
import { formValues } from '../../pages/Form/FormPostProduct';

type userState = {
  userData: User;
  products: Products[];
  session: boolean
  // customers: Customers[]
};

const initialState: userState = {
  userData: {
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    province: '',
    postalCode: 0,
    phone: "",
    commerceName: "",
    purchasedProducts: [],
    role: '',
    cart: '',
    id: '',
  },
  products: [
    {
      name: '',
      price: 0,
      description: '',
      stock: 0,
      hasDiscount: true,
      discount: 0,
      photos: [
        {
          url: '',
          public_id: '',
        },
      ],
      freeShipping: true,
      sales: 0,
      rating: 0,
      id: '',
    },
  ],
  session: false
  // customers: [],
};

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<boolean>) => {
      state.session = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      console.log(action.payload);
      if(action.payload?.id){
        console.log("entre");
        
        state.userData = action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userData = action.payload;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = [...action.payload];
    });

    // builder.addCase(postProduct.fulfilled, (state, action: PayloadAction<formValues>) => {
    //   state.products = [...action.payload];
    // });

    // TODO: create Product
  },
});

export const { setSession, setCurrentUser } = counterSlice.actions;

export default counterSlice.reducer;
