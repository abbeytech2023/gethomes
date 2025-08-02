import Button from "./Button";
import FormRow from "./FormRow";
import Form from "./Form";
import SpinnerMini from "./SpinnerMini";

import { useForm } from "react-hook-form";
import StyledInput from "./StyledInput";
import { useSignup } from "../hooks/useSignup";

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
  const { signup, isPending } = useSignup();
  const { register, formState, handleSubmit, reset, getValues, watch } =
    useForm();

  const { errors } = formState;

  function onSubmit({ email, password, fullName, profession, googleBusiness }) {
    console.log(email, password, fullName, profession, googleBusiness);

    signup({ email, fullName, password, profession });
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
          <FormRow label="Profession" error={errors?.profession?.message}>
            <select
              name="profession"
              id="profession"
              onChange={(e) => e.target.value}
              className="px-[2rem] py-[1rem] rounded-[0.5rem] border-black border-2 text-[1rem]"
              {...register("profession", {
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
