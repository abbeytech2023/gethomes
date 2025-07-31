import { data, useLocation } from "react-router-dom";
import { ToLetCart } from "./ToLetCart";
import { useMutation } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiForSale";
import SpinnerMini from "./SpinnerMini";
import { useEffect, useState } from "react";
import supabase from "../services/supabaseClients";
import { useUser } from "../hooks/useUser";
import { useFetchPropertiesToletCurrentUser } from "../hooks/useProperties";
import { Heading } from "./HeadingText";

export default function CurrentUserToLet() {
  const [documents, setdocuments] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const id = user?.id;
  const { data } = useFetchPropertiesToletCurrentUser(id);
  console.log(data);

  useEffect(() => {
    const fetchData = async (id) => {
      setIsLoading(false);

      const { data, error } = await supabase
        .from("ToLet")
        .select("*")
        .eq("uid", id);

      if (error) {
        setIsLoading(false);
      }
      if (data) {
        setdocuments(data);
      }
      setIsLoading(false);
    };
    fetchData(id);
  }, [id]);

  console.log("id", id);

  {
    isLoading && <SpinnerMini />;
  }

  return (
    <div className="text-center ">
      <Heading as="h2">your properties to let</Heading>
      {documents?.length === 0 && (
        <p className="uppercase text-2xl">
          You do not have a property listed to let
        </p>
      )}
      <div>{documents && <ToLetCart documents={documents} />}</div>
    </div>
  );
}
