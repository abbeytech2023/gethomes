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
import SelectComponent from "./SelectComponent";
import SelectStateLocalGovt from "./SelectStateLocalGovt";
import { ProfessionOptions } from "./ProfessionOptions";

function SignUpForm() {
  const [selectedValue, setSelectedValue] = useState();
  // const [currentState, setCurrentState] = useState(())
  const { signup, isPending } = useSignup();
  const { register, formState, handleSubmit, reset, getValues, watch } =
    useForm();

  // const { localGovts } = useFetchLocalGovtga(
  //   `https://nga-states-lga.onrender.com/?state=${
  //     currentState ? currentState : ""
  //   }`
  // );

  const { errors } = formState;

  function onSubmit(data) {
    signup({ ...data });
    console.log(data);
  }

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
          <FormRow>
            <StyledInput
              type="text"
              placeholder="Enter Your Company Name"
              id="businessName"
              {...register("businessName", {
                required:
                  "please enter your business profile page link on google",
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

          <SelectStateLocalGovt register={register} />

          <FormRow label="Profession" error={errors?.profession?.message}>
            <SelectComponent
              name="profession"
              options={ProfessionOptions}
              value={selectedValue}
              register={register}
            />
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
