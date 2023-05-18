interface UpcomingActivitiesSectionProps {
  title: string;
  activities: {
    activityId: number;
    from: Date;
    emoji: string;
    Group: {
      groupId: number;
      name: string;
    };
  }[];
}

function UpcomingActivitiesSection({}: UpcomingActivitiesSectionProps) {
  return <section>XX</section>;
}

export default UpcomingActivitiesSection;
