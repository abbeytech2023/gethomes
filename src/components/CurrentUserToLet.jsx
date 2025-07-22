import { useLocation } from "react-router-dom";
import { ToLetCart } from "./ToLetCart";
import { useMutation } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiForSale";
import SpinnerMini from "./SpinnerMini";
import { Heading } from "./HeadingText";
import { useEffect, useState } from "react";
import supabase from "../services/supabaseClients";
import { useUser } from "../hooks/useUser";

export default function CurrentUserToLet() {
  const [toLet, setToLet] = useState();
  const location = useLocation();
  const { user } = useUser();

  const id = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("ToLet")
        .select("")
        .eq("uid", id);

      if (error) console.log(error);
      if (data) setToLet(data);
    };
    fetchData();
  }, [id]);

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
      {toLet?.length === 0 && (
        <p className="uppercase text-3xl">
          You do not have a property listed to let
        </p>
      )}
      <div>
        {toLet && <ToLetCart documents={toLet} isPending={isPending} />}
      </div>
    </div>
  );
}
