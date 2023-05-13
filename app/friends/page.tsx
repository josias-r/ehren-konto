import { PrismaClient } from "@prisma/client";
import Nav from "@/components/Nav";

const josiasTemplate = {
  name: "Josias Ribi",
  nickname: "josias-r",
  avatar: {
    url: "https://avatars.githubusercontent.com/u/1024025?v=4",
    fallback: "JR",
  },
};

const friends = [
  {
    id: "1",
    ...josiasTemplate,
  },
];

const prisma = new PrismaClient();

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <main className="relative">
      {JSON.stringify(users)}
      <section className="mx-auto p-8 max-w-md grid gap-4">
        {friends.map((friend) => (
          <div key={friend.id}>afriend</div>
        ))}
      </section>

      <Nav />
    </main>
  );
}
