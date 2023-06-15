import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("user/get", async (thunkApi) => {
    const response = await axios.get("http://localhost:3001/users");
    const data = response.data[1];
    return data;
})

export const getProducts = createAsyncThunk("products/get", async (thunkApi) => {
    const response = await axios.get("http://localhost:3001/products");
    return response.data;
})