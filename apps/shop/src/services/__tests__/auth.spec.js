import { describe, it, expect, beforeEach, vi } from "vitest";
import { AuthService } from "~/services/auth.service";
import URLs from "~/constants/requests";
import { store } from "~/redux/store";
import ResponseMapper from "~/mappers/response.mapper";

let authService;
let mockApiClient;
let mockUserMapper;
let mockSuccessResponse;
let mockFailResponse;

vi.mock("~/redux/store", () => ({
  store: {
    getState: vi.fn(() => ({ common: { isAuthorized: true } }))
  }
}));

describe("AuthService", () => {
  beforeEach(() => {
    mockApiClient = {
      post: vi.fn(),
      get: vi.fn()
    };

    mockUserMapper = {
      toSignupDTO: vi.fn(),
      toLoginDTO: vi.fn()
    };

    authService = new AuthService(mockUserMapper, mockApiClient, URLs.auth);

    mockSuccessResponse = ResponseMapper.toSuccessDTO({
      accessToken: "mock-access-token"
    });

    mockFailResponse = ResponseMapper.toFailDTO("Request failed");

    vi.clearAllMocks();
  });

  describe("signup", () => {
    const mockSignupData = {
      data: {
        email: "test@example.com",
        password: "password123",
        passwordConfirm: "password123",
        nickname: "testuser"
      }
    };

    it("should successfully register a user", async () => {
      mockApiClient.post.mockResolvedValueOnce(mockSuccessResponse);
      mockUserMapper.toSignupDTO.mockReturnValue(mockSignupData.data);

      const result = await authService.signup(mockSignupData);

      expect(mockUserMapper.toSignupDTO).toHaveBeenCalledWith(mockSignupData.data);
      expect(mockApiClient.post).toHaveBeenCalledWith(
        URLs.auth.signup,
        mockSignupData.data
      );
      expect(result).toEqual(mockSuccessResponse);
    });
  });

  describe("login", () => {
    const mockLoginData = {
      data: { email: "test@example.com", password: "password123" }
    };

    it("should successfully authenticate user", async () => {
      mockApiClient.post.mockResolvedValueOnce(mockSuccessResponse);
      mockUserMapper.toLoginDTO.mockReturnValue(mockLoginData.data);

      const result = await authService.login(mockLoginData);

      expect(mockUserMapper.toLoginDTO).toHaveBeenCalledWith(mockLoginData.data);
      expect(mockApiClient.post).toHaveBeenCalledWith(
        URLs.auth.login,
        mockLoginData.data
      );
      expect(result).toEqual(mockSuccessResponse);
    });
  });

  describe("refreshAccessToken", () => {
    it("should return null accessToken if user is not authorized and response is not successful", async () => {
      store.getState.mockReturnValue({ common: { isAuthorized: false } });
      mockApiClient.get.mockResolvedValueOnce(mockFailResponse);

      const result = await authService.refreshAccessToken();

      expect(mockApiClient.get).toHaveBeenCalledWith(URLs.auth.refresh);
      expect(result).toEqual(ResponseMapper.toSuccessDTO({ accessToken: null }));
    });
  });

  describe("logout", () => {
    it("should successfully logout", async () => {
      mockApiClient.get.mockResolvedValueOnce(mockSuccessResponse);

      const result = await authService.logout();

      expect(mockApiClient.get).toHaveBeenCalledWith(URLs.auth.logout);
      expect(result).toEqual(mockSuccessResponse);
    });
  });
});
