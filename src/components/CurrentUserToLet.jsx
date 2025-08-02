import { ToLetCart } from "./ToLetCart";
import { useMutation } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiForSale";
import SpinnerMini from "./SpinnerMini";
import { useUser } from "../hooks/useUser";
import { Heading } from "./HeadingText";
import { useFetchPropertiesWithId } from "../hooks/useFetchProperties";

export default function CurrentUserToLet() {
  const { user } = useUser();

  const id = user?.id;
  const { documents, isLoading, error } = useFetchPropertiesWithId("ToLet", id);

  return (
    <div className="text-center ">
      <Heading as="h2">your properties to let</Heading>
      {!documents && <SpinnerMini />}
      {documents?.length === 0 && (
        <p className="uppercase text-2xl">
          You do not have a property listed to let
        </p>
      )}
      <div>{documents && <ToLetCart documents={documents} />}</div>
    </div>
  );
}
