"use client";

import { useEffect } from "react";

interface ServiceWorkerProviderProps {
  children: React.ReactNode;
}

function ServiceWorkerProvider({ children }: ServiceWorkerProviderProps) {
  useEffect(() => {
    const asyncWrapper = async () => {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.register("/sw.js");
        const pushSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey:
            "BFeJlZifA8Q71AKiTezmx77i_bRVPTJIWsXSuFsS9BirWfAIG4O0nu_Mxmsyz6FTpalEjKZfwnnZJBSL1dKqMC4",
        });
      }
    };
    asyncWrapper();
  }, []);

  return <>{children}</>;
}

export default ServiceWorkerProvider;
