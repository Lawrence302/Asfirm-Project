import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:3000/user/login';

export const loginUser = createAsyncThunk('user/loginUser', async (data) => {
  try {
    const response = axios
      .post(API, {
        email: data.email,
        userPassword: data.password,
      })
      .then((res) => {
        // console.log(res.status, res.data);
        localStorage.clear();
        // storing data in localStorage
        localStorage.setItem('info', JSON.stringify(res.data));
        localStorage.setItem('userId', JSON.stringify({ id: res.data.id }));

        return res.data;
      })
      .catch((e) => {
        console.log(' error occured ', e.response.data);
      });

    return response;
  } catch (e) {
    console.log(e);
  }
});

const initialState = {
  isLoading: false,
  data: {},
  success: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser, (state, action) => {
        // console.log('reached the login case ', action.payload);
      })
      .addMatcher(loginUser.pending, (state, action) => {
        // console.log('login pending');
        state.isLoading = true;
      })
      .addMatcher(loginUser.fulfilled, (state, action) => {
        // console.log('fulfilled action login ', action);
        state.isLoading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addMatcher(loginUser.rejected, (state, action) => {
        // console.log('login request rejected ', action.payload);
        state.isLoading = false;
        // state.success = false;
      });
  },
});

// export const { userLogin } = loginSlice.actions;

export default loginSlice.reducer;
