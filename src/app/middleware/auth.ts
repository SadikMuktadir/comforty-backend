import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../modules/auth/auth.model';
import config from '../config';

const auth = (...requiredRole: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('You are not authorized');
    }

    const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

    const { email, role } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new Error('You are not authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  };
};

export default auth;
