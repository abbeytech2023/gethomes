import { useEffect, useState } from "react";

// "https://nga-states-lga.onrender.com/?state=Kaduna"
export function useFetchLocalGovtga(URL) {
  const [localGovts, setLocalGovts] = useState();
  useEffect(() => {
    const fetchData = async (URL) => {
      let response = await fetch(URL);
      if (!response) throw new Error("states could not be fetched");

      let json = await response.json();
      setLocalGovts(json);
    };
    fetchData(URL);
  }, [URL]);

  return { localGovts };
}
