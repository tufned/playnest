import { describe, it, expect, beforeEach, vi } from "vitest";
import UserService from "../../services/UserService.js";
import UserRepository from "../../repositories/UserRepository.js";
import { createError } from "../../utils/errorHelpers.js";
import { errors } from "../../constants/errors.js";
import { createHash, compareHash } from "../../lib/bcrypt.js";

vi.mock("../../repositories/UserRepository.js");
vi.mock("../../lib/bcrypt.js", () => ({
  createHash: vi.fn(async (password) => `hashed_${password}`),
  compareHash: vi.fn(async (password, hash) => hash === `hashed_${password}`)
}));
vi.mock("../../utils/errorHelpers.js", () => ({
  createError: vi.fn((status, message) => ({ status, message }))
}));

describe("UserService", () => {
  let userService;
  let userRepositoryMock;

  beforeEach(() => {
    userRepositoryMock = new UserRepository();
    userService = new UserService(userRepositoryMock);
    vi.clearAllMocks();
  });

  describe("create", () => {
    it("should create a user if email and nickname are unique", async () => {
      userRepositoryMock.getByField.mockResolvedValue(null);
      userRepositoryMock.create.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        nickname: "testuser"
      });

      const user = {
        email: "test@example.com",
        nickname: "testuser",
        password: "password"
      };
      const result = await userService.create(user);

      expect(result).toEqual({ id: 1, email: "test@example.com", nickname: "testuser" });
      expect(createHash).toHaveBeenCalledWith("password");
      expect(userRepositoryMock.create).toHaveBeenCalledWith({
        ...user,
        password: "hashed_password"
      });
    });

    it("should throw an error if email is already registered", async () => {
      userRepositoryMock.getByField.mockResolvedValueOnce({
        id: 1,
        email: "test@example.com"
      });

      await expect(
        userService.create({
          email: "test@example.com",
          nickname: "testuser",
          password: "password"
        })
      ).rejects.toEqual(createError(409, errors.alreadyRegistered));
    });
  });

  describe("getById", () => {
    it("should return a user if found", async () => {
      userRepositoryMock.getByField.mockResolvedValue({
        id: 1,
        email: "test@example.com"
      });
      const result = await userService.getById(1);
      expect(result).toEqual({ id: 1, email: "test@example.com" });
    });

    it("should throw an error if no ID is provided", async () => {
      await expect(userService.getById(undefined)).rejects.toEqual(
        createError(409, errors.paramsNotReceived(["id"]))
      );
    });
  });

  describe("updatePassword", () => {
    it("should update the password if the old password is correct", async () => {
      userRepositoryMock.getByField.mockResolvedValue({
        id: 1,
        password: "hashed_oldPassword"
      });
      userRepositoryMock.update.mockResolvedValue({
        id: 1,
        password: "hashed_newPassword"
      });

      const result = await userService.updatePassword(1, {
        password: "oldPassword",
        newPassword: "newPassword"
      });
      expect(result).toEqual({ id: 1, password: "hashed_newPassword" });
    });

    it("should throw an error if the old password is incorrect", async () => {
      userRepositoryMock.getByField.mockResolvedValue({
        id: 1,
        password: "hashed_oldPassword"
      });
      compareHash.mockResolvedValue(false);

      await expect(
        userService.updatePassword(1, {
          password: "wrongPassword",
          newPassword: "newPassword"
        })
      ).rejects.toEqual(createError(401, errors.invalidPassword));
    });
  });
});
