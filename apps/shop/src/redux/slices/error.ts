import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppErrorDTO, AppErrorState } from "~/types";
import { RootState } from "~/redux/store";
import config from "~/config/common.config";
import ErrorMapper from "~/mappers/error.mapper";

export interface ErrorSliceState {
  appErrors: AppErrorState[];
}

const initialState: ErrorSliceState = {
  appErrors: []
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setAppError: (state: ErrorSliceState, action: PayloadAction<AppErrorState>) => {
      if (state.appErrors.length >= 4) state.appErrors.shift();
      state.appErrors.push(action.payload);
    },

    removeAppError: (
      state: ErrorSliceState,
      action: PayloadAction<AppErrorState["id"]>
    ) => {
      const index = state.appErrors.findIndex((error) => error.id === action.payload);
      if (index !== -1) state.appErrors.splice(index, 1);
    },

    clearAllAppErrors: (state: ErrorSliceState) => {
      state.appErrors = [];
    }
  }
});

export const setTimedAppError = createAsyncThunk<void, AppErrorDTO>(
  "error/registerClearAppError",
  async (error, thunkAPI) => {
    const mappedError = ErrorMapper.toAppErrorState(error);
    thunkAPI.dispatch(errorSlice.actions.setAppError(mappedError));
    setTimeout(() => {
      thunkAPI.dispatch(errorSlice.actions.removeAppError(mappedError.id));
    }, config.ERROR_TIMEOUT);
  }
);

export const selectAppError = (state: RootState) => state.error.appErrors;

export const errorReducer = errorSlice.reducer;
