import { redirect } from "next/navigation";
import getProfileIsIncomplete from "../complete-profile/getProfileIsIncomplete";
import Nav from "@/components/Nav";

interface WithProfileLayoutProps {
  children: React.ReactNode;
}

async function WithProfileLayout({ children }: WithProfileLayoutProps) {
  const profileIsIncomplete = await getProfileIsIncomplete();

  if (profileIsIncomplete) {
    redirect("/complete-profile");
  }

  return (
    <>
      {children}
      <Nav />
    </>
  );
}

export default WithProfileLayout;
