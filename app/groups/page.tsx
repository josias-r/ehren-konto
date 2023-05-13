import GroupCard from "@/components/GroupCard";
import Nav from "@/components/Nav";
import { prisma } from "@/lib/utilities/prisma-client";

export default async function Groups() {
  // get all groups from prisma where user with id "X" is in
  const groups = await prisma.group.findMany({
    where: {
      users: {
        some: {
          userId: 1,
        },
      },
    },
  });

  // return comp
  return (
    <main className="relative">
      <section className="mx-auto p-8 max-w-md grid gap-4">
        {groups.map((group) => (
          <div key="id">
            {/* <GroupCard
              key={group.id}
              id={group.id}
              name={group.name}
              description={group.description}
              members={group.members}
              events={group.events}
            /> */}
          </div>
        ))}
      </section>

      <Nav />
    </main>
  );
}
