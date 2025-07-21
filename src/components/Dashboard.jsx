import {
  useFetchPropertiesForSaleCurrentUser,
  useFetchPropertiesToletCurrentUser,
} from "../hooks/useProperties";

import { useUser } from "../hooks/useUser";

import ProductCart from "./ProductCart";
import PropertiesToLet from "./PropertiesToLet";

export default function Dashboard() {
  const { user } = useUser();

  const id = user?.id;
  console.log(id);

  const { data: propToLet, isPending: isLoading } =
    useFetchPropertiesToletCurrentUser(id);

  console.log(propToLet);

  const { data: documents, isPending } =
    useFetchPropertiesForSaleCurrentUser(id);

  return (
    <div className="flex flex-col  gap-28  sm:px-[auto] max-w-full text-lg mb-[15rem]">
      <div className="">
        {documents && <ProductCart documents={documents} />}
      </div>

      <div className="">
        {propToLet && <PropertiesToLet propToLet={propToLet} />}
      </div>
    </div>
  );
}
