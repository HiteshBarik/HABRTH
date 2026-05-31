import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  clearAuth,
  setCredentials,
  setUser,
} from "../auth/authSlice";

export type RPGUserState = {
  profile: {
    id: string;
    name: string;
    email: string;
  };
  progression: {
    level: number;
    xp: number;
    streak: number;
  };
  attributes: {
    discipline: number;
    strength: number;
    focus: number;
    knowledge: number;
  };
};

type RPGUserUpdate = {
  profile?: Partial<RPGUserState["profile"]>;
  progression?: Partial<RPGUserState["progression"]>;
  attributes?: Partial<RPGUserState["attributes"]>;
};

const initialState: RPGUserState = {
  profile: {
    id: "",
    name: "User",
    email: "",
  },
  progression: {
    level: 1,
    xp: 0,
    streak: 0,
  },
  attributes: {
    discipline: 1,
    strength: 1,
    focus: 1,
    knowledge: 1,
  },
};

type AuthUserSnapshot = {
  _id?: string;
  name?: string;
  email?: string;
  level?: number;
  xp?: number;
  streak?: number;
  discipline?: number;
  strength?: number;
  focus?: number;
  knowledge?: number;
  stats?: {
    discipline?: number;
    strength?: number;
    focus?: number;
    knowledge?: number;
  };
};

const toRPGUserState = (user: AuthUserSnapshot): RPGUserState => ({
  profile: {
    id: user._id ?? "",
    name: user.name ?? "User",
    email: user.email ?? "",
  },
  progression: {
    level: user.level ?? 1,
    xp: user.xp ?? 0,
    streak: user.streak ?? 0,
  },
  attributes: {
    discipline: user.discipline ?? user.stats?.discipline ?? 1,
    strength: user.strength ?? user.stats?.strength ?? 1,
    focus: user.focus ?? user.stats?.focus ?? 1,
    knowledge: user.knowledge ?? user.stats?.knowledge ?? 1,
  },
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<RPGUserUpdate>) => {
      const { profile, progression, attributes } = action.payload;

      state.profile = {
        id: profile?.id ?? state.profile.id,
        name: profile?.name ?? state.profile.name,
        email: profile?.email ?? state.profile.email,
      };

      state.progression = {
        level: progression?.level ?? state.progression.level,
        xp: progression?.xp ?? state.progression.xp,
        streak: progression?.streak ?? state.progression.streak,
      };

      state.attributes = {
        discipline: attributes?.discipline ?? state.attributes.discipline,
        strength: attributes?.strength ?? state.attributes.strength,
        focus: attributes?.focus ?? state.attributes.focus,
        knowledge: attributes?.knowledge ?? state.attributes.knowledge,
      };
    },
    resetUserProfile: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCredentials, (_state, action) =>
        action.payload.user ? toRPGUserState(action.payload.user) : initialState,
      )
      .addCase(setUser, (_state, action) =>
        action.payload ? toRPGUserState(action.payload) : initialState,
      )
      .addCase(clearAuth, () => initialState);
  },
});

export const { setUserProfile, resetUserProfile } = userSlice.actions;
export default userSlice.reducer;
