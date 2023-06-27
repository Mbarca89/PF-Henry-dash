import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Products } from '../types';

export const getUser = createAsyncThunk('user/get', async (thunkApi) => {
  const response = await axios.get(
    'https://pf-henry-back-two.vercel.app/users'
  );

  console.log({responseGetProducts: response});

  const data = response.data[1];
  return data;
});

export const getProducts = createAsyncThunk(
  'products/get',
  async (userID: string, thunkApi) => {
    // const response = await axios.post(
    //   'https://pf-henry-back-two.vercel.app/products?page=2',
    //   {
    //     price: { isSorted: true, order: 'desc' },
    //     relevant: { isSorted: false, order: 'asc' },
    //   }
    // );

    const response = await axios.get(
      `https://pf-henry-back-two.vercel.app/products/${userID}`
    );

    return response.data;
  }
);

export const getProductByID = createAsyncThunk(
  'productByID/get',
  async (productID: string, thunkApi) => {
    // const response = await axios.post(
    //   'https://pf-henry-back-two.vercel.app/products?page=2',
    //   {
    //     price: { isSorted: true, order: 'desc' },
    //     relevant: { isSorted: false, order: 'asc' },
    //   }
    // );

    const response = await axios.get(
      `https://pf-henry-back-two.vercel.app/products/detail/${productID}`
    );

    return response.data;
  }
);

export const logicDeleteProductByID = createAsyncThunk(
  'productByID/delete',
  async (product: Products, thunkApi) => {
    // const response = await axios.post(
    //   'https://pf-henry-back-two.vercel.app/products?page=2',
    //   {
    //     price: { isSorted: true, order: 'desc' },
    //     relevant: { isSorted: false, order: 'asc' },
    //   }
    // );

    const response = await axios.put(
      `http://localhost:3001/products/changeactivation/${product.id}`,
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
    //   'https://pf-henry-back-two.vercel.app/products?page=2',
    //   {
    //     price: { isSorted: true, order: 'desc' },
    //     relevant: { isSorted: false, order: 'asc' },
    //   }
    // );

    const response = await axios.get(
      `http://localhost:3001/categories`,
    );
      console.log(response.data);
      
    return response.data;
  }
);


