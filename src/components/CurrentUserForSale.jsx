import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import supabase from "../services/supabaseClients";
import { CiMenuKebab } from "react-icons/ci";

import { GridContainer, GridInner } from "./Grid";
import SpinnerMini from "./SpinnerMini";
import { Heading } from "./HeadingText";
import Menus from "./Menus";

export default function CurrentUserForSale() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const id = user?.id;
  const [documents, setdocuments] = useState();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async (id) => {
      const { data, error } = await supabase
        .from("ForSale")
        .select("*")
        .eq("uid", id);

      if (error) {
        setIsLoading(false);
        console.log(error);
      }
      if (data) {
        setdocuments(data);
        setIsLoading(false);
      }

      return data;
    };

    fetchData(id);
  }, [id]);

  isLoading && <SpinnerMini />;

  return (
    <>
      <Heading as="h2" className=" uppercase text-center ">
        Properties for sale
      </Heading>
      <Menus>
        <GridContainer className="mt-32">
          {documents?.length === 0 && (
            <p className="uppercase text-2xl">
              You do not have a property listed to let
            </p>
          )}

          {documents?.map((doc) => {
            return (
              <GridInner key={doc.id}>
                <div className="flex justify-center items-center">
                  <div className=" text-center  py-8  flex flex-col gap-1 justify-center items-center">
                    <div className=" ">
                      <iframe
                        width="260"
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
                      {/* <button
              onClick={() => {
                setIsOpenForm(!isOpenForm);
                }}
            >
            <CiEdit />
            </button> */}
                      <button
                      // onClick={() => {
                      //   mutate(propertyId);
                      // }}
                      // disabled={isPending}
                      >
                        <CiMenuKebab className="text-black cursor-pointer" />
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
