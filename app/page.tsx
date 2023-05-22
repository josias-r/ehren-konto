import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Ehre",
  description: "Experience more with your friends",
};

function Home() {
  return (
    <main className="p-4">
      <section className="max-w-2xl mx-auto pt-2 flex justify-between">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Ehre logo"
            width={45}
            height={45}
            className="block"
          />
          <div className="px-4">
            <strong>Ehre</strong>
          </div>
        </div>
        <div>
          <Link
            href="/signup"
            className={buttonVariants({
              size: "sm",
            })}
          >
            Join
          </Link>
        </div>
      </section>

      <section className="mt-[-40px] mb-14">
        <div className="overflow-visible z-[-1] relative overflow-x-hidden -mx-4">
          <div className="relative left-1/2 -translate-x-1/2 w-[682.92px] h-[502.74px] md:w-[975.6px] md:h-[718.2px]">
            <Image
              src="/gradient-backdrop.png"
              alt="gradient backdrop"
              width={975.6}
              height={718.2}
              className="block  w-[682.92px] h-[502.74px] md:w-[975.6px] md:h-[718.2px] z-[-1]"
            />
            <Image
              src="/screenshot-upcoming.png"
              alt="gradient backdrop"
              width={517 * 0.8}
              height={546 * 0.8}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%]"
            />
          </div>
        </div>
        <h1 className="font-bold text-2xl md:text-4xl text-center mt-[-100px] z-10">
          <span>Experience</span> more <br />
          with your friends
        </h1>
        <p className="mt-8 text-sm text-muted-foreground text-center">
          Create, plan and participate in activities together!
        </p>
      </section>
      <section className="max-w-2xl mx-auto grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Never miss an event</CardTitle>
            <CardDescription>
              Get notified about all your friends&apos; activities
            </CardDescription>
          </CardHeader>
          {/* <CardContent>XX</CardContent> */}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Earn points</CardTitle>
            <CardDescription>
              Compete against your friends in each group
            </CardDescription>
          </CardHeader>
          {/* <CardContent>XX</CardContent> */}
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Organize groups</CardTitle>
            <CardDescription>
              Plan events and activities in groups, such as your close friends,
              your class or your family
            </CardDescription>
          </CardHeader>
          {/* <CardContent>XX</CardContent> */}
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              More features
              <Badge
                variant="outline"
                className="inline-block ml-3 -translate-y-1"
              >
                coming soon
              </Badge>
            </CardTitle>
            <CardDescription>
              Repeating events, polls, group invites, and more!
            </CardDescription>
          </CardHeader>
          {/* <CardContent>XX</CardContent> */}
        </Card>
      </section>

      <section className="max-w-2xl mx-auto mt-12 mb-16 space-y-4">
        <Link
          href="/signup"
          className={cn(
            buttonVariants({
              // variant: "outline",
            }),
            "w-full block text-center"
          )}
        >
          Get started
        </Link>
        <Link
          href="https://forms.gle/TR7sFSrDxPk1rNkz7"
          target="_blank"
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "w-full block text-center"
          )}
        >
          Give feedback
        </Link>
      </section>
    </main>
  );
}

export default Home;
