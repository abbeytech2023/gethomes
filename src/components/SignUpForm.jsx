import Button from "./Button";
import FormRow from "./FormRow";
import Form from "./Form";
import SpinnerMini from "./SpinnerMini";

import { set, useForm } from "react-hook-form";
import StyledInput from "./StyledInput";
import { useSignup } from "../hooks/useSignup";
import { useState } from "react";
import SelectComponent from "./SelectComponent";
import SelectStateLocalGovt from "./SelectStateLocalGovt";
import { ProfessionOptions } from "./ProfessionOptions";
import { useGetAccessCodes } from "../hooks/useGetAccessCode";
import supabase from "../services/supabaseClients";

function SignUpForm() {
  const [selectedValue, setSelectedValue] = useState();
  const { signup, isPending } = useSignup();
  const [codeError, setCodeError] = useState();
  const {
    register,
    formState,
    handleSubmit,
    reset,
    getValues,
    watch,
    setError,
  } = useForm();

  // const { localGovts } = useFetchLocalGovtga(
  //   `https://nga-states-lga.onrender.com/?state=${
  //     currentState ? currentState : ""
  //   }`
  // );

  const { errors } = formState;

  async function onSubmit(data) {
    // Step 1: Look up the code
    const { data: codes, error: codesError } = await supabase
      .from("AccessCode")
      .select("*")
      .ilike("code", data.accessCode)
      .eq("active", true)
      .single(); // expect only one match

    console.log(codes);
    if (codesError || !codes) {
      console.log(codesError.message);
      setCodeError("invalid or already used code");
      setError("accessCode", { message: "Invalid or already used code." });
      alert(codeError);

      return;
    }

    //2. Mark the code as used
    const { error: updateError } = await supabase
      .from("AccessCode")
      .update({ active: false, used_at: new Date() })
      .eq("id", codes.id);

    if (updateError) {
      setError("accessCode", { message: "Error marking code as used." });
      console.log(updateError);

      return;
    }

    signup({ ...data });
    // console.log(data);
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
          <FormRow label="Company name" error={errors.businessName?.message}>
            <StyledInput
              type="text"
              placeholder="Enter Your Company Name"
              id="businessName"
              {...register("businessName", {
                required: "Your business name is required",
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
          <FormRow label="Mobile" error={errors.phone?.message}>
            <StyledInput
              name="phoneNumber"
              id="phoneNumber"
              placeholder="mobile phone"
              {...register("phone", {
                required: "please enter your phone number to continue",
              })}
            />
          </FormRow>
          <FormRow label="Validation Code" error={errors?.accessCode?.message}>
            <StyledInput
              name="access_code"
              id="access_code"
              placeholder="paste the code here"
              {...register("accessCode", {
                required: "you need an access code to continue",
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
