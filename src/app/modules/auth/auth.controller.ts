import { Request, Response } from 'express';
import { authService } from './auth.service';

const registerUser = async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authService.registerUser(payload, req.file);
  res.status(201).send({
    success: true,
    message: 'User created successfully',
    data: result?.user,
  });
};

const loginUser = async (req: Request, res: Response) => {
  const getUser = req.body;
  const result = await authService.loginUser(getUser);
  res.status(201).send({
    success: true,
    message: 'User login successfully',
    token: result?.token,
    data: result?.user,
  });
};

export const authController = {
  registerUser,
  loginUser,
};
