import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "~/redux/api/auth";
import { jwtDecode } from "jwt-decode";
import { UserJwtPayloadDTO } from "@playnest/core";

export interface AuthSliceState {
  isAuthorized: boolean;
  userJwtPayload: UserJwtPayloadDTO | null;
}

const initialState: AuthSliceState = {
  isAuthorized: false,
  userJwtPayload: null
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getAccessToken.matchFulfilled,
      (state, { payload }) => {
        if (!payload) {
          state.userJwtPayload = initialState.userJwtPayload;
          state.isAuthorized = initialState.isAuthorized;
        } else {
          state.userJwtPayload = jwtDecode<UserJwtPayloadDTO>(payload);
          state.isAuthorized = true;
        }
      }
    );
  }
});

export const commonReducer = commonSlice.reducer;
