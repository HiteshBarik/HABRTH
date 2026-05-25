import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthUser = {
  _id?: string;
  name?: string;
  email?: string;
  dob?: string;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthUser | null; token: string | null }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
    },
  },
});

export const { setCredentials, setUser, setToken, setLoading, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;
