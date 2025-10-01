import { useContext } from "react";
import { SearchContext } from "../context/SearchInputContext";

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) throw new Error("context must be used inside provider");

  return context;
};
