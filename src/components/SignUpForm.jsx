import Button from "./Button";
import FormRow from "./FormRow";
import Form from "./Form";
import SpinnerMini from "./SpinnerMini";

import { useForm } from "react-hook-form";
import StyledInput from "./StyledInput";
import { useSignup } from "../hooks/useSignup";

function SignUpForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, handleSubmit, reset, getValues, watch } =
    useForm();

  const { errors } = formState;

  function onSubmit({ email, password, fullName }) {
    console.log(email, password, fullName);

    signup(
      { email, fullName, password },
      {
        onSettled: reset,
      }
    );
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
          <FormRow label="password" error={errors?.password?.message}>
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
            label="Repeat password"
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
          {/* <FormRow label="Phone">
            <StyledInput
              minLength="11"
              placeHolder="Enter your phone Number"
              id="phone"
              {...register("phoneNumber", {
                required: "this field is required",
              })}
            />
          </FormRow> */}
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
