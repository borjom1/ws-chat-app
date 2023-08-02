import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import env from 'react-dotenv';


const buildPayloadCreator = (path) => {
  return createAsyncThunk(
    path,
    async (credentials, {rejectWithValue}) => {
      try {
        const response = await axios.post(`${env.API_URL}${path}`, credentials);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response);
      }
    }
  );
};

export const register = buildPayloadCreator('/auth/register');
export const login = buildPayloadCreator('/auth/login');

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    isLoading: false,
    error: null
  },
  reducers: {
    clearState(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.data = null;
      state.isLoading = true;
      state.error = null;
    },
    [register.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [register.rejected]: (state, action) => {
      state.data = null;
      state.isLoading = false;
      state.error = action.payload;
    },

    [login.pending]: (state) => {
      state.data = null;
      state.isLoading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [login.rejected]: (state, action) => {
      state.data = null;
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {clearState} = authSlice.actions;

export default authSlice.reducer;