import { Request } from 'express';
import { User } from '../entities';

export interface UserTokenPayload {
  userId: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
