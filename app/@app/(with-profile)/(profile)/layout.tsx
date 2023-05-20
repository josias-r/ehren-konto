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
      {avatar}
      {upcomingActivities}
      {happenings}
      {modal}
      {/* {children} */}
    </main>
  );
}

export default ProfileLayout;
