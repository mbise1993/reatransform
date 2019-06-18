import { Visibility } from '../generated/prisma-client';
import { Context, authorizeUser } from './utils';

export async function publicScripts(_parent: any, _args: any, context: Context) {
  return await context.prisma.scripts({
    where: {
      visibility: 'PUBLIC',
    },
  });
}

interface UserScriptsArgs {
  visibility: Visibility;
}

export async function userScripts(_parent: any, args: UserScriptsArgs, context: Context) {
  const userId = authorizeUser(context);
  return await context.prisma.scriptsConnection({
    where: {
      visibility: args.visibility,
      author: {
        id: userId,
      },
    },
  });
}

export async function favoriteScripts(_parent: any, _args: {}, context: Context) {
  const userId = authorizeUser(context);
  return await context.prisma.scriptsConnection({
    where: {
      favoritedBy_some: { id: userId },
    },
  });
}
