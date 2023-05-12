import GroupItem from "@/components/GroupItem";
import Nav from "@/components/Nav";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Plus, X } from "lucide-react";

export default function Home() {
  return (
    <main className="relative">
      <section className="mx-auto p-8 max-w-md grid gap-4">
        <Card>
          <CardHeader>
            Group XY
            <p className="text-sm text-muted-foreground mb-2">
              We are a cool group
            </p>
            <div className="flex gap-2">
              <div className="flex w-12 h-12 rounded bg-cyan-300/50">
                <span className="m-auto">⛺️</span>
              </div>
              <div className="flex w-12 h-12 rounded bg-cyan-300/50">
                <span className="m-auto">⛺️</span>
              </div>
              <div className="flex w-12 h-12 rounded bg-amber-100/40">
                <span className="m-auto">🚤</span>
              </div>
              <div className="flex w-12 h-12 rounded bg-white/5">
                <span className="m-auto">🍺</span>
              </div>
              <div className="flex w-12 h-12 rounded bg-white/5">
                <span className="m-auto">😢</span>
              </div>

              <div className="flex w-12 h-12 rounded bg-white/5">
                <span className="m-auto">+5</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <GroupItem
              name="Josias Ribi"
              role="admin"
              amount={7}
              avatar={{
                url: "https://avatars.githubusercontent.com/u/1024025?v=4",
                fallback: "JR",
              }}
            />
            <GroupItem
              name="Manuel Kauderer"
              role="member"
              amount={5}
              avatar={{
                url: "https://avatars.githubusercontent.com/u/1024035?v=4",
                fallback: "MK",
              }}
            />
            <Separator />
            <div className="flex justify-between items-center text-sm mt-4">
              <div>Show 5 more</div>
              <div>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            Group 3
            <p className="text-sm text-muted-foreground mb-2">
              We are a cool group
            </p>
            <div className="flex gap-2">
              <div className="flex w-12 h-12 rounded bg-amber-100/40">
                <span className="m-auto">🚽</span>
              </div>
              <div className="flex w-12 h-12 rounded bg-white/5">
                <span className="m-auto">❄️</span>
              </div>
              <div className="flex w-12 h-12 rounded bg-white/5">
                <span className="m-auto">🧹</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <GroupItem
              name="Josias Ribi"
              role="admin"
              amount={-1}
              avatar={{
                url: "https://avatars.githubusercontent.com/u/1024025?v=4",
                fallback: "JR",
              }}
            />
            <GroupItem
              name="Manuel Kauderer"
              role="member"
              amount={3}
              avatar={{
                url: "https://avatars.githubusercontent.com/u/1024035?v=4",
                fallback: "MK",
              }}
            />
            <Separator />
            <div className="flex justify-between items-center text-sm mt-4">
              <div>Show 3 more</div>
              <div>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <div>
        <Nav />
      </div>
    </main>
  );
}
