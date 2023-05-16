import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { notFound } from "next/navigation";

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

export const metadata = {
  title: "Ehre",
  description:
    "Experience more with your friends by easily creating and participating in activities together!",
};

export default function Home() {
  notFound();
  return <main>WIP</main>;
}
