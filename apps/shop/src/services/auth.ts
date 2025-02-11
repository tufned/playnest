import { IUserLogin, IUserSignup } from "@playnest/shared/types/models/user.types";
import { ResponseType } from "@playnest/shared/types/response.types";
import api from "~/lib/axios";
import URLs from "~/constants/requests";
import { errors } from "~/constants/errors";
import { IAccessTokenResponse } from "~/types";

// TODO: refactor authService
//   methods should return prepared data

const authService = {
  signup: async (formData: IUserSignup): Promise<ResponseType<IAccessTokenResponse>> => {
    try {
      const response: ResponseType<IAccessTokenResponse> = await api.post(
        URLs.auth.signup,
        formData
      );
      if (!response.success) throw new Error(response.message);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : errors.badRequest
      };
    }
  },
  login: async (formData: IUserLogin): Promise<ResponseType<IAccessTokenResponse>> => {
    try {
      const response: ResponseType<IAccessTokenResponse> = await api.post(
        URLs.auth.login,
        formData
      );
      if (!response.success) throw new Error(response.message);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : errors.badRequest
      };
    }
  },
  refreshAccessToken: async (): Promise<ResponseType<IAccessTokenResponse>> => {
    try {
      const response: ResponseType<IAccessTokenResponse> = await api.get(
        URLs.auth.refresh
      );
      if (!response.success) throw new Error(response.message);
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : errors.badRequest
      };
    }
  },
  logout: async (): Promise<ResponseType> => {
    try {
      const response: ResponseType<IAccessTokenResponse> = await api.get(
        URLs.auth.logout
      );
      if (!response.success) throw new Error(response.message);
      return {
        success: true
      };
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : errors.badRequest
      };
    }
  }
};

export default authService;
