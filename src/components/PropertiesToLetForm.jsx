import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import FormRow from "./FormRow";
import StyledInput from "./StyledInput";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUser } from "../hooks/useUser";
import { StyledFormDiv } from "./ProductSaleForm";

import { addPropertiesToLet } from "../services/apiToLet";
import FileInput from "./FileInput";

export default function PropertyToLetForm() {
  const QueryClient = useQueryClient();
  const { register, getValues, reset, handleSubmit, formState } = useForm();
  const { user } = useUser();

  const uid = user?.id;

  const agentName = user?.user_metadata?.fullName;

  const { errors } = formState;
  // const agentName = "sola";
  const phoneNumber = "08036400784";

  const { mutate, isPending } = useMutation({
    mutationFn: addPropertiesToLet,
    onSuccess: () => {
      toast.success("property added successfully");
      QueryClient.invalidateQueries({ queryKey: ["ToLet"] });
      reset();
    },
    onError: () => {
      toast.error("property could not be added");
    },
  });

  const onSubmit = (data) => {
    mutate({
      ...data,
      agentName,
      phoneNumber,
      uid,
      image: data.image[0],
    });
    console.log({ ...data, agentName, phoneNumber, image: data.image[0] });
    console.log(data.image);
  };

  return (
    <div className="mb-20 ">
      <div className="h-[70rem] flex  flex-col gap-8  ">
        <div className="flex justify-center  items-center">
          <Form onSubmit={onSubmit} handleSubmit={handleSubmit}>
            <FormRow
              label="Property Description"
              error={errors?.propertyDescription?.message}
            >
              <StyledInput
                type="text"
                placeHolder="describe the property"
                id="propertyDescription"
                {...register("propertyDescription", {
                  required: "This field is required",
                })}
              />
            </FormRow>
            <FormRow
              label="Property-Location"
              error={errors?.propertyLocation?.message}
            >
              <StyledInput
                type="text"
                id="propertyLocation"
                {...register("propertyLocation", {
                  required: "This field is required",
                })}
              />
            </FormRow>
            <FormRow label="State" error={errors?.State?.message}>
              <StyledInput
                type="text"
                id="state"
                {...register("state", {
                  required: "This field is required",
                })}
              />
            </FormRow>
            <FormRow
              label="Local-Government"
              error={errors?.localGovernment?.message}
            >
              <StyledInput
                type="text"
                id="localGovernment"
                {...register("localGovernment", {
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
              {!isPending && (
                <Button type="primary" className="mt-12">
                  Complete
                </Button>
              )}
              {isPending && (
                <Button type="primary" disabled>
                  loading...
                </Button>
              )}
            </FormRow>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Form({ children, handleSubmit, onSubmit }) {
  return (
    <StyledFormDiv
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-4"
    >
      {children}
    </StyledFormDiv>
  );
}
