import ProfileAvatar from "./ProfileAvatar";
import getProfileData from "./getProfileData";

async function Avatar() {
  const profileData = await getProfileData();

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
