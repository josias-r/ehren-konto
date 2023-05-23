import { buttonVariants } from "@/components/ui/button";
import getInviteLinkUser from "@/app/invite/[link]/getInviteLinkUser";
import InviteUserAvatar from "@/app/invite/[link]/InviteUserAvatar";
import Link from "next/link";
import { Metadata } from "next";
import InviteLinkWrapper from "./InviteLinkWrapper";

export async function generateMetadata({
  params,
}: {
  params: { link: string };
}): Promise<Metadata> {
  // read route params
  const inviteLinkUser = await getInviteLinkUser(params.link);

  return {
    title: "Connect on ehre",
    description: inviteLinkUser
      ? `${inviteLinkUser.name} invited you to connect on ehre`
      : "Connect with friends and family on ehre",
  };
}

async function Invite({
  params,
}: {
  params: {
    link: string;
  };
}) {
  const inviteLinkUser = await getInviteLinkUser(params.link);

  if (!inviteLinkUser) {
    return (
      <InviteLinkWrapper>
        <div>
          <div className="text-center mt-12">
            <h1 className="text-2xl font-bold mb-2">Link not found</h1>
            <p className="text-sm text-muted-foreground mb-4">
              This invite link has probably expired.
            </p>
          </div>
        </div>
      </InviteLinkWrapper>
    );
  }
  return (
    <InviteLinkWrapper>
      <div>
        <InviteUserAvatar
          avatar={inviteLinkUser.avatar}
          name={inviteLinkUser.name}
        />

        <div className="text-center mt-12">
          <h1 className="text-2xl font-bold">You need to be logged in</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Log in to accept an invite.
          </p>
          <div className="grid gap-2">
            <Link className={buttonVariants()} href="/login">
              Sign in
            </Link>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/signup"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </InviteLinkWrapper>
  );
}

export default Invite;
