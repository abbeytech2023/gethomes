// import { useEffect, useState } from "react";

// export default function InstallApp() {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [platform, setPlatform] = useState(null);

//   useEffect(() => {
//     const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
//     const isAndroid = /android/i.test(navigator.userAgent);

//     if (isIOS) setPlatform("ios");
//     if (isAndroid) setPlatform("android");

//     window.addEventListener("beforeinstallprompt", (e) => {
//       e.preventDefault();
//       setDeferredPrompt(e);
//     });
//   }, []);

//   // Already installed
//   if (window.matchMedia("(display-mode: standalone)").matches) {
//     return null;
//   }

//   if (platform === "android" && deferredPrompt) {
//     return (
//       <button onClick={() => deferredPrompt.prompt()}>
//         Install GetHomes App
//       </button>
//     );
//   }

//   if (platform === "ios") {
//     return (
//       <button onClick={() => alert("Tap Share → Add to Home Screen")}>
//         Install on iPhone
//       </button>
//     );
//   }

//   return null;
// }

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isAndroid = /android/i.test(navigator.userAgent);

    if (isIOS) setPlatform("ios");
    if (isAndroid) setPlatform("android");

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }
  }, []);

  if (installed) return null;

  return (
    <div className="fixed z-50 bottom-4 left-4 right-4">
      <div className="flex items-center gap-4 p-4 bg-white border shadow-xl rounded-2xl">
        {/* App Icon */}
        <img
          src="/pwa-192x192.png"
          alt="GetHomes App"
          className="w-12 h-12 rounded-xl"
        />

        {/* Text */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">
            Install GetHomes App
          </h3>
          <p className="text-xs text-gray-500">Faster access • Works offline</p>
        </div>

        {/* Action */}
        {platform === "android" && deferredPrompt && (
          <button
            onClick={() => deferredPrompt.prompt()}
            className="px-4 py-2 text-sm font-medium text-white transition bg-blue-600 shadow rounded-xl hover:bg-blue-700 active:scale-95"
          >
            Install
          </button>
        )}

        {platform === "ios" && (
          <button
            onClick={() =>
              alert("Tap Share → Add to Home Screen to install GetHomes")
            }
            className="px-4 py-2 text-sm font-medium text-white transition bg-gray-900 shadow rounded-xl active:scale-95"
          >
            Install
          </button>
        )}
      </div>
    </div>
  );
}
