import { describe, it, expect, beforeEach, vi } from "vitest";
import UserRepository from "../../repositories/UserRepository.js";
import Database from "../../lib/db-facade.js";
import { createError } from "../../utils/errorHelpers.js";
import { errors } from "../../constants/errors.js";

vi.mock("../../lib/db-facade.js", () => ({
  default: {
    client: {
      user: {
        findUnique: vi.fn(),
        findFirst: vi.fn(),
        create: vi.fn()
      }
    }
  }
}));

describe("UserRepository", () => {
  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    vi.clearAllMocks();
  });

  describe("getById", () => {
    it("should return a user by id", async () => {
      const mockUser = { id: 1, email: "test@test.com" };
      Database.client.user.findUnique.mockResolvedValue(mockUser);

      const result = await userRepository.getById(1);

      expect(Database.client.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 }
      });
      expect(result).toEqual(mockUser);
    });

    it("should return null if user not found", async () => {
      Database.client.user.findUnique.mockResolvedValue(null);

      const result = await userRepository.getById(1);

      expect(result).toBeNull();
    });
  });

  describe("getByField", () => {
    it("should return a user by field", async () => {
      const mockUser = { email: "test@test.com" };
      Database.client.user.findUnique.mockResolvedValue(mockUser);

      const result = await userRepository.getByField({ email: "test@test.com" });

      expect(Database.client.user.findUnique).toHaveBeenCalledWith({
        where: { email: "test@test.com" }
      });
      expect(result).toEqual(mockUser);
    });

    it("should return null if user not found", async () => {
      Database.client.user.findUnique.mockResolvedValue(null);

      const result = await userRepository.getByField({ email: "test@test.com" });

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    const mockUserData = {
      email: "test@test.com",
      nickname: "testuser",
      password: "password123"
    };

    it("should create a new user", async () => {
      const mockCreatedUser = { ...mockUserData, id: 1 };

      Database.client.user.findUnique.mockResolvedValue(null);
      Database.client.user.create.mockResolvedValue(mockCreatedUser);

      const result = await userRepository.create(mockUserData);

      expect(Database.client.user.create).toHaveBeenCalledWith({
        data: mockUserData
      });
      expect(result).toEqual(mockCreatedUser);
    });

    it("should throw error if email is already registered", async () => {
      Database.client.user.findUnique
        .mockResolvedValueOnce({ email: mockUserData.email })
        .mockResolvedValueOnce(null);

      await expect(userRepository.create(mockUserData)).rejects.toEqual(
        createError(409, errors.alreadyRegistered)
      );
    });

    it("should throw error if nickname is already taken", async () => {
      Database.client.user.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ nickname: mockUserData.nickname });

      await expect(userRepository.create(mockUserData)).rejects.toEqual(
        createError(409, errors.nicknameIsTaken)
      );
    });
  });
});
