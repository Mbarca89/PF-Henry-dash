import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Categorie, Products, User, Users } from '../../types';
import { getAllCategories, getProductByID, getProducts, getUser, logicDeleteProductByID, getUsers, getAllProducts } from '../thunks';

type userState = {
  userData: User;
  products: Products[];
  users: Users;
  session: boolean;
  currentProductbyID: Products;
  currentProductID: string
  categories: Categorie[]
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
    phone: '',
    commerceName: '',
    purchasedProducts: [],
    role: '',
    cart: '',
    id: '',
    active: false,
    banned: false
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
      category: '',
      freeShipping: true,
      sales: 0,
      rating: 0,
      reviews: [],
      seller: {id:'',name:''},
      isActive: true,
      id: '',
      ratingAverage: 0
    },
  ],
  users:[],
  session: false,
  currentProductbyID: {
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
    category: '',
    freeShipping: true,
    sales: 0,
    rating: 0,
    reviews: [],
    seller: {id:'',name:''},
    isActive: true,
    id: '',
    ratingAverage: 0
  },
  currentProductID: "",
  categories: []
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
      if (action.payload?.id) {
        state.userData = action.payload;
      }
    },
    setCurrentProductID: (state, action: PayloadAction<string>) => {
      state.currentProductID = action.payload
    },
    clearCurrentProductID: (state) => {
      state.currentProductID = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userData = action.payload;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      if(action.payload.length !== 0){
        state.products = action.payload;
      }  
    });

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      if(action.payload.length !== 0){
        state.products = action.payload;
      }  
    });

    builder.addCase(getProductByID.fulfilled, (state, action) => {
      state.currentProductbyID = action.payload;
    });

    builder.addCase(logicDeleteProductByID.fulfilled, (state, action) => {
      state.products = state.products;
    });

    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = [...action.payload];
    });

    // builder.addCase(postProduct.fulfilled, (state, action: PayloadAction<formValues>) => {
    //   state.products = [...action.payload];
    // });

    // TODO: create Product
  },
});

export const { setSession, setCurrentUser, setCurrentProductID, clearCurrentProductID } = counterSlice.actions;

export default counterSlice.reducer;
