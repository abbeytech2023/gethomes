import React, { useEffect, useState } from "react";
import { useGetStatesFromApi } from "../hooks/useFetchStates";
import { useFetchLocalGovtga } from "../hooks/useFetchLga";

export default function SelectComponent({ options, register, name }) {
  const profession = name === "profession";
  const allState = name === "allStates";
  const localGovernment = name === "localGovt";

  // const { register, formState, handleSubmit, reset, getValues } = useForm();
  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    console.log(selectedValue);
  };

  return (
    <>
      {profession && (
        <select
          value={selectedValue}
          name="profession"
          id="profession"
          className="py-[0.7rem] rounded-[0.5rem] border-black border-2 text-[1rem]"
          {...register("profession", {
            onChange: handleChange,
            required: "This field is required",
            minLength: {
              message: "select one profession from the list below",
            },
          })}
        >
          {options?.map((opt, i) => {
            return (
              <>
                <option key={i} value={opt.value}>
                  {opt.text}
                </option>
              </>
            );
          })}
        </select>
      )}
    </>
  );
}
