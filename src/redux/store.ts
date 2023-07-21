import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import authReducer from './features/user/authSlice';
import useReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: useReducer,
    auth: authReducer,

    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

