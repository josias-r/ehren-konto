import GroupCard from "@/components/GroupCard";
import Nav from "@/components/Nav";

const josiasTemplate = {
  name: "Josias Ribi",
  nickname: "josias-r",
  role: "admin",
  ehre: 1,
  avatar: {
    url: "https://avatars.githubusercontent.com/u/1024025?v=4",
    fallback: "JR",
  },
};

const inTheFuture = new Date();

inTheFuture.setMinutes(inTheFuture.getMinutes() + 60 * 12);

const eventTemplate = {
  emoji: "🏖",
  color: "sunset" as const,
  name: "Beach Day",
  date: inTheFuture.toISOString(),
  members: [],
};

const groupTemplate = {
  name: "Group XY",
  description: "We are a cool group",
  members: [
    {
      id: "1",
      ...josiasTemplate,
    },
    {
      id: "2",
      name: "Manuel Kauderer",
      nickname: "manu",
      role: "member",
      ehre: 3,
      avatar: {
        url: "https://avatars.githubusercontent.com/u/1024035?v=4",
        fallback: "MK",
      },
    },
    {
      id: "3",
      ...josiasTemplate,
    },
    {
      id: "4",
      ...josiasTemplate,
    },
    {
      id: "5",
      ...josiasTemplate,
    },
    {
      id: "6",
      ...josiasTemplate,
    },
  ],
  events: [
    {
      id: "1",
      emoji: "☀️",
      color: "sunset" as const,
      name: "Go to the lake",
      date: "2021-10-10",
      members: ["1"],
    },
    {
      id: "2",
      ...eventTemplate,
    },
    {
      id: "3",
      ...eventTemplate,
    },
    {
      id: "4",
      ...eventTemplate,
    },
    {
      id: "5",
      emoji: "🥊",
      color: "mars" as const,
      name: "Lucky punch",
      date: "2021-10-10",
      members: ["1"],
    },
    {
      id: "6",
      emoji: "🍻",
      color: "ice" as const,
      name: "Beer",
      date: "2021-10-10",
      members: [],
    },
  ],
};

const groups = [
  {
    id: "1",
    ...groupTemplate,
  },
  {
    id: "2",
    ...groupTemplate,
    events: groupTemplate.events.slice(0, 3),
  },
];

export default function Home() {
  return (
    <main className="relative">
      <section className="mx-auto p-8 max-w-md grid gap-4">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            id={group.id}
            name={group.name}
            description={group.description}
            members={group.members}
            events={group.events}
          />
        ))}
      </section>

      <Nav />
    </main>
  );
}
