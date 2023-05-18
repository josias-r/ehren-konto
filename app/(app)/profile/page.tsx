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
    !!upcomingActivities.today.length ||
    !!upcomingActivities.nextSevenDays.length ||
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
          groupedActivities={upcomingActivities.today}
        />
      )}
      {!!upcomingActivities.nextSevenDays.length && (
        <UpcomingActivitiesSection
          title="Next 7 days"
          groupedActivities={upcomingActivities.nextSevenDays}
        />
      )}
      {!!upcomingActivities.nextThirtyDays.length && (
        <UpcomingActivitiesSection
          title="Next 30 days"
          groupedActivities={upcomingActivities.nextThirtyDays}
        />
      )}

      <Nav />
    </main>
  );
}
