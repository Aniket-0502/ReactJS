import { createSlice } from "@reduxjs/toolkit";

const initialStatus = {
  status: false,
  userData: null,
};
//All these reducers are actually promises thus .then and .catch can be applied
const authSlice = createSlice({
  name: "auth",
  initialStatus,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
