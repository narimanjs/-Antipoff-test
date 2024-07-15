import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Credentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends Credentials {
  name: string;
}

function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === "object" && error !== null && "message" in error;
}

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://reqres.in/api/register", {
        email: credentials.email,
        password: credentials.password,
      });
      return { token: response.data.token };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error);
      }
      if (isErrorWithMessage(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: credentials.email,
        password: credentials.password,
      });
      return { token: response.data.token };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error);
      }
      if (isErrorWithMessage(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

export const performLogout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
});
