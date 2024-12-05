import { Request, Response } from 'express';
import { success } from '../utils/responses.js';
import AuthMapper from '../mappers/AuthMapper.js';
import AuthService from '../services/AuthService.js';
import UserMapper from '../mappers/UserMapper.js';

class AuthController {
  private readonly authService: AuthService;
  private readonly authMapper: AuthMapper;
  private readonly userMapper: UserMapper;

  constructor() {
    this.authService = new AuthService();
    this.authMapper = new AuthMapper();
    this.userMapper = new UserMapper();
  }

  async signup(req: Request, res: Response) {
    const user = await this.authMapper.mapSignupData(req.body);

    const userDoc = await this.authService.signup(user);

    const userResponse = await this.userMapper.mapUserDoc(userDoc);

    res.status(201).json(success(userResponse));
  }

  async login(req: Request, res: Response) {
    res.status(200).send('auth/login');
  }
}

export default new AuthController();
