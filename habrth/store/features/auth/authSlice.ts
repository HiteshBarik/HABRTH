import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthUser = {
  _id?: string;
  name?: string;
  email?: string;
  dob?: string;
  level: number;
  xp: number;
  streak: number;
  discipline: number;
  strength: number;
  focus: number;
  knowledge: number;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
};

type AuthUserPayload = Partial<AuthUser> | null;

const initialState: AuthState = {
  user: {
    level: 1,
    xp: 0,
    streak: 0,
    discipline: 1,
    strength: 1,
    focus: 1,
    knowledge: 1,
  },
  token: null,
  loading: false,
};

const withDefaultStats = (user: Partial<AuthUser> | null): AuthUser | null => {
  if (!user) return null;

  return {
    level: user.level ?? 1,
    xp: user.xp ?? 0,
    streak: user.streak ?? 0,
    discipline: user.discipline ?? 1,
    strength: user.strength ?? 1,
    focus: user.focus ?? 1,
    knowledge: user.knowledge ?? 1,
    _id: user._id,
    name: user.name,
    email: user.email,
    dob: user.dob,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthUserPayload; token: string | null }>,
    ) => {
      state.user = withDefaultStats(action.payload.user);
      state.token = action.payload.token;
    },
    setUser: (state, action: PayloadAction<AuthUserPayload>) => {
      state.user = withDefaultStats(action.payload);
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearAuth: (state) => {
      state.user = {
        level: 1,
        xp: 0,
        streak: 0,
        discipline: 1,
        strength: 1,
        focus: 1,
        knowledge: 1,
      };
      state.token = null;
      state.loading = false;
    },
  },
});

export const { setCredentials, setUser, setToken, setLoading, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;
