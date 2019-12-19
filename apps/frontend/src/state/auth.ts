import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'state/interfaces';
import { persistLogin, getAuth, clearAuth } from 'helpers/auth';

type CurrentAuthState = {
  authenticated: boolean;
  user: User | null;
};

type AuthPayload = {
  token: string;
  user: User;
};

const initialState: CurrentAuthState = getAuth();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthPayload>) {
      const { token, user } = action.payload;
      state.user = user;
      state.authenticated = true;
      persistLogin(state.authenticated, state.user, token);
    },
    logout(state) {
      state.user = null;
      state.authenticated = false;
      clearAuth();
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
