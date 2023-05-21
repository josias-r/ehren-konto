"use strict";
import { precacheAndRoute } from "workbox-precaching";
precacheAndRoute(self.__WB_MANIFEST);

declare var self: ServiceWorkerGlobalScope;

self.addEventListener("push", (event) => {
  // const data = JSON.parse(event?.data?.text() || "{}");
  event?.waitUntil(
    self.registration.showNotification("data.title", {
      body: "data.message",
      icon: "/icons/android-chrome-192x192.png",
    })
  );
});

// eslint-disable-next-line import/no-anonymous-default-export
export default null;
