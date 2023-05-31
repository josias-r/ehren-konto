"use client";

import Link from "next/link";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";

interface GroupHeaderNavProps {}

function GroupHeaderNav({}: GroupHeaderNavProps) {
  const segments = useSelectedLayoutSegments();
  const pathname = usePathname();
  const params = useParams();

  console.log("segments", segments);
  console.log("pathname", pathname);
  console.log("params", params);

  return (
    <header className="mx-auto max-w-md p-4">
      <nav>
        <ul className="flex gap-4">
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
