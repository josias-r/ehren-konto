import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Profile",
  description: "See what's happening",
};

function ProfileLayout({
  // children,
  modal,
  upcomingActivities,
  avatar,
  happenings,
}: {
  // children: React.ReactNode;
  modal: React.ReactNode;
  upcomingActivities: React.ReactNode;
  avatar: React.ReactNode;
  happenings: React.ReactNode;
}) {
  return (
    <main className="relative p-4 space-y-4">
      <div className="max-w-md mx-auto">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>alpha version</AlertTitle>
          <AlertDescription>
            This app is still in development. <br />
            Please{" "}
            <Link
              href="https://forms.gle/TR7sFSrDxPk1rNkz7"
              target="_blank"
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "p-0 inline"
              )}
            >
              share your feedback by clicking this link.
            </Link>
          </AlertDescription>
        </Alert>
      </div>

      {avatar}
      {upcomingActivities}
      {happenings}
      {modal}
      {/* {children} */}
    </main>
  );
}

export default ProfileLayout;
