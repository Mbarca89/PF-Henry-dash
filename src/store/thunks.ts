import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Products, User } from '../types';
import {REACT_APP_SERVER_URL} from '../../config'

export const getUser = createAsyncThunk('user/get', async (thunkApi) => {
  const response = await axios.get(
    `${REACT_APP_SERVER_URL}/users`
  );

  console.log({ responseGetProducts: response });

  const data = response.data[1];
  return data;
});

export const getProducts = createAsyncThunk(
  'products/get',
  async (userID: string, thunkApi) => {
    // const response = await axios.post(
    //   '${REACT_APP_SERVER_URL}/products?page=2',
    //   {
    //     price: { isSorted: true, order: 'desc' },
    //     relevant: { isSorted: false, order: 'asc' },
    //   }
    // );

    const response = await axios.get(
      `${REACT_APP_SERVER_URL}/products/${userID}`
    );

    return response.data;
  }
);

export const getAllProducts = createAsyncThunk(
  'allProducts/get',
  async (thunkApi) => {
   
    const response = await axios.get(
      `${REACT_APP_SERVER_URL}/products/all`
    );
    return response.data;
  }
);

export const getProductByID = createAsyncThunk(
  'productByID/get',
  async (productID: string, thunkApi) => {
    // const response = await axios.post(
    //   '${REACT_APP_SERVER_URL}/products?page=2',
    //   {
    //     price: { isSorted: true, order: 'desc' },
    //     relevant: { isSorted: false, order: 'asc' },
    //   }
    // );

    const response = await axios.get(
      `${REACT_APP_SERVER_URL}/products/detail/${productID}`
    );

    return response.data;
  }
);

export const logicDeleteProductByID = createAsyncThunk(
  'productByID/delete',
  async (product: Products, thunkApi) => {
    // const response = await axios.post(
    //   '${REACT_APP_SERVER_URL}/products?page=2',
    //   {
    //     price: { isSorted: true, order: 'desc' },
    //     relevant: { isSorted: false, order: 'asc' },
    //   }
    // );

    const response = await axios.put(
      `${REACT_APP_SERVER_URL}/products/changeactivation/${product.id}`,
      {
        isActive: product.isActive ? false : true
      }
    );

    return response.data;
  }
);

export const getAllCategories = createAsyncThunk(
  'categories/get',
  async (thunkApi) => {
    // const response = await axios.post(
    //   '${REACT_APP_SERVER_URL}/products?page=2',
    //   {
    //     price: { isSorted: true, order: 'desc' },
    //     relevant: { isSorted: false, order: 'asc' },
    //   }
    // );

    const response = await axios.get(
      `${REACT_APP_SERVER_URL}/categories`,
    );
    return response.data;
  }
);

export const getUsers = createAsyncThunk('users/get', async (thunkApi) => {
  const response = await axios.get(
    `${REACT_APP_SERVER_URL}/users`
  );

  console.log({ responseGetProducts: response });

  const data = response.data
  return data;
});

export const changeUserActivation = createAsyncThunk(
  'users/update',
  async (user: User, thunkApi) => {
    const response = await axios.put(
      `${REACT_APP_SERVER_URL}/users/changeactivation/${user.id}`,
      {
        active: user.active ? false : true
      }
    );
    return response.data;
  }
);


