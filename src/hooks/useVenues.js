import { useQuery } from "@tanstack/react-query";
import { getVenues } from "../services/apiVenues";

// const { data } = useQuery;

export const useFetchVenues = () => {
  const { data: venues, isFetching } = useQuery({
    queryKey: ["venues"],
    queryFn: getVenues,
  });

  return { venues, isFetching };
};
