import UserService from '../UserService';
import User from '../../models/user';
import { createError } from '../../utils/errorHelpers';
import { errors } from '../../constants/errors';
import { IUserSignup } from '@playnest/utils';

jest.mock('../../models/user', () => ({
  findById: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn()
}));

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const mockUser = { id: '1', email: 'test@test.com' };
      (User.findById as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser)
      });

      const result = await userService.getUserById('1');

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });

    it('should return null if user not found', async () => {
      (User.findById as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(null)
      });

      const result = await userService.getUserById('1');

      expect(result).toBeNull();
    });
  });

  describe('getUserByField', () => {
    it('should return a user by field', async () => {
      const mockUser = { email: 'test@test.com' };
      (User.findOne as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser)
      });

      const result = await userService.getUserByField({ email: 'test@test.com' });

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@test.com' });
      expect(result).toEqual(mockUser);
    });

    it('should return null if user not found', async () => {
      (User.findOne as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(null)
      });

      const result = await userService.getUserByField({ email: 'test@test.com' });

      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    const mockUserData: IUserSignup = {
      email: 'test@test.com',
      nickname: 'testuser',
      password: 'password123'
    };

    it('should create a new user', async () => {
      const mockCreatedUser = { ...mockUserData, id: '1' };

      (User.findOne as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(null)
      });
      (User.create as jest.Mock).mockResolvedValue(mockCreatedUser);

      const result = await userService.createUser(mockUserData);

      expect(User.create).toHaveBeenCalledWith(mockUserData);
      expect(result).toEqual(mockCreatedUser);
    });

    it('should throw error if email is already registered', async () => {
      (User.findOne as jest.Mock)
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue({ email: mockUserData.email })
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(null)
        });

      await expect(userService.createUser(mockUserData)).rejects.toEqual(
        createError(409, errors.alreadyRegistered)
      );
    });

    it('should throw error if nickname is already taken', async () => {
      (User.findOne as jest.Mock)
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(null)
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue({ nickname: mockUserData.nickname })
        });

      await expect(userService.createUser(mockUserData)).rejects.toEqual(
        createError(409, errors.nicknameIsTaken)
      );
    });
  });
});
