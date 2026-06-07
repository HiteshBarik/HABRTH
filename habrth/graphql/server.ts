import { ApolloServer } from "@apollo/server";
import { habitTypeDefs } from "@/graphql/typeDefs/habit.typeDefs";
import { habitResolver } from "@/graphql/resolvers/habit.resolver";

type ResolverGroup = {
  Query?: Record<string, (...args: unknown[]) => unknown>;
  Mutation?: Record<string, (...args: unknown[]) => unknown>;
};

type MergedResolvers = {
  Query: Record<string, (...args: unknown[]) => unknown>;
  Mutation: Record<string, (...args: unknown[]) => unknown>;
};

const mergeResolvers = (resolvers: unknown[]): MergedResolvers => {
  return resolvers.reduce<MergedResolvers>(
    (acc, resolver) => {
      const group = resolver as ResolverGroup;

      if (group.Query) {
        acc.Query = { ...acc.Query, ...group.Query };
      }

      if (group.Mutation) {
        acc.Mutation = { ...acc.Mutation, ...group.Mutation };
      }

      return acc;
    },
    {
      Query: {},
      Mutation: {},
    },
  );
};

const mergedResolvers = mergeResolvers([habitResolver]);

export const apolloServer = new ApolloServer({
  typeDefs: [habitTypeDefs],
  resolvers: mergedResolvers,
});

export const apolloServerStart = apolloServer.start();
