import { Script, User } from '../generated/prisma-client';
import { Context } from './utils';

export function author(parent: Script, _args: any, context: Context): User {
  return context.prisma.script({ id: parent.id }).author();
}

export function favoritedBy(parent: Script, _args: {}, context: Context): User[] {
  return context.prisma.script({ id: parent.id }).favoritedBy();
}
