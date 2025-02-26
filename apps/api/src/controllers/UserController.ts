import { Request, Response } from "express";
import UserService from "../services/UserService.js";
import UserMapper from "../mappers/UserMapper.js";
import UserValidator from "../validations/UserValidator.js";
import ResponseMapper from "../mappers/ResponseMapper.js";

class UserController {
  constructor(
    private readonly userService = new UserService(),
    private readonly userMapper = new UserMapper(),
    private readonly userValidator = new UserValidator(),
    private readonly responseMapper = new ResponseMapper()
  ) {
    this.userService = userService;
    this.userMapper = userMapper;
    this.userValidator = userValidator;
    this.responseMapper = responseMapper;
  }

  getAllUsers = async (req: Request, res: Response) => {
    const usersEntities = await this.userService.getAll();
    const usersDTOs = usersEntities.map((user) => this.userMapper.toDTO(user));
    res.status(200).json(this.responseMapper.toSuccess(usersDTOs));
  };

  getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userEntity = await this.userService.getById(id);
    const userDTO = this.userMapper.toDTO(userEntity);
    res.status(200).json(this.responseMapper.toSuccess(userDTO));
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = this.userValidator.parseUpdateDTO(req.body);
    const updatedUser = await this.userService.update(id, user);
    const userDTO = this.userMapper.toDTO(updatedUser);
    res.status(200).json(this.responseMapper.toSuccess(userDTO));
  };

  updateUserPassword = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userPasswords = this.userValidator.parseUpdatePasswordDTO(req.body);
    await this.userService.updatePassword(id, userPasswords);
    res.status(200).json(this.responseMapper.toSuccess());
  };
}

export default new UserController();
