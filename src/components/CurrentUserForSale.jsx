import { Heading } from "./HeadingText";
import CartCard from "./CartCard";
import { FlexDiv } from "./FlexDiv";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import supabase from "../services/supabaseClients";
import { useFetchPropertiesForSaleCurrentUser } from "../hooks/useProperties";

export default function CurrentUserForSale() {
  const { user } = useUser();
  console.log("forsaleuser", user);

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

      // return data;
    };

    fetchData(id);
  }, [id]);

  console.log(documents);

  return (
    <div className="mb-[8rem] flex flex-col items-center justify-center  ">
      {/* {error && <p>{error}</p>} */}

      {/* {isPending && <SpinnerMini />} */}

      {
        <FlexDiv className="">
          <>
            {documents?.map((document) => {
              return (
                <div key={document.id}>
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
