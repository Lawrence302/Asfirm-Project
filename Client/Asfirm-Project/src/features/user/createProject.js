import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const accessToken = JSON.parse(localStorage.getItem('info')).accessToken; // getting the token from storage
const id = JSON.parse(localStorage.getItem('info')).id; // getting id from storage

const API = `http://localhost:3000/${id}/project`;

export const createProject = createAsyncThunk(
  'user/createProject',
  async (data) => {
    // console.log(' plan url got to thunk ', data);
    try {
      const response = axios
        .post(API, {
          title: data.title,
          description: data.discription,
          category: data.domain,
        })
        .then((res) => {
          console.log(res.status, res.data);
          return res.data;
        })
        .catch((e) => {
          // console.log(' error occured ', e.response.data);
        });

      return response;
    } catch (e) {
      console.log(e);
    }
  }
);

const initialState = {
  success: false,
  data: {},
  isRejected: false,
  isLoading: false,
};

export const createProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createProject, (state, action) => {
        // console.log('reached the login case ', action.payload);
      })
      .addMatcher(createProject.pending, (state, action) => {
        // console.log('login pending');
        state.isLoading = true;
      })
      .addMatcher(createProject.fulfilled, (state, action) => {
        // console.log('fulfilled action login ', action);
        state.isLoading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addMatcher(createProject.rejected, (state, action) => {
        // console.log('login request rejected ', action.payload);
        state.isLoading = false;
        // state.success = false;
      });
  },
});

export default createProjectSlice.reducer;
