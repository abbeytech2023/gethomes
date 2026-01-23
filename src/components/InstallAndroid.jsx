// import { useEffect, useState } from "react";

// export default function InstallButton() {
//   const [install, setInstall] = useState(null);

//   useEffect(() => {
//     window.addEventListener("beforeinstallprompt", (e) => {
//       e.preventDefault();
//       setInstall(e);
//     });
//   }, []);

//   if (!install) return null;

//   return (
//     <button className="bg-red-700" onClick={() => install.prompt()}>
//       Install App
//     </button>
//   );
// }

import { useEffect, useState } from "react";

export default function InstallApp() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [platform, setPlatform] = useState(null);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isAndroid = /android/i.test(navigator.userAgent);

    if (isIOS) setPlatform("ios");
    if (isAndroid) setPlatform("android");

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  // Already installed
  if (window.matchMedia("(display-mode: standalone)").matches) {
    return null;
  }

  if (platform === "android" && deferredPrompt) {
    return (
      <button onClick={() => deferredPrompt.prompt()}>
        Install GetHomes App
      </button>
    );
  }

  if (platform === "ios") {
    return (
      <button onClick={() => alert("Tap Share → Add to Home Screen")}>
        Install on iPhone
      </button>
    );
  }

  return null;
}
