import axios from "axios";
const { createAsyncThunk } = require("@reduxjs/toolkit");

export const createUniversity = createAsyncThunk(
  "createUniversity",
  async (data, { rejectWithValue }) => {
    try {
      const { uploadData, pageType } = data;
      const response = await axios.post(`/api/${pageType}`, uploadData);
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
