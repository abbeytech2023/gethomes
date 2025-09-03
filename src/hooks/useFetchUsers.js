import { useEffect, useState } from "react";
import supabase from "../services/supabaseClients";

export function useFetchUsersWithId(id) {
  const [documents, setDocument] = useState();
  const [authenticatedUser, setAuthenticatedUser] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async (id) => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("Users")
        .select()
        .eq("profession", id);

      if (error) {
        setIsLoading(false);
      }

      if (data) {
        setDocument(data);
        setIsLoading(false);
      }
    };
    fetchData(id);

    const fetchAuthUser = async (id) => {
      setIsLoading(true);
      const { data: authUser, error: authError } = await supabase
        .from("Users")
        .select()
        .eq("id", id);

      if (authError) console.log(authError);

      if (authUser) {
        setIsLoading(false);
        setAuthenticatedUser(authUser);
      }
    };
    fetchAuthUser(id);
  }, [id]);

  return { documents, isLoading, error, authenticatedUser };
}
