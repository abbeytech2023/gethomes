import { data, useLocation } from "react-router-dom";
import { ToLetCart } from "./ToLetCart";
import { useMutation } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiForSale";
import SpinnerMini from "./SpinnerMini";
import { Heading } from "./HeadingText";
import { useEffect, useState } from "react";
import supabase from "../services/supabaseClients";
import { useUser } from "../hooks/useUser";
import { useFetchPropertiesToletCurrentUser } from "../hooks/useProperties";

export default function CurrentUserToLet() {
  const [documents, setdocuments] = useState();
  const location = useLocation();
  const { user } = useUser();

  const id = user?.id;
  const { data } = useFetchPropertiesToletCurrentUser(id);
  console.log(data);

  useEffect(() => {
    const fetchData = async (id) => {
      const { data, error } = await supabase
        .from("ToLet")
        .select("*")
        .eq("uid", id);

      if (error) console.log(error);
      if (data) setdocuments(data);
    };
    fetchData(id);
  }, [id]);

  console.log("id", id);

  const { isPending, mutate } = useMutation({
    mutationFn: deleteProperty,
  });

  return (
    <div className="text-center ">
      {/* {error && <p>{error}</p>} */}
      <Heading as="h2" className=" uppercase text-center ">
        Properties to let
      </Heading>

      {isPending && <SpinnerMini />}
      {documents?.length === 0 && (
        <p className="uppercase text-2xl">
          You do not have a property listed to let
        </p>
      )}
      <div>
        {documents && <ToLetCart documents={documents} isPending={isPending} />}
      </div>
    </div>
  );
}
