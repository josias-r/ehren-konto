import getMainProfileData from "./getMainProfileData";

async function getProfileIsIncomplete() {
  const user = await getMainProfileData();

  return !user?.name || !user?.nick;
}

export default getProfileIsIncomplete;
