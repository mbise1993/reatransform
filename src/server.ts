import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';
import path from 'path';

import resolvers from './resolvers';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    };
  },
});

server.express.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

server.start(
  {
    endpoint: '/api',
    subscriptions: '/subscribe',
    playground: '/playground',
  },
  () => console.log(`Server is running at http://localhost:4000`)
);
