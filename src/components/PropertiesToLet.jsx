import { useLocation } from "react-router-dom";
import { ToLetCart } from "./ToLetCart";
import { useMutation } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiForSale";
import SpinnerMini from "./SpinnerMini";
import { Heading } from "./HeadingText";
import { useEffect, useState } from "react";
import supabase from "../services/supabaseClients";
import { useFetchProperties } from "../hooks/useFetchProperties";

export default function PropertiesToLet() {
  const { isPending, mutate } = useMutation({
    mutationFn: deleteProperty,
  });

  const { documents, isLoading, error } = useFetchProperties("ToLet");

  if (isLoading) return <SpinnerMini />;

  return (
    <div className="text-center ">
      {/* {error && <p>{error}</p>} */}
      <Heading as="h2" className=" uppercase text-center mb-[6rem]">
        Properties to let
      </Heading>

      <div>
        {documents && <ToLetCart documents={documents} isPending={isLoading} />}
      </div>
    </div>
  );
}
