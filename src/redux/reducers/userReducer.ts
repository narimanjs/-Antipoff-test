// src/redux/reducers/userReducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, fetchUser } from "../actions/userActions";
import { User } from "../../types";

interface UsersState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: UsersState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  currentPage: 1,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers(state) {
      state.users = [];
      state.currentPage = 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        const newUsers = action.payload.filter(
          newUser =>
            !state.users.some(existingUser => existingUser.id === newUser.id)
        );
        state.users = state.users.concat(newUsers);
        state.currentPage += 1;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching users";
      })
      .addCase(fetchUser.pending, state => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching user";
      });
  },
});

export const { resetUsers } = userSlice.actions;
export default userSlice.reducer;
