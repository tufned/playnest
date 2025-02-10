import { fail, ResponseType, IUserLogin, IUserSignup, success } from "@playnest/utils";
import api from "~/lib/axios";
import URLs from "~/constants/requests";
import { errors } from "~/constants/errors";
import { IAccessTokenResponse } from "~/types";

const authService = {
  signup: async (formData: IUserSignup): Promise<ResponseType<IAccessTokenResponse>> => {
    try {
      const response: ResponseType<IAccessTokenResponse> = await api.post(
        URLs.auth.signup,
        formData
      );
      if (!response.success) throw new Error(response.message);
      return success(response.data);
    } catch (err) {
      return fail(err instanceof Error ? err.message : errors.badRequest);
    }
  },
  login: async (formData: IUserLogin): Promise<ResponseType<IAccessTokenResponse>> => {
    try {
      const response: ResponseType<IAccessTokenResponse> = await api.post(
        URLs.auth.login,
        formData
      );
      if (!response.success) throw new Error(response.message);
      return success(response.data);
    } catch (err) {
      return fail(err instanceof Error ? err.message : errors.badRequest);
    }
  },
  refreshAccessToken: async (): Promise<ResponseType<IAccessTokenResponse>> => {
    try {
      const response: ResponseType<IAccessTokenResponse> = await api.get(
        URLs.auth.refresh
      );
      if (!response.success) throw new Error(response.message);
      return success(response.data);
    } catch (err) {
      return fail(err instanceof Error ? err.message : errors.badRequest);
    }
  },
  logout: async (): Promise<ResponseType> => {
    try {
      const response: ResponseType<IAccessTokenResponse> = await api.get(
        URLs.auth.logout
      );
      if (!response.success) throw new Error(response.message);
      return success();
    } catch (err) {
      return fail(err instanceof Error ? err.message : errors.badRequest);
    }
  }
};

export default authService;
