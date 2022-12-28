import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  projects: [],
};

export const userInfoSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      state.data = action.payload;
    },
    getUserProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { getUserInfo, getUserProjects } = userInfoSlice.actions;

export default userInfoSlice.reducer;
