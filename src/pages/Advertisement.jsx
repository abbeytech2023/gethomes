import { useState } from "react";
import { Spinner } from "../components/Spinner";
import { useFetchLocalGovtga } from "../hooks/useFetchLga";
import { useGetStatesFromApi } from "../hooks/useFetchStates";

export default function Advertisement() {
  const [currentState, setCurrentState] = useState();
  const { allStates } = useGetStatesFromApi(
    "https://nga-states-lga.onrender.com/fetch"
  );

  const { localGovts } = useFetchLocalGovtga(
    `https://nga-states-lga.onrender.com/?state=${currentState}`
  );

  const handleOnChange = (e) => {
    setCurrentState(e.target.value);
    console.log(currentState);

    e.target.value;
  };

  return (
    <form className="mt-32 w-[30rem] ml-44  h-20 bg-yellow-300" action="">
      <select
        className="w-[9rem]"
        name=""
        onChange={(e) => handleOnChange(e)}
        id=""
      >
        {allStates?.map((state, i) => {
          return (
            <option key={i} value={state}>
              {state}
            </option>
          );
        })}
      </select>
      <select className="w-[9rem]" name="" id="">
        {localGovts?.map((state, i) => {
          return (
            <option key={i} value={state}>
              {state}
            </option>
          );
        })}
      </select>
    </form>
  );
}
