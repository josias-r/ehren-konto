import GroupCard from "@/components/GroupCard";
import Nav from "@/components/Nav";
import { validateCookieToken } from "@/lib/auth.server";
import getAllGroupsForUser from "@/lib/group/getAllGroupsForUser";
import { redirect } from "next/navigation";

export default async function Groups() {
  const isLoggedIn = await validateCookieToken();
  if (isLoggedIn === false) {
    redirect("/login");
  }
  // get all groups from prisma where user with id "X" is in
  const groups = await getAllGroupsForUser(isLoggedIn.userId);

  // return comp
  return (
    <main className="relative">
      <section className="mx-auto p-8 max-w-md grid gap-4">
        {groups?.map((group) => (
          <GroupCard
            key={group.groupId}
            id={group.groupId}
            name={group.name}
            description={group.description}
            members={group.members}
            activities={group.activities}
          />
        ))}
      </section>

      <Nav />
    </main>
  );
}
