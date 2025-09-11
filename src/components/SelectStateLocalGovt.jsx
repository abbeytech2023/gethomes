import React, { useState } from "react";
import { useFetchLocalGovtga } from "../hooks/useFetchLga";
import { useGetStatesFromApi } from "../hooks/useFetchStates";
import FormRow from "./FormRow";

export default function SelectStateLocalGovt({ register, styles }) {
  const [currentState, setCurrentState] = useState("");

  const { allStates } = useGetStatesFromApi(
    "https://nga-states-lga.onrender.com/fetch"
  );

  const { localGovts } = useFetchLocalGovtga(
    `https://nga-states-lga.onrender.com/?state=${currentState}`
  );

  const handleOnChange = (e) => {
    setCurrentState(e.target.value);
    // console.log(localGovts);
    console.log(currentState);
  };

  return (
    <div className="flex flex-col">
      <FormRow label="State">
        <select
          name="allState"
          id="state"
          // value={currentState}
          className="px-[2rem] py-[1rem] rounded-[0.5rem] border-black border-2 text-[1rem]"
          {...register("state", {
            onChange: (e) => handleOnChange(e),
            required: "This field is required",
            minLength: {
              message: "select one profession from the list below",
            },
          })}
        >
          <option key="default">All</option>
          {allStates?.map((state, i) => {
            return <option key={i}>{state}</option>;
          })}
        </select>
      </FormRow>
      <FormRow styles={styles} label="local-govt">
        <select
          name="localGovts"
          id="localGovernment"
          className="px-[2rem] py-[1rem] rounded-[0.5rem] border-black border-2 text-[1rem]"
          {...register("localGovernment", {
            required: "This field is required",
            minLength: {
              message: "select one profession from the list below",
            },
          })}
        >
          <option key="default">choose</option>
          {localGovts?.map((lga, i) => {
            return (
              <option key={i} value={lga}>
                {lga}
              </option>
            );
          })}
        </select>
      </FormRow>
    </div>
  );
}
