import { useLocation } from "react-router-dom";

import { formatPrice } from "../utility/utility";
// import { useDeleteMutateForSale } from "../hooks/useDeleteMutate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiForSale";
import toast from "react-hot-toast";

import { GridInner } from "./Grid";
import { MdDelete } from "react-icons/md";

function ForSaleCart({ document }) {
  const { propertyDetails, price, title, id: propertyId } = document;
  const location = useLocation();
  const URL = location.pathname;

  const QueryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (id) => deleteProperty(id),
    onSuccess: () => {
      toast.success("cabin successfully deleted");
      QueryClient.invalidateQueries({
        queryKey: ["ForSale"],
      });
    },
    onError: () => toast.error("property could not be deleted"),
  });

  return (
    <>
      <div className="px-4 py-10 mx-auto max-w-7xl">
        {/* <h1 className="mb-8 text-3xl font-bold text-center">
          Properties For Sale
        </h1> */}

        <div className="grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-3">
          {document?.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden transition bg-white shadow-md rounded-2xl hover:shadow-xl"
            >
              <img
                src={property.image}
                alt={property.title}
                className="object-cover w-full h-52"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <p className="text-gray-600">
                  {property.address.slice(0, 30) + "..."}
                </p>
                <p className="mt-2 font-bold text-[#144c6f]">
                  {formatPrice(property.price)}
                </p>
                <button className="w-full py-2 mt-4 text-white cursor-pointer transition bg-[#144c6f] rounded-lg hover:bg-[#052031]">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ForSaleCart;
