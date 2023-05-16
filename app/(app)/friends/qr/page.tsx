import { Button, buttonVariants } from "@/components/ui/button";
import QrCode from "@/lib/friend/QrCode";
import { updateInviteLink } from "@/lib/friend/actions";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Qr",
  description: "Add and manage your friends.",
};

export default async function Qr() {
  const linkId = await updateInviteLink();

  return (
    <main className="p-4 h-full max-w-md mx-auto grid items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">This is your QR code</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Your friend can scan this code with any QR code scanner to add you as
          a friend.
        </p>
        <QrCode linkId={linkId} />
        <Link
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "mt-8"
          )}
          href="/friends"
        >
          Close
        </Link>
      </div>
    </main>
  );
}
