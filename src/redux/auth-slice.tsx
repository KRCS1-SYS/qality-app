import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuth: boolean;
  token: string;
};

const initialAuthState: AuthState = {
  isAuth: false,
  token: ""
};

export const auth = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logOut: () => initialAuthState,
    logIn: (state, action: PayloadAction<AuthState>) => {
      state.isAuth = true;
      state.token = action.payload.token;
    },
  },
});

export const { logIn, logOut } = auth.actions;

const rootReducer = {
  auth: auth.reducer,
};

export default rootReducer;