import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils/passportUtils";

export default {
  Mutation: {
    confirmSecret: async (_, { email, secret }, { request }) => {
      const user = await prisma.user({ email });
      console.log(request);
      if (user?.loginSecret === secret) {
        return generateToken(user.id);
      } else {
        throw Error("Wrong email or secret key");
      }
    },
  },
};
