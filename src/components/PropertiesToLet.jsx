import { ToLetCart } from "./ToLetCart";
import { QueryClient, useMutation } from "@tanstack/react-query";
import SpinnerMini from "./SpinnerMini";
import { Heading } from "./HeadingText";
import SelectStateLocalGovt from "./SelectStateLocalGovt";
import { useForm } from "react-hook-form";
import Button from "./Button";

import { useFetchProperties } from "../hooks/useFetchProperties";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";

export default function PropertiesToLet() {
  const { documents, isLoading, error } = useFetchProperties("ToLet");
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleSubmit, register } = useForm();

  const filterValue = searchParams.get("state") || "all";

  let filteredDocuments = [];
  if (filterValue === "all") {
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
    <div className="text-center ">
      {/* {error && <p>{error}</p>} */}
      <Heading as="h2" className=" uppercase text-center mb-[6rem]">
        Properties to let
      </Heading>
      <form
        className="flex items-center justify-center gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SelectStateLocalGovt styles={style} register={register} />
        <Button type="secondary">Filter</Button>
      </form>
      <div>
        {documents && (
          <ToLetCart documents={filteredDocuments} isPending={isLoading} />
        )}
      </div>
      <Pagination count={filteredDocuments?.length} />
    </div>
  );
}
