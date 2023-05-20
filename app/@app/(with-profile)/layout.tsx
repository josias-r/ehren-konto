import { redirect } from "next/navigation";
import getProfileIsIncomplete from "../complete-profile/getProfileIsIncomplete";

interface WithProfileLayoutProps {
  children: React.ReactNode;
}

async function WithProfileLayout({ children }: WithProfileLayoutProps) {
  const profileIsIncomplete = await getProfileIsIncomplete();

  if (profileIsIncomplete) {
    redirect("/complete-profile");
  }

  return <>{children}</>;
}

export default WithProfileLayout;
