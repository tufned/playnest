import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "~/redux/api/auth";
import { jwtDecode } from "jwt-decode";
import { UserJwtPayloadDTO } from "@playnest/core";

export interface CommonSliceState {
  isAuthorized: boolean;
  userJwtPayload: UserJwtPayloadDTO | null;
}

const initialState: CommonSliceState = {
  isAuthorized: false,
  userJwtPayload: null
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setUserJwtPayload: (
      state: CommonSliceState,
      action: PayloadAction<Partial<UserJwtPayloadDTO>>
    ) => {
      state.userJwtPayload = {
        ...state.userJwtPayload!,
        ...action.payload
      };
    }
  },
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
