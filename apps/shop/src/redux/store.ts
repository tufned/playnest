import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "~/redux/api/auth";
import { commonReducer } from "~/redux/slices/common";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    common: commonReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
