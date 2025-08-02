import { useEffect, useState } from "react";
import supabase from "../services/supabaseClients";

export function useFetchPropertiesWithId(property, id) {
  const [documents, setDocument] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async (id) => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from(property)
        .select()
        .eq("uid", id);

      if (error) {
        console.log(error.message);
        setError(error.message);

        setIsLoading(false);
      }

      if (data) {
        setDocument(data);
        console.log(documents);

        setIsLoading(false);
      }
    };
    fetchData(id);
  }, [property, id]);

  return { documents, isLoading, error };
}

export function useFetchProperties(properties) {
  const [documents, setDocuments] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from(properties).select("*");

      if (error) {
        setError(error.message);
        console.error(error.message);
        setIsLoading(false);
      }

      if (data) {
        console.log(data);

        setDocuments(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [properties]);

  return { documents, isLoading, error };
}
