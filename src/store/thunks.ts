import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Products, User } from '../types';

export const getUser = createAsyncThunk('user/get', async (thunkApi) => {
  const response = await axios.get('http://localhost:3000/users');

  console.log({ responseGetProducts: response });

  const data = response.data[1];
  return data;
});

export const getProducts = createAsyncThunk(
  'products/get',
  async (userID: string, thunkApi) => {
    // const response = await axios.post(
    //   'http://localhost:3000/products?page=2',
    //   {
    //     price: { isSorted: true, order: 'desc' },
    //     relevant: { isSorted: false, order: 'asc' },
    //   }
    // );

    const response = await axios.get(
      `http://localhost:3000/products/${userID}`
    );

    return response.data;
  }
);

export const getAllProducts = createAsyncThunk(
  'allProducts/get',
  async (thunkApi) => {
    const response = await axios.get(`http://localhost:3001/products/all`);
    return response.data;
  }
);

export const getProductByID = createAsyncThunk(
  'productByID/get',
  async (productID: string, thunkApi) => {
    // const response = await axios.post(
    //   'http://localhost:3000/products?page=2',
    //   {
    //     price: { isSorted: true, order: 'desc' },
    //     relevant: { isSorted: false, order: 'asc' },
    //   }
    // );

    const response = await axios.get(
      `http://localhost:3000/products/detail/${productID}`
    );

    return response.data;
  }
);

export const logicDeleteProductByID = createAsyncThunk(
  'productByID/delete',
  async (product: Products, thunkApi) => {
    // const response = await axios.post(
    //   'http://localhost:3000/products?page=2',
    //   {
    //     price: { isSorted: true, order: 'desc' },
    //     relevant: { isSorted: false, order: 'asc' },
    //   }
    // );

    const response = await axios.put(
      `http://localhost:3001/products/changeactivation/${product.id}`,
      {
        isActive: product.isActive ? false : true,
      }
    );

    return response.data;
  }
);

export const getAllCategories = createAsyncThunk(
  'categories/get',
  async (thunkApi) => {
    // const response = await axios.post(
    //   'http://localhost:3000/products?page=2',
    //   {
    //     price: { isSorted: true, order: 'desc' },
    //     relevant: { isSorted: false, order: 'asc' },
    //   }
    // );

    const response = await axios.get(`http://localhost:3001/categories`);
    return response.data;
  }
);

export const getUsers = createAsyncThunk('users/get', async (thunkApi) => {
  const response = await axios.get('http://localhost:3000/users');

  console.log({ responseGetProducts: response });

  const data = response.data;
  return data;
});

export const changeUserActivation = createAsyncThunk(
  'users/update',
  async (user: User, thunkApi) => {
    const response = await axios.put(
      `http://localhost:3001/users/changeactivation/${user.id}`,
      {
        active: user.active ? false : true,
      }
    );
    return response.data;
  }
);

export const getCategories = createAsyncThunk(
  'categories/get',
  async (_, thunkApi) => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      /*  console.log(response.data); // Log the API response data */

      return response.data;
    } catch (error) {
      // Handle error case
      console.error(error);
      throw error;
    }
  }
);
