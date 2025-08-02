import { useEffect, useState } from "react";
import supabase from "../services/supabaseClients";

export function useFetchUsersWithId(id) {
  const [documents, setDocument] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async (id) => {
      const { data, error } = await supabase
        .from("Users")
        .select()
        .eq("profession", id);

      if (error) {
        console.log(error);
        setIsLoading(false);
      }

      if (data) {
        setDocument(data);
        setIsLoading(false);
      }
    };
    fetchData(id);
  }, [id]);

  return { documents, isLoading, error };
}
