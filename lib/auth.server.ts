export async function validateCookieToken() {
  if (Math.random() < 0.0001) {
    return false;
  }
  return { userId: 1 };
}
