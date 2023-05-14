import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// TODOs:
//
// ACTIONS
// --- user actions
// - [ ] sign in
// - [ ] sign up
// - [ ] forgot password
// - [ ] reset password
// - [ ] resend verification email
// - [ ] verify email
// - [ ] delete account
// --- friend actions
// - [ ] add friendship from code/link
// - [ ] add friendship from group members
// - [ ] remove friendship friend
// --- group actions
// - [ ] restrict to admin role
//
// UI
// --- user
// - [ ] profile page
// - [ ] group overview
// - [ ] upcoming events
// - [ ] history
// - [ ] account settings (email, password, delete)
// --- group
// - [ ] group member popover
// - [ ] group member role management
// - [ ] group member admin action hidden/greyed out
// - [ ] group activity participants: sorting + scrollable
// --- notifications
// - [ ] activity participation notification
// - [ ] activity reward notification
// - [ ] friend request notification
// --- activity
// - [ ] repeating activity (daily, weekly, monthly, yearly)
// - [ ] one time activity (i.e. won a tournament)
// - [ ] to date
// - [ ] add to calendar
// friends
// - [ ] qr code screen
// - [ ] scan qr code screen (use camera app?)
// - [ ] copy link button + toast confirmation

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
