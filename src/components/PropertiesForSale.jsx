// import CartCard from "./CartCard";
import { GridContainer, GridInner } from "./Grid";

import { Heading } from "./HeadingText";
import ForSaleCart from "./ForSaleCart";
import SelectStateLocalGovt from "./SelectStateLocalGovt";
import { FlexDiv, FlexInnerDiv } from "./FlexDiv";
import supabase from "../services/supabaseClients";
import SpinnerMini from "./SpinnerMini";
import { useForm } from "react-hook-form";
import { useFetchProperties } from "../hooks/useFetchProperties";
import Pagination from "./Pagination";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";

//HOOKS

function PropertiesForSale() {
  const { register, handleSubmit } = useForm();
  const { documents, isLoading, count } = useFetchProperties("ForSale");
  const [searchParams, setSearchParams] = useSearchParams();

  const filterValue = searchParams.get("state") || "All";

  let filteredDocuments = [];
  if (filterValue === "All") {
    filteredDocuments = documents;
    console.log(filteredDocuments);
  } else {
    filteredDocuments = documents?.filter((doc) => {
      // console.log(doc.state);

      return (filteredDocuments = doc.state === filterValue);
      // console.log(filteredDocuments);
    });
  }

  // console.log(filterValue);
  console.log(filteredDocuments);

  const style = {
    container: {
      display: "none",
    },
  };

  const onSubmit = (data) => {
    searchParams.set("state", data.state), setSearchParams(searchParams);
    console.log(data);
  };

  if (isLoading) return <SpinnerMini />;

  return (
    <>
      <div>
        {/* {error && <p>{error}</p>} */}
        <Heading as="h2" className="text-center uppercase ">
          Properties for sale
        </Heading>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center gap-3 text-center"
        >
          <SelectStateLocalGovt styles={style} register={register} />
          <Button type="secondary">filter</Button>
        </form>
        {!documents && <SpinnerMini />}
        {documents && (
          <div className="mx-auto">
            {filteredDocuments.length === 0 && (
              <p className="text-2xl">
                There are no properties currently available in this region
              </p>
            )}
            <ForSaleCart document={filteredDocuments} />
          </div>
        )}
      </div>
      {/* <Pagination count={filteredDocuments?.length} /> */}
    </>
  );
}

export default PropertiesForSale;
