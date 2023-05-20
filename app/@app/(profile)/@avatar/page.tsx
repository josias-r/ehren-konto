import { getUserId } from "@/app/(auth)/getUserId";
import ProfileAvatar from "./ProfileAvatar";
import geProfileData from "./getProfileData";

async function Avatar() {
  const userId = getUserId();
  const profileData = await geProfileData(userId);

  if (!profileData) {
    throw new Error("Profile not found");
  }
  return (
    <div className="mx-auto max-w-md flex justify-end">
      <ProfileAvatar name={profileData.name} avatar={profileData.avatar} />
    </div>
  );
}

export default Avatar;
