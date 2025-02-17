import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "~/redux/api/auth";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    isAuthorized: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getAccessToken.matchFulfilled,
      (state, { payload }) => {
        state.isAuthorized = payload !== null;
      }
    );
  }
});

export const commonReducer = commonSlice.reducer;
