import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.post('/user', {
//   firstName: ,
//   lastName: ''
// })

const registerAPI = 'http://localhost:3000/user/register';

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (data) => {
    try {
      console.log('received in register user ', data);
      const response = axios
        .post(registerAPI, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          country: data.country,
          userType: data.userType,
          userPassword: data.password,
        })
        .then((res) => {
          // console.log(' acxios response ', res.status);
          // console.log('the data gotten ', res.data);
          if (res.status === 403) {
            // console.log(' for 403 ', res.response);
          }

          return res.data;
        })
        .catch((err) => {
          // console.log('error occured ', err.response.data);
          if (err.response.status === 403) {
            // console.log(' for 403 ', err.response.data.forbidden);
          }
        });
      // console.log('data after fetch ', response.data);
      return response.data;
    } catch (e) {
      isRejectedWithValue(e);
    }
  }
);

//////////////////

// const registerUser = createAsyncThunk();

const initialState = {
  value: 0,
  data: {},
  loading: false,
  isSussessful: false,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser, (state, action) => {
        // console.log(' reached add case ', action);
      })
      .addMatcher(registerUser.pending, (state, { payload }) => {
        // console.log('pending');
        // console.log('while pending ', payload);
        state.loading = true;
      })
      .addMatcher(registerUser.fulfilled, (state, { payload }) => {
        // console.log('success');
        state.loading = false;
        // console.log('data ', payload, 'data');
        state.data = payload;
        state.isSussessful = true;
      })
      .addMatcher(registerUser.rejected, (state, { payload }) => {
        // console.log('rejected');
        state.message = payload;
        state.loading = false;
        state.isSussessful = false;
      });
  },
});

// export const { getRegisteredInfo } = registerSlice.actions;

export default registerSlice.reducer;
