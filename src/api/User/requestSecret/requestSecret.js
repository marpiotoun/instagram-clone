import { prisma } from "../../../../generated/prisma-client";
import { secretGenerator, sendSecretMail } from "../../../utils/mailUtils";

export default {
  Mutation: {
    requestSecret: async (_, { email }) => {
      const loginSecret = await secretGenerator();
      try {
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        await sendSecretMail(email, loginSecret);
        return true;
      } catch {
        return false;
      }
    },
  },
};
