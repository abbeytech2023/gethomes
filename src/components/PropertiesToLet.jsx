import { useLocation } from "react-router-dom";
import { ToLetCart } from "./ToLetCart";
import { useMutation } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiForSale";
import SpinnerMini from "./SpinnerMini";
import { Heading } from "./HeadingText";

export default function PropertiesToLet({ propToLet }) {
  const location = useLocation();

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

      <div>
        {propToLet && <ToLetCart documents={propToLet} isPending={isPending} />}
      </div>
    </div>
  );
}
