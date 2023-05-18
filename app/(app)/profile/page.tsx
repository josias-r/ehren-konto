import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserId } from "@/lib/auth/getUserId";
import HappeningItem from "@/lib/profile/happenings/HappeningItem";
import UpcomingActivitiesSection from "@/lib/profile/UpcomingActivitiesSection";
import getRelevantHappenings from "@/lib/profile/getRelevantHappenings";
import { getUpcomingActivities } from "@/lib/profile/getUpcomingActivities";

export const metadata = {
  title: "Profile",
  description: "Manage your profile, see upcoming events and more",
};

export default async function Profile() {
  const userId = await getUserId();

  const upcomingActivities = await getUpcomingActivities(userId);

  const hasUpcomingActivities =
    !!upcomingActivities.today.length ||
    !!upcomingActivities.nextSevenDays.length ||
    !!upcomingActivities.nextThirtyDays.length;

  const relevantHappenings = await getRelevantHappenings(userId);

  return (
    <main className="relative p-4 space-y-4">
      {!hasUpcomingActivities && (
        <section className="flex flex-col items-center justify-center h-full">
          no upcoming activities
        </section>
      )}
      {hasUpcomingActivities && (
        <>
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle>Upcoming activities</CardTitle>
              <CardDescription>See what&apos;s coming up soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full grid gap-4">
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
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Happenings</CardTitle>
          <CardDescription>What is happening?</CardDescription>
        </CardHeader>
        <CardContent>
          {relevantHappenings.map((happening) => (
            <HappeningItem key={happening.happeningsId} happening={happening} />
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
