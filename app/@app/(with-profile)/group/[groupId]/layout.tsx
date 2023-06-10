import GroupHeaderNav from "./GroupHeaderNav";
import getGroupName from "./getGroupName";

interface GroupLayoutProps {
  children: React.ReactNode;
  params: {
    groupId: string;
  };
}

async function GroupLayout({ children, params }: GroupLayoutProps) {
  const groupName = await getGroupName({
    groupId: parseInt(params.groupId),
  });
  return (
    <>
      <GroupHeaderNav groupName={groupName.name} />
      <main className="mx-auto max-w-md p-4">{children}</main>
    </>
  );
}

export default GroupLayout;
