import { Heading } from "./HeadingText";
import CartCard from "./CartCard";
import { FlexDiv } from "./FlexDiv";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import supabase from "../services/supabaseClients";
import { MdDelete } from "react-icons/md";
import { GridContainer, GridInner } from "./Grid";
import SpinnerMini from "./SpinnerMini";

export default function CurrentUserForSale() {
  const { user } = useUser();

  const id = user?.id;
  const [documents, setdocuments] = useState();

  useEffect(() => {
    const fetchData = async (id) => {
      const { data, error } = await supabase
        .from("ForSale")
        .select("*")
        .eq("uid", id);

      if (error) console.log(error);
      if (data) setdocuments(data);

      return data;
    };

    fetchData(id);
  }, [id]);

  !documents && <SpinnerMini />;

  return (
    <GridContainer className="  mt-32">
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
                  // onClick={() => {
                  //   mutate(propertyId);
                  // }}
                  // disabled={isPending}
                  >
                    <MdDelete className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </GridInner>
        );
      })}
    </GridContainer>
  );
}
