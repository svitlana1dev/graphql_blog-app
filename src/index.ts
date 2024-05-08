import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { typeDefs } from "./schema";
import { Query, Mutation, Profile, Post, User } from "./resolvers";
import { getUserFromTheToken } from "./utils/get-user-from-token";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: {
    userId: number;
  } | null;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Profile,
    Post,
    User,
  },
});

startStandaloneServer(server, {
  context: async ({ req }: any): Promise<Context> => {
    const userInfo = await getUserFromTheToken(req.headers.authorization);
    return {
      prisma,
      userInfo,
    };
  },
  listen: { port: Number(process.env.PORT) || 4000 },
})
  .then(({ url }) => console.log(url))
  .catch((err) => console.log(err.message));
