import * as yup from "yup";
import { getActivityColors } from "@/lib/activity/utilities/activity-colors";
import parseAndValidateJSONBody from "../../handlers/parseAndValidateJSONBody";
import handleNextError from "../../handlers/handleNextError";
import { NextResponse } from "next/server";
import authProtectAPI from "../../handlers/authProtectAPI";
import { prisma } from "@/lib/prisma-client";

const schema = yup.object().shape({
  activityId: yup.number().required(),
  name: yup.string().required(),
  from: yup.date().required(),
  emoji: yup.string().required(),
  color: yup.string().oneOf(getActivityColors()).required(),
});

export type EditActivityPayload = yup.InferType<typeof schema>;

export async function PATCH(request: Request) {
  try {
    authProtectAPI();

    const { activityId, name, from, emoji, color } =
      await parseAndValidateJSONBody(request, schema);

    const updatedActivity = await prisma.activity.update({
      where: { activityId },
      data: {
        name,
        from,
        emoji,
        color,
      },
    });

    return NextResponse.json({
      success: true,
      activityId: updatedActivity.activityId,
    });
  } catch (error) {
    return handleNextError(error);
  }
}

export type EditActivityResponse = Awaited<ReturnType<typeof PATCH>>;
