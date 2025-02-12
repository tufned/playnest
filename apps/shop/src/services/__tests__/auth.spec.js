import { describe, it, expect, beforeEach, vi } from "vitest";
import api from "~/lib/axios";
import authService from "../auth.service";
import URLs from "~/constants/requests";
import { errors } from "~/constants/errors";

let mockSuccessResponse;

vi.mock("~/lib/axios", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn()
  }
}));

describe("authService", () => {
  beforeEach(() => {
    mockSuccessResponse = {
      success: true,
      data: {
        accessToken: "mock-access-token"
      }
    };
    vi.clearAllMocks();
  });

  describe("signup", () => {
    const mockSignupData = {
      email: "test@example.com",
      password: "password123",
      passwordConfirm: "password123",
      nickname: "testuser"
    };

    it("should successfully register a user", async () => {
      vi.mocked(api.post).mockResolvedValueOnce(mockSuccessResponse);

      const result = await authService.signup(mockSignupData);

      const { email, nickname, password } = mockSignupData;
      const mappedSignupUserData = { email, nickname, password };

      expect(api.post).toHaveBeenCalledWith(URLs.auth.signup, mappedSignupUserData);
      expect(result).toEqual({
        success: true,
        data: mockSuccessResponse.data
      });
    });

    it("should return an error on failed registration", async () => {
      const errorMessage = "Registration failed";
      vi.mocked(api.post).mockRejectedValueOnce(new Error(errorMessage));

      const result = await authService.signup(mockSignupData);

      expect(result).toEqual({
        success: false,
        message: errorMessage
      });
    });

    it("should return general error on unexpected response", async () => {
      vi.mocked(api.post).mockRejectedValueOnce("Unexpected error");

      const result = await authService.signup(mockSignupData);

      expect(result).toEqual({
        success: false,
        message: errors.badRequest
      });
    });
  });

  describe("login", () => {
    const mockLoginData = {
      email: "test@example.com",
      password: "password123"
    };

    it("should successfully authenticate user", async () => {
      vi.mocked(api.post).mockResolvedValueOnce(mockSuccessResponse);

      const result = await authService.login(mockLoginData);

      expect(api.post).toHaveBeenCalledWith(URLs.auth.login, mockLoginData);
      expect(result).toEqual({
        success: true,
        data: mockSuccessResponse.data
      });
    });

    it("should return an error on failed authentication", async () => {
      const errorMessage = "Invalid credentials";
      vi.mocked(api.post).mockRejectedValueOnce(new Error(errorMessage));

      const result = await authService.login(mockLoginData);

      expect(result).toEqual({
        success: false,
        message: errorMessage
      });
    });
  });

  describe("refreshAccessToken", () => {
    it("should successfully refresh access token", async () => {
      vi.mocked(api.get).mockResolvedValueOnce(mockSuccessResponse);

      const result = await authService.refreshAccessToken();

      expect(api.get).toHaveBeenCalledWith(URLs.auth.refresh);
      expect(result).toEqual({
        success: true,
        data: mockSuccessResponse.data
      });
    });

    it("should return an error on failed token refresh", async () => {
      const errorMessage = "Token refresh failed";
      vi.mocked(api.get).mockRejectedValueOnce(new Error(errorMessage));

      const result = await authService.refreshAccessToken();

      expect(result).toEqual({
        success: false,
        message: errorMessage
      });
    });
  });

  describe("logout", () => {
    mockSuccessResponse = {
      success: true
    };

    it("should successfully logout", async () => {
      vi.mocked(api.get).mockResolvedValueOnce(mockSuccessResponse);

      const result = await authService.logout();

      expect(api.get).toHaveBeenCalledWith(URLs.auth.logout);
      expect(result).toEqual({
        success: true
      });
    });

    it("should return an error on failed logout", async () => {
      const errorMessage = "Logout failed";
      vi.mocked(api.get).mockRejectedValueOnce(new Error(errorMessage));

      const result = await authService.logout();

      expect(result).toEqual({
        success: false,
        message: errorMessage
      });
    });

    it("should return general error on unexpected error", async () => {
      vi.mocked(api.get).mockRejectedValueOnce("Unexpected error");

      const result = await authService.logout();

      expect(result).toEqual({
        success: false,
        message: errors.badRequest
      });
    });
  });
});
