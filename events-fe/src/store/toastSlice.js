import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    items: []
  },
  reducers: {
    showToast: (state, action) => {
      const { title, message, type = "error" } = action.payload;
      state.items = [];
      state.items.push({
        id: Date.now(),
        title,
        message,
        type
      });
    },
    removeToast: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    }
  }
});

export const { showToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
