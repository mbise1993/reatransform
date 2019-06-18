import jwt from 'jsonwebtoken';

import { Prisma } from '../generated/prisma-client';
import { Request } from 'express';

export const APP_SECRET = 'SECRET';

export interface Context {
  prisma: Prisma;
  request: Request;
}

export const authorizeUser = (context: Context) => {
  const auth = context.request.get('Authorization');
  if (!auth) {
    throw new Error('Not authenticated');
  }

  const token = auth.replace('Bearer ', '');
  const result = jwt.verify(token, APP_SECRET) as { userId: string };
  return result.userId;
};
