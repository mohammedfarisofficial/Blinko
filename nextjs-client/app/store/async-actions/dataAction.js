import axios from "axios";
const { createAsyncThunk } = require("@reduxjs/toolkit");

import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_FULFILLED,
} from "@/app/contants/http-status";

export const createUniversity = createAsyncThunk(
  "createUniversity",
  async (data, { rejectWithValue }) => {
    try {
      const { uploadData, pageType } = data;
      const response = await axios.post(`/api/${pageType}`, uploadData);
      if (response.status === HTTP_STATUS_FULFILLED) {
        return response.data;
      }
      if (response.status === HTTP_STATUS_BAD_REQUEST) {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createCourse = createAsyncThunk(
  "createCourse",
  async (data, { rejectWithValue }) => {
    try {
      const { uploadData, pageType } = data;
      const response = await axios.post(`/api/${pageType}`, uploadData);
      if (response.status === HTTP_STATUS_FULFILLED) {
        return response.data;
      }
      if (response.status === HTTP_STATUS_BAD_REQUEST) {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createStream = createAsyncThunk(
  "createStream",
  async (data, { rejectWithValue }) => {
    try {
      const { uploadData, pageType } = data;
      const response = await axios.post(`/api/${pageType}`, uploadData);
      console.log("response",response)
      if (response.status === HTTP_STATUS_FULFILLED) {
        return response.data;
      }
      if (response.status === HTTP_STATUS_BAD_REQUEST) {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message);
    }
  }
);
export const createSemester = createAsyncThunk(
  "createSemester",
  async (data, { rejectWithValue }) => {
    try {
      const { uploadData, pageType } = data;
      const response = await axios.post(`/api/${pageType}`, uploadData);
      console.log("response",response)
      if (response.status === HTTP_STATUS_FULFILLED) {
        return response.data;
      }
      if (response.status === HTTP_STATUS_BAD_REQUEST) {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message);
    }
  }
);
export const createSubject = createAsyncThunk(
  "createSubject",
  async (data, { rejectWithValue }) => {
    try {
      const { uploadData, pageType } = data;
      const response = await axios.post(`/api/${pageType}`, uploadData);
      console.log("response",response)
      if (response.status === HTTP_STATUS_FULFILLED) {
        return response.data;
      }
      if (response.status === HTTP_STATUS_BAD_REQUEST) {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message);
    }
  }
);
