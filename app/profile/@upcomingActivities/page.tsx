import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpcomingActivitiesSection from "./UpcomingActivitiesSection";
import { getUpcomingActivities } from "./getUpcomingActivities";
import { getUserId } from "@/lib/auth/getUserId";

async function UpcomingActivities() {
  const userId = getUserId();
  const upcomingActivities = await getUpcomingActivities(userId);

  const hasUpcomingActivities =
    !!upcomingActivities.today.length ||
    !!upcomingActivities.nextSevenDays.length ||
    !!upcomingActivities.nextThirtyDays.length;

  if (!hasUpcomingActivities) {
    return null;
  }

  return (
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
  );
}

export default UpcomingActivities;
