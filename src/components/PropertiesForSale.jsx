// import CartCard from "./CartCard";
import { GridContainer, GridInner } from "./Grid";

import { Heading } from "./HeadingText";
import ForSaleCart from "./ForSaleCart";
import { FlexDiv, FlexInnerDiv } from "./FlexDiv";
import supabase from "../services/supabaseClients";
import SpinnerMini from "./SpinnerMini";
import { useFetchProperties } from "../hooks/useFetchProperties";

//HOOKS

// const ProductDiv = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 2rem;
// `;

function PropertiesForSale() {
  const { documents, isLoading, error } = useFetchProperties("ForSale");

  if (isLoading) return <SpinnerMini />;

  return (
    <div className="mb-[8rem] min-[600px]:w-[50%] max-[600px]:w-[80%]  text-center mx-auto ">
      {/* {error && <p>{error}</p>} */}
      <Heading as="h2" className="mb-16 text-center uppercase ">
        Properties for sale
      </Heading>
      {!documents && <SpinnerMini />}
      {documents && (
        <GridContainer className="mx-auto">
          <ForSaleCart document={documents} />
        </GridContainer>
      )}
    </div>
  );
}

export default PropertiesForSale;
