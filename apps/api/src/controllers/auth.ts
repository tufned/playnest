import { Request, Response } from 'express';

const authController = {
  login: async (req: Request, res: Response) => {
    res.status(200).send('auth/login');
  }
};

export default authController;
