import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, loginUser } from "../services/api.js";
import i18n from "../i18n";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const authResponse = await loginUser({ email, password });
      const userResponse = await getUser(authResponse.data.userId);
      return { ...authResponse.data, ...userResponse.data };
    } catch {
      return rejectWithValue(i18n.t("login-failed"));
    }
  }
);

const initialState = {
  token: null,
  userId: null,
  isAdmin: false,
  username: null,
  status: "idle",
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.userId = null;
      state.isAdmin = false;
      state.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("username");
    },
    loadFromStorage(state) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      const username = localStorage.getItem("username");

      if (token) {
        state.token = token;
        state.userId = userId;
        state.isAdmin = isAdmin;
        state.username = username;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const { token, userId, isAdmin, username } = action.payload;
        state.token = token;
        state.userId = userId;
        state.isAdmin = isAdmin;
        state.username = username;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem("username", username);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || i18n.t("login-failed");
      });
  }
});

export const { logout, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;
