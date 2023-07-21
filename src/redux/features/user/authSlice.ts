// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  accessToken: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { accessToken: null } as IAuthState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = authSlice.actions;

export default authSlice.reducer;
