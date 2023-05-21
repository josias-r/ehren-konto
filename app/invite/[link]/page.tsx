import { buttonVariants } from "@/components/ui/button";
import getInviteLinkUser from "@/app/invite/[link]/getInviteLinkUser";
import InviteUserAvatar from "@/app/invite/[link]/InviteUserAvatar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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
    return notFound();
  }

  return (
    <main className="p-4 h-full max-w-md mx-auto grid items-center">
      <div>
        <InviteUserAvatar
          avatar={inviteLinkUser.avatar}
          name={inviteLinkUser.name}
        />

        <div className="text-center mt-12">
          <h1 className="text-2xl font-bold">You need to be logged in</h1>
          <p className="text-sm text-muted-foreground mb-4">
            You need to be logged in to accept an invite.
          </p>
          <div className="grid gap-2">
            <Link className={buttonVariants()} href="/signup">
              Sign up
            </Link>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/login"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Invite;
