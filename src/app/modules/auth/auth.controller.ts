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

export const authController = {
  registerUser,
};
