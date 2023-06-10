import * as yup from "yup";
import parseAndValidateJSONBody from "../../handlers/parseAndValidateJSONBody";
import handleNextError from "../../handlers/handleNextError";
import { NextResponse } from "next/server";
import authProtectAPI from "../../handlers/authProtectAPI";
import { prisma } from "@/lib/prisma-client";

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  members: yup.array().of(yup.string().required()).required(),
});

export type CreateGroupPayload = yup.InferType<typeof schema>;

export async function PUT(request: Request) {
  try {
    const loggedInUser = authProtectAPI();

    const { name, description, members } = await parseAndValidateJSONBody(
      request,
      schema
    );

    const createdGroup = await prisma.group.create({
      data: {
        name,
        description,
        GroupMembers: {
          create: [
            ...members.map((userId) => ({ userId })),
            // Add the creator to the group
            { userId: loggedInUser.userId },
          ],
        },
      },
    });

    return NextResponse.json({
      success: true,
      createdGroup: createdGroup.groupId,
    });
  } catch (error) {
    return handleNextError(error);
  }
}

export type CreateGroupResponse = Awaited<ReturnType<typeof PUT>>;
