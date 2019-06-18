import * as Mutation from './Mutation';
import * as Query from './Query';
import * as Script from './Script';
import * as User from './User';

export default {
  Mutation: { ...Mutation },
  Query: { ...Query },
  Script: { ...Script },
  User: { ...User },
};
