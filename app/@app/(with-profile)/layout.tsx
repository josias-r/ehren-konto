import { redirect } from "next/navigation";
import getProfileIsIncomplete from "../complete-profile/getProfileIsIncomplete";
import Nav from "@/components/Nav";
import UserProvider from "./UserProvider";
import getUserData from "./getUserData";

interface WithProfileLayoutProps {
  children: React.ReactNode;
}

async function WithProfileLayout({ children }: WithProfileLayoutProps) {
  const profileIsIncomplete = await getProfileIsIncomplete();

  if (profileIsIncomplete) {
    redirect("/complete-profile");
  }

  const user = await getUserData();

  return (
    <UserProvider user={user}>
      <div className="relative h-full flex flex-col">
        <div className="flex-grow flex-shrink h-full overflow-auto">
          {children}
        </div>
        <Nav />
      </div>
    </UserProvider>
  );
}

export default WithProfileLayout;
