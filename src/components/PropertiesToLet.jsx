import { ToLetCart } from "./ToLetCart";
import { QueryClient, useMutation } from "@tanstack/react-query";
import SpinnerMini from "./SpinnerMini";
import { Heading } from "./HeadingText";

import { useFetchProperties } from "../hooks/useFetchProperties";

export default function PropertiesToLet() {
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
