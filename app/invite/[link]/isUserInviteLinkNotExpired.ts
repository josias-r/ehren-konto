const hour = 1000 * 60 * 60; // 1 hour
const linkExpiry = hour * 24 * 5; // 5 days

function isUserInviteLinkNotExpired(
  inviteLinkCreateDate: Date | null | undefined
) {
  if (!inviteLinkCreateDate) {
    return false;
  }

  const expiredDiff = new Date().getTime() - inviteLinkCreateDate.getTime();

  // minus 1 hour, so the link cant be valid less than 1 hour after calling this function
  if (expiredDiff + hour < linkExpiry) {
    return true;
  }

  return false;
}

export default isUserInviteLinkNotExpired;
