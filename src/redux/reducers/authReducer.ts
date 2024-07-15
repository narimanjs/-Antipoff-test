import { createSlice } from "@reduxjs/toolkit";
import { register, login, performLogout } from "../actions/authActions";

interface AuthState {
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token; // Handle token correctly
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.token = null;
        state.error = action.payload as string;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token; // Handle token correctly
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.token = null;
        state.error = action.payload as string;
      })
      .addCase(performLogout.fulfilled, state => {
        state.token = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
