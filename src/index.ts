import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { typeDefs } from "./schema";
import { Query, Mutation, Profile, Post, User } from "./resolvers";
import { getUserFromTheToken } from "./utils/getUserFromToken";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: {
    userId: number;
  } | null;
}

// interface MyApolloServerOptions
//   extends ApolloServerOptionsWithTypeDefs<BaseContext> {
//   context: Context;
// }

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Profile,
    Post,
    User,
  },
  //   contex: async ({ req }: any): Promise<Context> => {
  //     return {
  //       prisma,
  //     };
  //   },
});

// app.use(
//   // A named context function is required if you are not
//   // using ApolloServer<BaseContext>
//   expressMiddleware(server, {
//     context: async ({ req, res }) => ({
//       token: await getTokenForRequest(req),
//     }),
//   })
// );

startStandaloneServer(server, {
  context: async ({ req }: any): Promise<Context> => {
    const userInfo = await getUserFromTheToken(req.headers.authorization);
    return {
      prisma,
      userInfo,
    };
  },
})
  .then(({ url }) => console.log(url))
  .catch((err) => console.log(err.message));
