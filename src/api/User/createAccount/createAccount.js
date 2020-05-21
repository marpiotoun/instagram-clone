import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, { username, email, firstName, lastName, bio }) => {
      return await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
      });
    },
  },
};
