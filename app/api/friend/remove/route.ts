import * as yup from "yup";
import parseAndValidateJSONBody from "../../handlers/parseAndValidateJSONBody";
import handleNextError from "../../handlers/handleNextError";
import { NextResponse } from "next/server";
import authProtectAPI from "../../handlers/authProtectAPI";
import { prisma } from "@/lib/prisma-client";

const schema = yup.object().shape({
  userIds: yup.array().of(yup.string().required()).required(),
});

export type RemoveFriendPayload = yup.InferType<typeof schema>;

export async function PATCH(request: Request) {
  try {
    const loggedInUser = authProtectAPI();

    const { userIds } = await parseAndValidateJSONBody(request, schema);

    await prisma.friendship.deleteMany({
      where: {
        OR: [
          {
            outgoingUserId: loggedInUser.userId,
            incomingUserId: {
              in: userIds,
            },
          },
          {
            incomingUserId: loggedInUser.userId,
            outgoingUserId: {
              in: userIds,
            },
          },
        ],
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return handleNextError(error);
  }
}

export type RemoveFriendResponse = Awaited<ReturnType<typeof PATCH>>;
