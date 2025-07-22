import { useEffect, useState } from "react";
import {
  useFetchPropertiesForSaleCurrentUser,
  useFetchPropertiesToletCurrentUser,
} from "../hooks/useProperties";

import { useUser } from "../hooks/useUser";

import ProductCart from "./ProductCart";
import PropertiesToLet from "./PropertiesToLet";
import SpinnerMini from "./SpinnerMini";
import CurrentUserToLet from "./CurrentUserToLet";
import CurrentUserForSale from "./CurrentUserForSale";

export default function Dashboard() {
  const [id, setId] = useState();
  const { user } = useUser();

  useEffect(() => {
    const id = user?.id;

    setId(id);
  }, [user?.id]);

  const { data: propToLet, isPending: isLoading } =
    useFetchPropertiesToletCurrentUser(id);
  console.log("Dashboard", propToLet);

  const { data: documents, isPending } =
    useFetchPropertiesForSaleCurrentUser(id);
  console.log("documents", documents);

  if (isLoading) return <SpinnerMini />;
  if (isPending) return <SpinnerMini />;

  return (
    <div className="flex flex-col text-center  gap-28   text-lg mb-[15rem]">
      {documents && documents.length === 0 ? (
        <p className="text-center text-2xl uppercase">
          you do not have a property listed for sale
        </p>
      ) : (
        documents && <CurrentUserForSale />
      )}

      {propToLet?.length === 0 ? (
        <p className="uppercase text-2xl">
          You do not have a property listed to let
        </p>
      ) : (
        propToLet && <CurrentUserToLet />
      )}
    </div>
  );
}
