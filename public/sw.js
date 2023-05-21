self.addEventListener("install", () => {
  console.log("service worker installed");
});
self.addEventListener("activate", () => {
  console.log("service worker activated");
});

self.addEventListener("push", async (event) => {
  if (!(self.Notification && self.Notification.permission === "granted")) {
    return;
  }

  const promiseChain = self.registration.showNotification("Hello, World.", {
    body: "This is the body of the notification",
  });

  event.waitUntil(promiseChain);
});
