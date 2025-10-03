import { useState } from "react";
import Button from "./Button";
import FormRow from "./FormRow";
import { useForm } from "react-hook-form";
import Form from "./Form";
import StyledInput from "./StyledInput";
import { useLogin } from "../hooks/useLogin";
import SpinnerMini from "./SpinnerMini";
import { Link } from "react-router-dom";

function LoginForm() {
  const { login, isPending } = useLogin();

  const { register, getValues, reset, formState, handleSubmit } = useForm();

  const { errors } = formState;

  const onSubmit = ({ email, password }) => {
    login({ email, password });
  };

  return (
    <div>
      <div>
        <Form className="" onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <FormRow label="Email" error={errors?.email?.message}>
            <StyledInput
              type="email"
              placeHolder="Enter your Email"
              id="email"
              disabled={isPending}
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
              minLength="6"
              type="password"
              id="password"
              disabled={isPending}
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "password needs a minimum of 8 characters",
                },
              })}
            />
          </FormRow>

          <FormRow>
            <Button disabled={isPending} type="primary">
              {isPending ? <SpinnerMini /> : "login"}
              {/* <SpinnerMini /> */}
            </Button>
            <Link
              to="/forgot-password"
              className="w-full  mb-6 top-[-14px] right-0 absolute text-center text-[0.9rem] cursor-pointer text-[#144c6f]  ml-auto"
            >
              forgot password ?
            </Link>

            {/* \<p className="text-2xl text-red-700">{error}</p> */}
          </FormRow>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
