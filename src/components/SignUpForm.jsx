import Button from "./Button";
import FormRow from "./FormRow";
import Form from "./Form";
import SpinnerMini from "./SpinnerMini";

import { useForm } from "react-hook-form";
import StyledInput from "./StyledInput";
import { useSignup } from "../hooks/useSignup";
import { useFetchLocalGovtga } from "../hooks/useFetchLga";
import { useGetStatesFromApi } from "../hooks/useFetchStates";
import { useState } from "react";
import FileInput from "./FileInput";

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

function SignUpForm() {
  const [currentState, setCurrentState] = useState("Select-Your-State ");
  const { signup, isPending } = useSignup();
  const { register, formState, handleSubmit, reset, getValues, watch } =
    useForm();

  const { allStates } = useGetStatesFromApi(
    "https://nga-states-lga.onrender.com/fetch"
  );

  // const { localGovts } = useFetchLocalGovtga(
  //   `https://nga-states-lga.onrender.com/?state=${
  //     currentState ? currentState : ""
  //   }`
  // );

  const { localGovts } = useFetchLocalGovtga(
    `https://nga-states-lga.onrender.com/?state=${currentState}`
  );

  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);

    // signup({ ...data });
  }

  const handleOnChange = (e) => {
    setCurrentState(e.target.value);
    console.log(currentState);
  };

  return (
    <div>
      <div>
        <Form onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <FormRow label="Full-Name" error={errors?.fullName?.message}>
            <StyledInput
              // pattern="[a-zA-Z0-9]+"
              minLength="7"
              type="text"
              placeHolder="Enter your full Name"
              id="DisplayName"
              {...register("fullName", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Email" error={errors?.email?.message}>
            <StyledInput
              type="email"
              placeHolder="Enter your Email"
              id="email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />
          </FormRow>
          <FormRow label="State" error={errors?.State?.message}>
            <select
              name="state"
              id="state"
              className="py-[0.7rem] rounded-[0.5rem] border-black border-2 text-[1rem]"
              {...register("state", {
                onChange: (e) => handleOnChange(e),

                required: "This field is required",
                minLength: {
                  message: "select one profession from the list below",
                },
              })}
            >
              {allStates?.map((state, i) => {
                return (
                  <>
                    <option key="default">choose your state</option>
                    <option key={i} value={state}>
                      {state}
                    </option>
                  </>
                );
              })}
            </select>
          </FormRow>
          <FormRow label="Local-Government">
            <select
              name="localGovernment"
              id="localGovernment"
              className=" py-[0.7rem] rounded-[0.5rem] border-black border-2 text-[1rem]"
              {...register("localGovernment", {
                required: "This field is required",
                minLength: {
                  message: "select one profession from the list below",
                },
              })}
            >
              {localGovts &&
                localGovts.map((lga, i) => {
                  return (
                    <>
                      <option key={i} value={lga}>
                        {lga}
                      </option>
                    </>
                  );
                })}
            </select>
          </FormRow>

          <FormRow label="Profession" error={errors?.profession?.message}>
            <select
              name="profession"
              id="profession"
              className="py-[0.7rem] rounded-[0.5rem] border-black border-2 text-[1rem]"
              {...register("profession", {
                onChange: (e) => {
                  e.target.value;
                },
                required: "This field is required",
                minLength: {
                  message: "select one profession from the list below",
                },
              })}
            >
              {options.map((option, i) => {
                return (
                  <option key={i} value={option.value}>
                    {option.text}
                  </option>
                );
              })}
            </select>
          </FormRow>
          <FormRow
            label="Google business profile"
            error={errors?.googleBusiness?.message}
          >
            <StyledInput
              minLength="48"
              type="Google-business-profile"
              id="Google-business-profile"
              name="Google-business-profile"
              {...register("googleBusiness", {
                required:
                  "please enter your business profile page link on google",
              })}
            />
          </FormRow>
          <FormRow label="Password" error={errors?.password?.message}>
            <StyledInput
              minLength="8"
              type="password"
              id="password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "password needs a minimum of 8 characters",
                },
              })}
            />
          </FormRow>
          <FormRow
            label="Confirm password"
            error={errors?.passwordConfirm?.message}
          >
            <StyledInput
              minLength="8"
              type="password"
              id="passwordConfirm"
              name="password"
              {...register("passwordConfirm", {
                validate: (value) => {
                  const password = getValues().password;
                  if (value != password) return "password needs to match";
                },
              })}
            />
          </FormRow>

          <FormRow>
            <Button type="primary">
              {isPending ? <SpinnerMini /> : "Create a new user"}
            </Button>

            {/* <Button type="primary" disabled>
              loading...
            </Button> */}
          </FormRow>
          <p className="text-lg text-center w-[70%] mx-auto  text-red-700">
            {/* {error} */}
          </p>
        </Form>
      </div>
    </div>
  );
}

export default SignUpForm;
