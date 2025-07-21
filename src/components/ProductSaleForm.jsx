import Button from "./Button";
import FormRow from "./FormRow";
import StyledInput from "./StyledInput";
import toast from "react-hot-toast";
import { useUser } from "../hooks/useUser";
import { useForm } from "react-hook-form";
import { Heading } from "./HeadingText";

import { addPropertiesForsSale } from "../services/apiForSale";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FileInput from "./FileInput";
import styled from "styled-components";

export const StyledFormDiv = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  grid-template-rows: auto;
  align-items: center;

  & input {
    width: 90%;
  }
`;

function ProductSaleForm() {
  const QueryClient = useQueryClient();

  const { user } = useUser();

  const uid = user?.id;

  console.log(uid);

  const { reset, register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationFn: (newProperty) => addPropertiesForsSale(newProperty),
    onSuccess: () => {
      toast.success("Property added successfully");
      QueryClient.invalidateQueries({ queryKey: ["Outlets"] });
      reset();
    },
    onError: () => {
      toast.error("property could not be added");
    },
  });

  const onSubmit = (data) => {
    mutate({ ...data, uid, image: data.image[0] });
    console.log(data);
  };

  return (
    <div className=" ">
      <div className="h-[70rem] flex  flex-col gap-8">
        <div className=" flex mt-14 flex-col gap-8">
          <Form
            // className="flex items-center justify-center flex-col"
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
          >
            <FormRow
              label="Property details"
              error={errors?.propertyDetails?.message}
            >
              <StyledInput
                minLength="10"
                placeholder="About the property"
                id="propertyDetails"
                {...register("propertyDetails", {
                  required: "This field is required",
                })}
              ></StyledInput>
            </FormRow>
            <FormRow label="Address" error={errors?.address?.message}>
              <StyledInput
                minLength="15"
                className="h-[50px]"
                placeHolder="The location of property"
                id="address"
                {...register("address", {
                  required: "This field is required",
                })}
              />
            </FormRow>
            <FormRow label="Title" error={errors?.state?.message}>
              <StyledInput
                minLength="7"
                placeHolder=" The name of the property owner"
                id="title"
                {...register("title", {
                  required: "This field is required",
                })}
              />
            </FormRow>
            <FormRow label="Total-Package" error={errors?.price?.message}>
              <StyledInput
                type="number"
                placeHolder="pricing"
                id="price"
                {...register("price", {
                  required: "This field is required",
                })}
              />
            </FormRow>
            <FormRow label="property photo">
              <FileInput
                id="image"
                accept="image/*"
                type="file"
                {...register("image", {
                  required: "This field is required",
                })}
              />
            </FormRow>
            <FormRow>
              <Button type="primary">
                <p>Completed</p>
              </Button>
              {/* <Button type="primary">
                <p>Cancel</p>
              </Button> */}
            </FormRow>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ProductSaleForm;

function Form({ children, handleSubmit, onSubmit }) {
  return (
    <StyledFormDiv
      onSubmit={handleSubmit(onSubmit)}
      // className="flex gap-4 items-center justify-center flex-col"
      className="grid grid-cols-2 gap-4"
    >
      {children}
    </StyledFormDiv>
  );
}
