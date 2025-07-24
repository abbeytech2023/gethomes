import { useQuery } from "@tanstack/react-query";
import {
  getSingleRent,
  getToLet,
  getToLetCurrentUser,
} from "../services/apiToLet";
import { getForSale, getForSaleCurrentUser } from "../services/apiForSale";
import supabase from "../services/supabaseClients";

export const useFetchPropertiesTolet = () => {
  const { data: propToLet, isPending } = useQuery({
    queryKey: ["ToLet"],
    queryFn: getToLet,
  });

  return { propToLet, isPending };
};

export const useFetchPropertiesForSale = () => {
  const { data: documents, isPending } = useQuery({
    queryKey: ["ForSale"],
    queryFn: getForSale,
  });

  return { documents, isPending };
};

export const useFetchPropertiesForSaleCurrentUser = (id) => {
  const { data, isPending } = useQuery({
    queryKey: ["ForSale"],
    queryFn: () => getForSaleCurrentUser(id),
  });

  return { data, isPending };
};

export const useFetchPropertiesToletCurrentUser = (id) => {
  const { data, isPending } = useQuery({
    queryKey: ["ToLet"],
    queryFn: () => getToLetCurrentUser(id),
  });

  console.log(data);

  return { data, isPending };
};

export const useFetchSinglePropertiesToLet = (id) => {
  const { data: singleToLet, isPending } = useQuery({
    queryKey: ["single-rent"],
    queryFn: () => getSingleRent(id),
  });

  return { singleToLet, isPending };
};
