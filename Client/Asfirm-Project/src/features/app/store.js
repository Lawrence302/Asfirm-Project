import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../user/loginSlice';
import registerReducer from '../user/registerSlice';
import createProjectReducer from '../user/createProject';
import uploadPlanSliceReducer from '../user/planSlice';
import checkAuthStatusReducer from '../user/authenticatedSlice';
import userInfoReducer from '../user/userInfoSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    createProject: createProjectReducer,
    plan: uploadPlanSliceReducer,
    authCheck: checkAuthStatusReducer,
    userData: userInfoReducer,
  },
});
