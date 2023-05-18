function GroupsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <main className="relative">
      <h1 className="text-2xl font-bold mb-4 mx-auto max-w-md pt-6 px-4 flex justify-between">
        <span>Groups</span>
        {/* <CreateGroupSheet friends={userFriends} friendGroups={userGroups}>
          <Button variant="outline">Create group</Button>
        </CreateGroupSheet> */}
      </h1>
      {children}
      {modal}
    </main>
  );
}

export default GroupsLayout;
