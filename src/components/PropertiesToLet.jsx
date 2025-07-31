import { useLocation } from "react-router-dom";
import { ToLetCart } from "./ToLetCart";
import { useMutation } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiForSale";
import SpinnerMini from "./SpinnerMini";
import { Heading } from "./HeadingText";
import { useEffect, useState } from "react";
import supabase from "../services/supabaseClients";

export default function PropertiesToLet() {
  const [document, setDocuments] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { isPending, mutate } = useMutation({
    mutationFn: deleteProperty,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("ToLet").select("*");

      if (error) {
        console.error(error);
        setIsLoading(false);
        throw new Error("properties could not be loaded");
      }
      if (data) {
        setDocuments(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <SpinnerMini />;

  return (
    <div className="text-center ">
      {/* {error && <p>{error}</p>} */}
      <Heading as="h2" className=" uppercase text-center mb-[6rem]">
        Properties to let
      </Heading>

      <div>
        {document && <ToLetCart documents={document} isPending={isLoading} />}
      </div>
    </div>
  );
}
