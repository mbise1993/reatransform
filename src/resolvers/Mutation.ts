import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Visibility, ScriptUpdateInput } from '../generated/prisma-client';
import { Context, authorizeUser, APP_SECRET } from './utils';

interface SignupArgs {
  email: string;
  username: string;
  password: string;
}

export async function signup(_parent: any, args: SignupArgs, context: Context) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

interface LoginArgs {
  email: string;
  password: string;
}

export async function login(_parent: any, args: LoginArgs, context: Context) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error(`No user found for email ${args.email}`);
  }

  const isValid = await bcrypt.compare(args.password, user.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

interface CreateScriptArgs {
  name: string;
  description?: string;
  content: string;
  tags: string[];
  visibility: Visibility;
}

export async function createScript(_parent: any, args: CreateScriptArgs, context: Context) {
  const userId = authorizeUser(context);
  return context.prisma.createScript({
    name: args.name,
    description: args.description,
    content: args.content,
    tags: { set: args.tags },
    visibility: args.visibility,
    author: { connect: { id: userId } },
  });
}

interface UpdateScriptArgs {
  id: string;
  name?: string;
  description?: string;
  content?: string;
  tags?: string[];
  visibility?: Visibility;
}

export async function updateScript(_parent: any, args: UpdateScriptArgs, context: Context) {
  const userId = authorizeUser(context);

  const data: ScriptUpdateInput = {};
  if (args.name) {
    data.name = args.name;
  }

  if (args.description) {
    data.description = args.description;
  }

  if (args.content) {
    data.content = args.content;
  }

  if (args.tags) {
    data.tags = { set: args.tags };
  }

  if (args.visibility) {
    data.visibility = args.visibility;
  }

  return await context.prisma.updateScript({
    data,
    where: { id: userId },
  });
}

interface DeleteScriptArgs {
  id: string;
}

export async function deleteScript(_parent: any, args: DeleteScriptArgs, context: Context) {
  authorizeUser(context);
  return context.prisma.deleteScript({
    id: args.id,
  });
}

interface RateScriptArgs {
  id: string;
  rating: number;
}

export async function rateScript(_parent: any, args: RateScriptArgs, context: Context) {
  const userId = authorizeUser(context);
  return context.prisma.createRating({
    value: args.rating,
    script: { connect: { id: args.id } },
    user: { connect: { id: userId } },
  });
}

interface FavoriteScriptArgs {
  id: string;
}

export async function favoriteScript(_parent: any, args: FavoriteScriptArgs, context: Context) {
  const userId = authorizeUser(context);
  return context.prisma.updateScript({
    where: { id: args.id },
    data: {
      favoritedBy: { connect: { id: userId } },
    },
  });
}
