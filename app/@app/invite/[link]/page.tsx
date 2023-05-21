import { Button, buttonVariants } from "@/components/ui/button";
import BefriendUser from "@/app/invite/[link]/BefriendUser";
import getFriendshipExists from "@/app/invite/[link]/getFriendshipExists";
import getInviteLinkUser from "@/app/invite/[link]/getInviteLinkUser";
import InviteUserAvatar from "@/app/invite/[link]/InviteUserAvatar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserId } from "@/app/(auth)/getUserId";
import { Metadata } from "next";

function BackToFriends() {
  return (
    <Link
      className={buttonVariants({
        variant: "outline",
      })}
      href="/friends"
    >
      Close
    </Link>
  );
}

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

interface InvitePageProps {
  params: {
    link: string;
  };
}

async function InvitePage({ params }: InvitePageProps) {
  const inviteLinkUser = await getInviteLinkUser(params.link);

  const userId = getUserId();

  if (!inviteLinkUser) {
    return notFound();
  }

  if (inviteLinkUser.userId === userId) {
    return (
      <main className="p-4 h-full max-w-xs mx-auto grid items-center">
        <div className="grid gap-4">
          <InviteUserAvatar
            avatar={inviteLinkUser.avatar}
            name={inviteLinkUser.name}
          />

          <p className="text-muted-foreground text-center text-sm">
            Nice try, but you can&apos;t invite yourself 😉
          </p>

          <div className="grid gap-2">
            <Button disabled>Accept invite</Button>
            <BackToFriends />
          </div>
        </div>
      </main>
    );
  }

  const friendShipExists = await getFriendshipExists({
    user1Id: inviteLinkUser.userId,
    user2Id: userId,
  });

  if (friendShipExists) {
    return (
      <main className="p-4 h-full max-w-xs mx-auto grid items-center">
        <div className="grid gap-4">
          <InviteUserAvatar
            avatar={inviteLinkUser.avatar}
            name={inviteLinkUser.name}
          />

          <p className="text-muted-foreground text-center text-sm">
            You&apos;re already friends with {inviteLinkUser.name}!
          </p>

          <div className="grid gap-2">
            <Button disabled>Accept invite</Button>
            <BackToFriends />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 h-full max-w-xs mx-auto grid items-center">
      <div className="grid gap-8">
        <InviteUserAvatar
          avatar={inviteLinkUser.avatar}
          name={inviteLinkUser.name}
        />

        <div className="grid gap-2">
          <BefriendUser inviteLink={params.link} />
          <BackToFriends />
        </div>
      </div>
    </main>
  );
}

export default InvitePage;
