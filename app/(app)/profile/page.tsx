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
import { EmptyState } from "@/components/ui/empty-state";
import geProfileData from "@/lib/user/getProfileData";
import ProfileAvatar from "@/lib/profile/ProfileAvatar";

export const metadata = {
  title: "Profile",
  description: "Manage your profile, see upcoming events and more",
};

export default async function Profile() {
  const userId = await getUserId();

  const upcomingActivities = await getUpcomingActivities(userId);
  const profileData = await geProfileData(userId);
  if (!profileData) {
    throw new Error("profile data not found");
  }

  const hasUpcomingActivities =
    !!upcomingActivities.today.length ||
    !!upcomingActivities.nextSevenDays.length ||
    !!upcomingActivities.nextThirtyDays.length;

  const relevantHappenings = await getRelevantHappenings(userId);

  return (
    <main className="relative p-4 space-y-4">
      <div className="mx-auto max-w-md flex justify-end">
        <ProfileAvatar name={profileData.name} avatar={profileData.avatar} />
      </div>
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
          {!!relevantHappenings.length && (
            <div className="space-y-4">
              {relevantHappenings.map((happening) => (
                <HappeningItem
                  key={happening.happeningsId}
                  happening={happening}
                />
              ))}
            </div>
          )}
          {!relevantHappenings.length && (
            <div className="mt-6">
              <EmptyState
                title="Empty"
                message="Nothing is happening right now"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
