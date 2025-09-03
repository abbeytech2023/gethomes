import { useUser } from "../hooks/useUser";

import { GridContainer, GridInner } from "./Grid";
import { Heading } from "./HeadingText";
import Menus from "./Menus";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SpinnerMini from "./SpinnerMini";
import { deleteProperty } from "../services/apiForSale";
import toast from "react-hot-toast";
import { useFetchPropertiesForSaleCurrentUser } from "../hooks/useProperties";
import { useFetchPropertiesWithId } from "../hooks/useFetchProperties";
import { useEffect, useState } from "react";

export default function CurrentUserForSale() {
  const [documentSale, setDocumentSale] = useState();
  const { user } = useUser();
  const id = user?.id;

  const { data } = useFetchPropertiesForSaleCurrentUser(id);
  const { documents, isLoading } = useFetchPropertiesWithId("ForSale", id);

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

  useEffect(() => {
    setDocumentSale();
  }, [documents]);

  const handleDelete = (id) => {
    mutate(id);
  };

  isLoading && <SpinnerMini />;

  return (
    <>
      <Heading as="h2" className=" uppercase text-center ">
        your Properties for sale
      </Heading>
      {!documents && <SpinnerMini />}
      <Menus>
        <GridContainer className="mt-32 ">
          {documents?.length === 0 && (
            <p className="uppercase text-2xl text-center">
              You do not have a property listed to let
            </p>
          )}

          {documents?.map((doc) => {
            return (
              <GridInner key={doc.id}>
                <div className="flex justify-center items-center ">
                  <div className=" text-center  py-8  flex flex-col gap-1 justify-center items-center">
                    <div className=" ">
                      <iframe
                        width="265"
                        height="265"
                        src="https://www.youtube.com/embed/K54Kg-QE1MY?si=t_aLDJyiblJciPwA"
                        title="YouTube video player"
                        // frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        // referrerpolicy="strict-origin-when-cross-origin"
                        // allowfullscreen
                      ></iframe>
                    </div>
                    <div className="w-[16rem] flex flex-col gap-11 py-12 ">
                      <div>
                        <h1 className="text-[22px] uppercase">{doc.title}</h1>
                      </div>
                      <div>
                        <p className=" text-lg">{doc.price}</p>
                      </div>
                      <div className="">
                        <p className="text-lg ">{doc.propertyDetails}</p>
                      </div>
                    </div>
                    <div className="2xl  absolute right-3 top-3">
                      <button
                        onClick={() => handleDelete(doc.id)}
                        disabled={isPending}
                      >
                        <MdDelete className="text-[grey] cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              </GridInner>
            );
          })}
        </GridContainer>
      </Menus>
    </>
  );
}
