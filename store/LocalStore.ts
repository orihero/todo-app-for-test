import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Tokens, User } from "@/@types";

interface LocalStoreState {
  tokens: Tokens | null;
  user: User | null;
}

const initialState: LocalStoreState = {
  tokens: null,
  user: null,
};

const localStore = createSlice({
  name: "localStore",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Tokens>) => {
      const newTokens = { ...action.payload };
      state.tokens = newTokens;
    },
    setUser: (state, action: PayloadAction<User>) => {
      const newUser = { ...action.payload };
      state.user = newUser;
    },
    clearLocalStore: (state) => {
      state.tokens = null;
      state.user = null;
    },
  },
});

const selectLocalStore = (state: RootState) => state.localStore;

export const selectTokens = createSelector(
  [selectLocalStore],
  (localStore) => localStore.tokens
);

export const selectUser = createSelector(
  [selectLocalStore],
  (localStore) => localStore.user
);

export const { setTokens, setUser, clearLocalStore } = localStore.actions;
export default localStore;
