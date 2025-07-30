import { useLocation } from "react-router-dom";

import { CiMenuKebab } from "react-icons/ci";

// import { useDeleteMutateForSale } from "../hooks/useDeleteMutate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty } from "../services/apiForSale";
import toast from "react-hot-toast";

import { GridInner } from "./Grid";

function CartCard({ document }) {
  const { propertyDetails, price, title, id: propertyId } = document;

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (id) => deleteProperty(id),
    onSuccess: () => {
      toast.success("cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["ForSale"],
      });
    },
    onError: () => toast.error("property could not be deleted"),
  });

  // const { deleteDocument, response } = useFirestore("Outlets");

  //propertydetail, title, price

  const location = useLocation();

  // const deleteCart = location.pathname === "/myaccount/myproperties";

  return (
    <>
      {document.map((doc) => {
        return (
          <GridInner key={doc.id}>
            {/* <div className="flex flex-col justify-center items-center">
              <div className=" ">
                <iframe
                  width="150"
                  height="265"
                  src="https://www.youtube.com/embed/K54Kg-QE1MY?si=t_aLDJyiblJciPwA"
                  title="YouTube video player"
                  // frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  // referrerpolicy="strict-origin-when-cross-origin"
                  // allowfullscreen
                ></iframe>
              </div>
              <div className="">
                <div>
                  <h1 className="text-[22px] uppercase">{doc.title}</h1>
                </div>
                <div>
                  <p className=" text-lg">{doc.price}</p>
                </div>
                <div className="">
                  <p className=" text-lg ">{doc.propertyDetails}</p>
                </div>
              </div>
            </div> */}
            <div className="">
              <div className=" text-center  py-8  flex flex-col gap-1 justify-center items-center">
                <div className="flex items-center justify-center ">
                  <iframe
                    width="800"
                    height="265"
                    src="https://www.youtube.com/embed/K54Kg-QE1MY?si=t_aLDJyiblJciPwA"
                    title="YouTube video player"
                    // frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    // referrerpolicy="strict-origin-when-cross-origin"
                    // allowfullscreen
                  ></iframe>
                </div>
                <div className="w-[16rem] flex flex-col gap-6 py-12 ">
                  <div>
                    <h1 className="text-[22px] uppercase">{doc.title}</h1>
                  </div>
                  <div>
                    <p className=" text-lg">{doc.price}</p>
                  </div>
                  <div className="">
                    <p className=" text-lg ">{doc.propertyDetails}</p>
                  </div>
                </div>
                <div className="2xl  absolute right-3 top-3">
                  {/* <button
              onClick={() => {
                setIsOpenForm(!isOpenForm);
              }}
            >
              <CiEdit />
            </button> */}
                  <button
                    onClick={() => {
                      mutate(propertyId);
                    }}
                    disabled={isPending}
                  >
                    <CiMenuKebab className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </GridInner>
        );
      })}
    </>
  );
}

export default CartCard;
