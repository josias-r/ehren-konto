import createAuthProtectedAction from "../auth/createAuthProtectedAction";
import { prisma } from "../prisma-client";

interface CompleteProfileArgs {
  name: string;
  nick: string;
}

export const completeProfile = createAuthProtectedAction(
  async (loggedInUserId, { name, nick }: CompleteProfileArgs) => {
    await prisma.user.update({
      where: { userId: loggedInUserId },
      data: { name, nick },
    });
  }
);
