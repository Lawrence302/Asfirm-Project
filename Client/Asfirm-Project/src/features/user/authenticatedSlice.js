import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useState } from 'react';

// const accessToken = JSON.parse(localStorage.info).accessToken; // getting the token from storage
// const id = JSON.parse(localStorage.info).id; // getting id from storage

// const API = `http://localhost:3000/${id}/signedIn`;
// 'http://localhost:3000/user/login';

const initialState = {
  active: false,
  userData: {},
  checking: false,
  subscribed: false,
};

export const checkAuthStatus = createSlice({
  name: 'authCheck',
  initialState,
  reducers: {
    authStatus: (state, action) => {
      state.active = action.payload;

      // console.log('auth status her in ssd is ', action.payload);
    },
    getUserData: (state, action) => {
      state.userData = action.payload;
    },
    subscribed: (state, action) => {
      state.subscribed = action.payload;
    },
  },
});

export const { authStatus, getUserData, subscribed } = checkAuthStatus.actions;

export default checkAuthStatus.reducer;
