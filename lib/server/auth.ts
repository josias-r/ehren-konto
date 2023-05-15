export async function validateCookieToken() {
  if (Math.random() < 0.0001) {
    return false;
  }
  return { userId: 1 };
}

export async function getUserId() {
  const token = await validateCookieToken();
  if (!token) {
    throw new Error("Not authenticated");
  }
  return token.userId;
}
