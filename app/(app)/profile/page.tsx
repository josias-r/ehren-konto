import Nav from "@/components/Nav";
import Transaction from "@/components/Transaction";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUserId } from "@/lib/auth/getUserId";
import UpcomingActivitiesSection from "@/lib/profile/UpcomingActivitiesSection";
import { getUpcomingActivities } from "@/lib/profile/getUpcomingActivities";
import Image from "next/image";

export const metadata = {
  title: "Profile",
  description: "Manage your profile, see upcoming events and more",
};

export default async function Profile() {
  const userId = getUserId();

  const upcomingActivities = await getUpcomingActivities(userId);

  const hasUpcomingActivities =
    !!upcomingActivities.today.length &&
    !!upcomingActivities.nextSevenDays.length &&
    !!upcomingActivities.nextThirtyDays.length;

  return (
    <main className="relative">
      {!hasUpcomingActivities && (
        <section className="flex flex-col items-center justify-center h-full">
          no upcoming activities
        </section>
      )}
      {!!upcomingActivities.today.length && (
        <UpcomingActivitiesSection
          title="Today"
          activities={upcomingActivities.today}
        />
      )}
      <section className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            History
            <p className="text-sm text-muted-foreground">
              History of earned honor-points
            </p>
          </CardHeader>
          <CardContent>
            <Transaction
              name="Josias Ribi"
              email="josias.ribi@gmail.com"
              amount={1}
              avatar={{
                url: "https://avatars.githubusercontent.com/u/1024025?v=4",
                fallback: "JR",
              }}
            />
            <Transaction
              name="Manuel Kauderer"
              email="manuel.kauderer@gmx.ch"
              amount={1}
              avatar={{
                url: "https://avatars.githubusercontent.com/u/1024035?v=4",
                fallback: "MK",
              }}
            />
          </CardContent>
        </Card>
      </section>

      <Nav />
    </main>
  );
}
