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
    <div className="text-center  w-full">
      {/* {error && <p>{error}</p>} */}
      <Heading as="h2" className=" uppercase text-center mb-16">
        Properties to let
      </Heading>

      {isPending && <SpinnerMini />}
      {propToLet?.length === 0 && (
        <p className="uppercase text-3xl">
          You do not have a property listed to let
        </p>
      )}
      <div>
        {propToLet && <ToLetCart documents={propToLet} isPending={isPending} />}
      </div>
    </div>
  );
}
