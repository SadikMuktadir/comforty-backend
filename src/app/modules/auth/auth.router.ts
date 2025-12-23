import { NextFunction, Request, Response, Router } from 'express';
import { upload } from '../../utils/hosting/sendImageToCloudinary';
import { authController } from './auth.controller';
import auth from '../../middleware/auth';

const authRouter = Router();

authRouter.post(
  '/register-user',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  authController.registerUser,
);

authRouter.post('/login-user', authController.loginUser);
authRouter.get('/all-user', auth('admin'), authController.getAllUser);

export default authRouter;
