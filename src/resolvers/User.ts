import { User, Script } from '../generated/prisma-client';
import { Context } from './utils';

export function userScripts(parent: User, _any: {}, context: Context): Script[] {
  return context.prisma.user({ id: parent.id }).userScripts();
}

export function favoriteScripts(parent: User, _any: {}, context: Context): Script[] {
  return context.prisma.user({ id: parent.id }).favoriteScripts();
}
