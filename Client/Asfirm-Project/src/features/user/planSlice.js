import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const accessToken = JSON.parse(localStorage.info).accessToken; // getting the token from storage
const id = JSON.parse(localStorage.info).id; // getting id from storage
const API = 'http://localhost:3000/63827a899818c1c77e294d62/uploadPlanFile';

export const uploadPlan = createAsyncThunk('plan/uploadPlan', async (data) => {
  // console.log('before calling axios in play slice ', data);
  const response = await axios
    .patch(API, { plan: data })
    .then((res) => {
      // console.log('in res upload ', res.data);
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
  return response;
});

const initialState = {
  isLoading: false,
  isSuccessfull: false,
  data: '',
};

export const uploadPlanSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadPlan, (state, action) => {
        // console.log('here now in plan ', action.payload);
      })
      .addMatcher(uploadPlan.pending, (state, action) => {
        state.isLoading = true;
      })
      .addMatcher(uploadPlan.fulfilled, (state, action) => {
        // console.log('it succeded to upload plah ', action.payload, ' his link');
        state.isLoading = false;
        state.data = action.payload;
        state.isSuccessfull = true;
      })
      .addMatcher(uploadPlan.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default uploadPlanSlice.reducer;
