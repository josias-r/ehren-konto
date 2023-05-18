import { NormalizedUpcomingActivities } from "./getUpcomingActivities";
import UpcomingActivityItem from "./UpcomingActivityItem";
import { Fragment } from "react";
import { Badge } from "@/components/ui/badge";

interface UpcomingActivitiesSectionProps {
  title: string;
  groupedActivities: NormalizedUpcomingActivities;
}

const groupColors = [
  // #32B9C3
  // rgb(50, 185, 195)
  // hsl(184deg, 59%, 48%)
  [
    "[--item-color-r:50]",
    "[--item-color-g:185]",
    "[--item-color-b:195]",
    "[--item-color-h:184]",
    "[--item-color-s:59]",
    "[--item-color-l:48]",
  ],
  // #F78C45
  // rgb(247, 140, 69)
  // hsl(24deg, 92%, 62%)
  [
    "[--item-color-r:247]",
    "[--item-color-g:140]",
    "[--item-color-b:69]",
    "[--item-color-h:24]",
    "[--item-color-s:92]",
    "[--item-color-l:62]",
  ],
  // #1D4279
  // rgb(29, 66, 121)
  // hsl(216deg, 61%, 29%)
  [
    "[--item-color-r:29]",
    "[--item-color-g:66]",
    "[--item-color-b:121]",
    "[--item-color-h:216]",
    "[--item-color-s:61]",
    "[--item-color-l:29]",
  ],
  // // #7231F4
  // // rgb(114, 49, 244)
  // // hsl(260deg, 90%, 57%)
  // [
  //   "[--item-color-r:114]",
  //   "[--item-color-g:49]",
  //   "[--item-color-b:244]",
  //   "[--item-color-h:260]",
  //   "[--item-color-s:89]",
  //   "[--item-color-l:57]",
  // ],
];

function getRotatedGroupColorByIndex(index: number) {
  return groupColors[index % groupColors.length];
}

function UpcomingActivitiesSection({
  title,
  groupedActivities,
}: UpcomingActivitiesSectionProps) {
  return (
    <section className="grid gap-2">
      <h3 className="text-muted-foreground text-sm">{title}</h3>
      <div className="upcoming-activity-container">
        {groupedActivities.map(([groupId, group], groupIndex) => {
          return (
            <Fragment key={groupId}>
              {group.activities.map((activity, index) => (
                <UpcomingActivityItem
                  color={getRotatedGroupColorByIndex(groupIndex).join(" ")}
                  isFirstInGroup={index === 0}
                  isLastInGroup={index === group.activities.length - 1}
                  key={activity.activityId}
                  activity={activity}
                />
              ))}
            </Fragment>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {groupedActivities.map(([groupId, group], groupIndex) => (
          <div key={groupId} className="flex">
            <Badge
              variant="colors"
              className={getRotatedGroupColorByIndex(groupIndex).join(" ")}
            >
              {group.name}
            </Badge>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UpcomingActivitiesSection;
