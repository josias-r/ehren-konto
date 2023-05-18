import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateCookieToken } from "@/lib/auth/validateCookieToken";
import { completeProfile } from "@/lib/user/actions";
import getMainProfileData from "@/lib/user/getMainProfileData";
import getProfileIsIncomplete from "@/lib/user/getProfileIsIncomplete";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export const metadata = {
  title: "Complete your profile",
};

export default async function CompleteProfile() {
  const isLoggedIn = await validateCookieToken();

  if (isLoggedIn === false) {
    return notFound();
  }
  const profileIsIncomplete = await getProfileIsIncomplete(isLoggedIn.userId);
  if (!profileIsIncomplete) {
    return redirect("/profile");
  }

  const mainProfileData = await getMainProfileData(isLoggedIn.userId);

  async function completeProfileAction(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const nick = formData.get("nick") as string;

    await completeProfile({ name, nick });

    revalidatePath("/profile");
    redirect("/profile");
  }

  return (
    <main className="p-4 h-full max-w-md mx-auto grid items-center">
      <div>
        <div className="text-center mt-12">
          <h1 className="text-2xl font-bold">Complete your profile</h1>
          <p className="text-sm text-muted-foreground mb-4">
            You need to complete your profile to use the app.
          </p>
          <form className="grid gap-2" action={completeProfileAction}>
            <Input
              name="name"
              placeholder="Name"
              defaultValue={mainProfileData?.name}
            />
            <Input
              name="nick"
              placeholder="Nickname"
              defaultValue={mainProfileData?.nick}
            />
            <Button>Save</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
