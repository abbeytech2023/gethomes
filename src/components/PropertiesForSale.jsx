// import CartCard from "./CartCard";
import { GridContainer, GridInner } from "./Grid";

import { Heading } from "./HeadingText";
import ForSaleCart from "./ForSaleCart";
import { FlexDiv, FlexInnerDiv } from "./FlexDiv";
import { useEffect, useState } from "react";
import supabase from "../services/supabaseClients";
import { set } from "react-hook-form";
import SpinnerMini from "./SpinnerMini";

//HOOKS

// const ProductDiv = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 2rem;
// `;

function PropertiesForSale() {
  const [documents, setDocuments] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("ForSale").select("*");

      if (error) {
        console.error(error);
        setIsLoading(false);
        throw new Error("cabins could not be loaded");
      }

      if (data) {
        setDocuments(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <SpinnerMini />;

  return (
    <div className="mb-[8rem] w-[50%] text-center mx-auto ">
      {/* {error && <p>{error}</p>} */}
      <Heading as="h2" className=" uppercase text-center mb-16">
        Properties for sale
      </Heading>
      {/* {isPending && <SpinnerMini />} */}
      {documents && (
        <GridContainer className="mx-auto">
          <ForSaleCart document={documents} />
        </GridContainer>
      )}
    </div>
  );
}

export default PropertiesForSale;
