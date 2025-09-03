// Async logic separated from slice.

import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.registerAPI(userData);
    } catch (error) {
      return rejectWithValue(error); // message from axios interceptor
    }
  }
);
