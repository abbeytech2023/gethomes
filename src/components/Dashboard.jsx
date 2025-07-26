import { useEffect, useState } from "react";
import {
  useFetchPropertiesForSaleCurrentUser,
  useFetchPropertiesToletCurrentUser,
} from "../hooks/useProperties";

import { useUser } from "../hooks/useUser";

import SpinnerMini from "./SpinnerMini";
import { Navigate } from "react-router-dom";
import CurrentUserToLet from "./CurrentUserToLet";
import CurrentUserForSale from "./CurrentUserForSale";

export default function Dashboard() {
  const [documents, setDocuments] = useState();
  const { user } = useUser();
  const id = user?.id;

  const { data: propToLet, isPending: isLoading } =
    useFetchPropertiesToletCurrentUser(id);
  console.log("Dashboard", propToLet);

  // const { data: documents, isPending } =
  //   useFetchPropertiesForSaleCurrentUser(id);
  console.log("documents", documents);

  if (isLoading) return <SpinnerMini />;
  // if (isPending) return <SpinnerMini />;

  return (
    <>
      <section className="mb-[15rem]">
        <CurrentUserForSale />
      </section>
      <section>
        <CurrentUserToLet />;
      </section>
    </>
  );
}
