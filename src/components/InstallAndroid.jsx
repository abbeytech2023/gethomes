import { useEffect, useState } from "react";

export default function InstallButton() {
  const [install, setInstall] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setInstall(e);
    });
  }, []);

  if (!install) return null;

  return (
    <button className="bg-red-700" onClick={() => install.prompt()}>
      Install App
    </button>
  );
}
