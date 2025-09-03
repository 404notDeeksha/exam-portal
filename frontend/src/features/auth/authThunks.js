// Async logic separated from slice.

import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.loginAPI(userData);
    } catch (error) {
      return rejectWithValue(error); // message from axios interceptor
    }
  }
);
