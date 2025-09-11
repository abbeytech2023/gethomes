import { useLocation } from "react-router-dom";

import { CiMenuKebab } from "react-icons/ci";

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
      {document.map((doc) => {
        console.log(doc);

        return (
          <GridInner key={doc.id}>
            <div className="">
              <div className="flex flex-col items-center justify-center gap-1 py-8 text-center ">
                <div className="flex items-center justify-center ">
                  <img src={doc.image} />
                </div>
                <a href={`${URL}/${doc.id}`}>
                  <div className="w-[16rem] flex flex-col gap-6 py-12 ">
                    <div>
                      <h1 className="text-[22px] uppercase">{doc.title}</h1>
                    </div>
                    <div>
                      <p className="text-lg ">{doc.price}</p>
                    </div>
                    <div className="">
                      <p className="text-lg ">{doc.propertyDetails}</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </GridInner>
        );
      })}
    </>
  );
}

export default ForSaleCart;
