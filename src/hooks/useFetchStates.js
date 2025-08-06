import { useEffect, useState } from "react";

export const useGetStatesFromApi = (URL) => {
  const [allStates, setAllStates] = useState();

  useEffect(() => {
    const fetchData = async (URL) => {
      let response = await fetch(URL);
      if (!response) throw new Error("states could not be fetched");
      let data = await response.json();

      setAllStates(data);
    };
    fetchData(URL);
  }, [URL]);

  return { allStates };
};
