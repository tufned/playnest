import { describe, it, expect, beforeEach, vi } from "vitest";
import UserService from "../UserService.js";
import User from "../../models/user.js";
import { createError } from "../../utils/errorHelpers.js";
import { errors } from "../../constants/errors.js";

vi.mock("../../models/user", () => ({
  default: {
    findById: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn()
  }
}));

describe("UserService", () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    vi.clearAllMocks();
  });

  describe("getUserById", () => {
    it("should return a user by id", async () => {
      const mockUser = { id: "1", email: "test@test.com" };
      User.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(mockUser)
      });

      const result = await userService.getUserById("1");

      expect(User.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockUser);
    });

    it("should return null if user not found", async () => {
      User.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null)
      });

      const result = await userService.getUserById("1");

      expect(result).toBeNull();
    });
  });

  describe("getUserByField", () => {
    it("should return a user by field", async () => {
      const mockUser = { email: "test@test.com" };
      User.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(mockUser)
      });

      const result = await userService.getUserByField({ email: "test@test.com" });

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@test.com" });
      expect(result).toEqual(mockUser);
    });

    it("should return null if user not found", async () => {
      User.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null)
      });

      const result = await userService.getUserByField({ email: "test@test.com" });

      expect(result).toBeNull();
    });
  });

  describe("createUser", () => {
    const mockUserData = {
      email: "test@test.com",
      nickname: "testuser",
      password: "password123"
    };

    it("should create a new user", async () => {
      const mockCreatedUser = { ...mockUserData, id: "1" };

      User.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null)
      });
      User.create.mockResolvedValue(mockCreatedUser);

      const result = await userService.createUser(mockUserData);

      expect(User.create).toHaveBeenCalledWith(mockUserData);
      expect(result).toEqual(mockCreatedUser);
    });

    it("should throw error if email is already registered", async () => {
      User.findOne
        .mockReturnValueOnce({
          exec: vi.fn().mockResolvedValue({ email: mockUserData.email })
        })
        .mockReturnValueOnce({ exec: vi.fn().mockResolvedValue(null) });

      await expect(userService.createUser(mockUserData)).rejects.toEqual(
        createError(409, errors.alreadyRegistered)
      );
    });

    it("should throw error if nickname is already taken", async () => {
      User.findOne
        .mockReturnValueOnce({ exec: vi.fn().mockResolvedValue(null) })
        .mockReturnValueOnce({
          exec: vi.fn().mockResolvedValue({ nickname: mockUserData.nickname })
        });

      await expect(userService.createUser(mockUserData)).rejects.toEqual(
        createError(409, errors.nicknameIsTaken)
      );
    });
  });
});
