import getMainProfileData from "./getMainProfileData";

async function getProfileIsIncomplete(userId: string) {
  const user = await getMainProfileData(userId);

  return !user?.name || !user?.nick;
}

export default getProfileIsIncomplete;
