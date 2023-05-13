import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// TODOs:
// create group
// update group
// delete group

// create event
// update event
// delete event

// friends system

export default function Home() {
  return (
    <main className="p-8 flex h-full z-10 relative">
      <div className="m-auto mb-24 w-full max-w-md">
        <Image
          src="/Ehre-bright.svg"
          alt="Ehre logo"
          width={200}
          height={200}
          className="mx-auto mb-[30vh]"
        />
        <Input className="mb-4" type="text" placeholder="Username" />
        <Input className="mb-4" type="password" placeholder="Password" />
        <Button className="block relative w-full">Sign in</Button>
        <Separator className="my-4" />
        <Button variant="outline" className="block relative w-full">
          Sign up
        </Button>
      </div>
      {/* <div className="fixed inset-0 -m-8 -z-10">
        <Image
          className="absolute inset-0 w-full h-full -translate-y-64 object-cover blur-xl opacity-90"
          src="/bg-mountain-transparent.png"
          alt="gradient background image"
          width={50}
          height={50}
        />
      </div> */}
    </main>
  );
}
