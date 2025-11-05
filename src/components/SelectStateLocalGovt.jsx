import FormRow from "./FormRow";
import { nigeriaData } from "../utility/stateLocalGovt";
import { useState } from "react";

export default function SelectStateLocalGovt({ register, styles }) {
  const [selectedState, setSelectedState] = useState("");

  const allStates = Object.keys(nigeriaData);
  const localGovts = selectedState ? nigeriaData[selectedState] : [];
  const handleOnChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <FormRow label="State">
        <select
          name="allState"
          id="state"
          // value={currentState}
          className="px-[2rem] py-[1rem] rounded-[0.5rem]  border-[0.1rem] text-[1rem]"
          {...register("state", {
            onChange: (e) => handleOnChange(e),
            required: "This field is required",
            minLength: {
              message: "select one profession from the list below",
            },
          })}
        >
          <option key="default" value="all">
            All
          </option>
          {allStates?.map((state, i) => {
            return (
              <option value={state} key={i}>
                {state}
              </option>
            );
          })}
        </select>
      </FormRow>
      <FormRow styles={styles} label="Local-govt">
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
