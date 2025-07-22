import { Heading } from "./HeadingText";
import CartCard from "./CartCard";
import { FlexDiv } from "./FlexDiv";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import supabase from "../services/supabaseClients";

export default function CurrentUserForSale() {
  const [documents, setdocuments] = useState();
  const user = useUser();
  const id = user?.id;
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("ForSale")
        .select("")
        .eq("uid", id);

      if (error) console.log(error);
      if (data) setdocuments(data);
    };

    fetchData();
  }, [id]);

  return (
    <div className="mb-[8rem] flex flex-col items-center justify-center  ">
      {/* {error && <p>{error}</p>} */}
      <Heading as="h2" className=" uppercase text-center mb-16">
        Properties for sale
      </Heading>
      {/* {isPending && <SpinnerMini />} */}

      {
        <FlexDiv className="">
          <>
            {documents?.map((document) => {
              return (
                <div key={document.uid}>
                  <CartCard document={document} />
                </div>
              );
            })}
          </>
        </FlexDiv>
      }
    </div>
  );
}
