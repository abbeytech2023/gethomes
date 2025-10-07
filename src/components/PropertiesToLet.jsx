import { ToLetCart } from "./ToLetCart";
import { QueryClient, useMutation } from "@tanstack/react-query";
import SpinnerMini from "./SpinnerMini";
import { Heading } from "./HeadingText";
import SelectStateLocalGovt from "./SelectStateLocalGovt";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { useSearchContext } from "../hooks/useSearchContext";

import { useFetchProperties } from "../hooks/useFetchProperties";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import SearchInput from "./SearchComponent";
import { useEffect, useState } from "react";

export default function PropertiesToLet() {
  const { documents, isLoading } = useFetchProperties("ToLet");
  const { query, setQuery } = useSearchContext();
  const { handleSubmit, register } = useForm();
  const [filteredDocuments, setFilteredDocuments] = useState();
  const [state, setState] = useState();

  useEffect(() => {
    let results = documents;

    if (query) {
      setState("");
      results = results?.filter(
        (docs) =>
          docs.state.toLowerCase().includes(query.toLowerCase()) ||
          docs.address.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (state) {
      setQuery("");
      results = results.filter((docs) =>
        docs.state.toLowerCase().includes(state.toLowerCase())
      );
    }
    setFilteredDocuments(results);
  }, [documents, query, state, setQuery]);

  console.log(state);

  const style = {
    container: {
      display: "none",
    },
  };

  const onSubmit = (data) => {
    data.state === "all" ? setState("") : setState(data.state.toLowerCase());
  };

  return (
    <div>
      <div className="w-[80%] flex  max-[736px]:flex-col max-[736px]:items-start gap-9 mx-auto px-6 text-center ">
        <form
          className="flex items-center gap-3 h-7 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-28">
            <SelectStateLocalGovt styles={style} register={register} />
          </div>
          <Button className="" type="secondary">
            Filter
          </Button>
        </form>
        <SearchInput />
      </div>

      <div className="flex flex-col items-center justify-center text-center mt-14"></div>
      <div className="mt-32">{!documents && <SpinnerMini />}</div>
      <div className="mt-24">
        {filteredDocuments?.length === 0 && (
          <p className="text-[1.16rem] text-center max-[450px]:px-7">
            There are no properties currently available in this region
          </p>
        )}
        {documents && (
          <ToLetCart documents={filteredDocuments} isPending={isLoading} />
        )}
      </div>
      {/* <Pagination count={filteredDocuments?.length} /> */}
    </div>
  );
}
