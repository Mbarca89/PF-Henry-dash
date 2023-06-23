import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('user/get', async (thunkApi) => {
  const response = await axios.get(
    'https://pf-henry-back-two.vercel.app/users'
  );

  console.log(response);

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
