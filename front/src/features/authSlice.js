import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  sidebarShow: true,
  token: null,
};


export const LoginUser = createAsyncThunk('user/LoginUser', async (user, thunkAPI) => {
  try {
    const response = await axios.post('http://172.25.160.235:2402/login', {
      userEmail: user.userEmail,
      userPassword: user.userPassword,
    });

    const accessToken = response.data.accessToken;

    thunkAPI.dispatch(setToken(accessToken));
    localStorage.setItem('token', accessToken);
    Cookies.set('accessToken', accessToken, { expires: '15m' });
    console.log('Token:', accessToken);
    return accessToken;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

// getMe action
export const getMe = createAsyncThunk('user/getMe', async (_, thunkAPI) => {
  try {
  
    let token = localStorage.getItem('token');

    if (!token) {
      token = Cookies.get('accessToken');
    }

    if (!token) {
      throw new Error('Access token not found in storage');
    }

    const authHeader = `Bearer ${token}`;
    console.log('Auth Header:', authHeader);

    const response = await axios.get('http://172.25.160.235:2402/me', {
      headers: {
        Authorization: authHeader,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);

    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});


export const LogOut = createAsyncThunk("user/LogOut", async (_, thunkAPI) => {
  thunkAPI.dispatch(setToken(null));
  localStorage.removeItem("token");
  await axios.delete("http://172.25.160.235:2402/logout");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      return { accessToken: action.payload.accessToken };
    },

    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get User Login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset, toggleSidebar, setToken } = authSlice.actions;
export default authSlice.reducer;
