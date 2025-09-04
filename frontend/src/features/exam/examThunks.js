import { createAsyncThunk } from "@reduxjs/toolkit";
import examService from "./examService";

export const getExamQuestions = createAsyncThunk(
  "exam/getQuestions",
  async (_, thunkAPI) => {
    try {
      return await examService.fetchQuestionsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch questions"
      );
    }
  }
);

export const submitExamAPI = createAsyncThunk(
  "exam/submit",
  async ({ userId, answers }, thunkAPI) => {
    try {
      return await examService.submitExamAPI({ userId, answers });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to submit exam"
      );
    }
  }
);
