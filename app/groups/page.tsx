import GroupCard from "@/components/GroupCard";
import GroupItem from "@/components/GroupItem";
import Nav from "@/components/Nav";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";

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
};

const groups = [
  {
    id: "1",
    ...groupTemplate,
  },
  {
    id: "2",
    ...groupTemplate,
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
          />
        ))}
      </section>

      <Nav />
    </main>
  );
}
