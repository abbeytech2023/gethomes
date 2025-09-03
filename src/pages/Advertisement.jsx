import { useState } from "react";
import { Spinner } from "../components/Spinner";
import SelectComponent from "../components/SelectComponent";
import { useForm } from "react-hook-form";

const options = [
  { value: "", text: "select a profession" },
  { value: "houseAgents", text: "houseAgents" },
  { value: "welder", text: "welder" },
  { value: "electrical-engineer", text: "electrical-engineer" },
  { value: "plumber", text: "plumber" },
  { value: "furniture", text: "furniture" },
  { value: "electronic-store", text: "electronic-store" },
  { value: "solar-engineer", text: "solar-engineer" },
  { value: "electroni-store", text: "welder" },
];

export default function Advertisement() {
  const [selectedValue, setSelectedValue] = useState();
  const { control, handleSubmit } = useForm();

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  return (
    <form className="mt-32 w-[30rem] ml-44  h-20 bg-yellow-300" action="">
      <SelectComponent
        options={options}
        control={control}
        value={selectedValue}
        onChange={handleChange}
      />
    </form>
  );
}
