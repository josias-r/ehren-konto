import { notFound } from "next/navigation";

// TODOs:
//
// ACTIONS
// --- user actions
// - [🚨] forgot password
// - [🚨] delete account
// - [ ] reset password
// - [ ] verify email
// - [ ] resend verification email
// --- group actions
// - [ ] restrict to admin role
//
// UI
// --- homepage 🚨
// --- user
// - [ ] group overview
// - [🚨] account settings (email, password, delete)
// - [🚨] i18n
// --- group
// - [ ] group member role management
// - [ ] group member popover
// - [ ] group member admin action hidden/greyed out
// - [ ] group activity participants: sorting + scrollable
// --- notifications
// - [ ] group updates
// - [ ] activity updates
// - [ ] friend request notification
// - [ ] achievements (reached points e.g.)
// --- activity
// - [🚨] delete activity
// - [ ] repeating activity (daily, weekly, monthly, yearly)
// - [ ] one time activity (i.e. won a tournament)
// - [ ] to date
// - [ ] add to calendar
// --- misc
// - [🚨] loading state optimizations
// - [🚨] revalidate path flimmsy
// - [ ] push notifications
// - [ ] error handling

export const metadata = {
  title: "Ehre",
  description:
    "Experience more with your friends by easily creating and participating in activities together!",
};

export default function Home() {
  notFound();
}
