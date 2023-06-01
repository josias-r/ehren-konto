"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

interface GroupHeaderNavProps {
  groupName: string;
}

function GroupHeaderNav({ groupName }: GroupHeaderNavProps) {
  const params = useParams();

  return (
    <header className="mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold">{groupName}</h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href={`/group/${params.groupId}/activities`}>Activities</Link>
          </li>
          <li>
            <Link href={`/group/${params.groupId}/members`}>Members</Link>
          </li>
          <li>
            <Link href={`/group/${params.groupId}/settings`}>Settings</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default GroupHeaderNav;
