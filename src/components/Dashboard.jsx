import { useEffect, useState } from "react";

import { useUser } from "../hooks/useUser";

import SpinnerMini from "./SpinnerMini";
import { Navigate } from "react-router-dom";
import CurrentUserToLet from "./CurrentUserToLet";
import CurrentUserForSale from "./CurrentUserForSale";

export default function Dashboard() {
  const [documents, setDocuments] = useState();
  const { user } = useUser();
  const id = user?.id;

  // const { data: documents, isPending } =
  //   useFetchPropertiesForSaleCurrentUser(id);

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
