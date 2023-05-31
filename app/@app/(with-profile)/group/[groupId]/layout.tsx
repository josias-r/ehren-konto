import Link from "next/link";
import GroupHeaderNav from "./GroupHeaderNav";

interface GroupLayoutProps {
  children: React.ReactNode;
}

function GroupLayout({ children }: GroupLayoutProps) {
  return (
    <>
      <GroupHeaderNav />
      <main className="mx-auto max-w-md p-4">{children}</main>
    </>
  );
}

export default GroupLayout;
