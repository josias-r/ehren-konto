import { Button, buttonVariants } from "@/components/ui/button";
import { validateCookieToken } from "@/app/(auth)/validateCookieToken";
import BefriendUser from "@/app/invite/[link]/BefriendUser";
import getFriendshipExists from "@/app/invite/[link]/getFriendshipExists";
import getInviteLinkUser from "@/app/invite/[link]/getInviteLinkUser";
import InviteUserAvatar from "@/app/invite/[link]/InviteUserAvatar";
import Link from "next/link";
import { notFound } from "next/navigation";

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

async function Invite({
  params,
}: {
  params: {
    link: string;
  };
}) {
  const isLoggedIn = await validateCookieToken();
  const inviteLinkUser = await getInviteLinkUser(params.link);

  if (!inviteLinkUser) {
    return notFound();
  }

  if (isLoggedIn === false) {
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

  if (inviteLinkUser.userId === isLoggedIn.userId) {
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
    user2Id: isLoggedIn.userId,
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

export default Invite;
