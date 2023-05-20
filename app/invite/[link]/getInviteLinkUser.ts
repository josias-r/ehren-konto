import isUserInviteLinkNotExpired from "./isUserInviteLinkNotExpired";
import { db } from "@/lib/kysely-client";

async function getInviteLinkUser(inviteLink: string) {
  const user = await db
    .selectFrom("User")
    .where("inviteLink", "=", inviteLink)
    .select(["userId", "name", "avatar", "inviteLinkCreateDate"])
    .executeTakeFirst();

  if (isUserInviteLinkNotExpired(user?.inviteLinkCreateDate)) {
    return user;
  }
}

export default getInviteLinkUser;
