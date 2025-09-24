import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import FormRow from "./FormRow";
import StyledInput from "./StyledInput";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUser } from "../hooks/useUser";
import { StyledFormDiv } from "./ProductSaleForm";
import { useGetStatesFromApi } from "../hooks/useFetchStates";
import { useFetchLocalGovtga } from "../hooks/useFetchLga";

import { addPropertiesToLet } from "../services/apiToLet";
import FileInput from "./FileInput";
import { useState } from "react";
import { toYoutubeEmbed } from "../utility/youtubeLinkConverts";

export default function PropertyToLetForm() {
  const queryClient = useQueryClient();
  const [currentState, setCurrentState] = useState();

  const { register, getValues, reset, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { user } = useUser();
  const { allStates } = useGetStatesFromApi(
    "https://nga-states-lga.onrender.com/fetch"
  );
  const { localGovts } = useFetchLocalGovtga(
    `https://nga-states-lga.onrender.com/?state=${currentState || ""} `
  );

  const uid = user?.id;
  const agentName = user?.user_metadata?.fullName;
  const businessName = user?.user_metadata?.businessName;
  const phoneNumber = user?.user_metadata?.phone;

  // const agentName = "sola";

  const { mutate, isPending } = useMutation({
    mutationFn: addPropertiesToLet,
    onSuccess: () => {
      toast.success("property added successfully");
      queryClient.invalidateQueries({ queryKey: ["ToLet"] });
      reset();
    },
    onError: () => {
      toast.error("property could not be added");
    },
  });
  const onSubmit = (data) => {
    const videoUrl = toYoutubeEmbed(data.videoUrl);

    mutate({
      ...data,
      agentName,
      businessName,
      phoneNumber,
      uid,
      image: data.image[0],
      videoUrl,
    });
    console.log({ ...data }, videoUrl);
  };

  const handleOnChange = (e) => {
    setCurrentState(e.target.value);
  };

  return (
    <div className="">
      <div className="flex flex-col gap-8 ">
        <div className="flex flex-col gap-8 mt-14">
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
            <FormRow label="price">
              <StyledInput
                type="number"
                placeholder="pricing"
                id="price"
                {...register("price", {
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
                placeholder="Location of the property"
                {...register("propertyLocation", {
                  required: "This field is required",
                })}
              />
            </FormRow>
            <FormRow label="State" error={errors?.State?.message}>
              <select
                name="state"
                id="state"
                value={currentState}
                className="px-[2rem] py-[1rem] rounded-[0.5rem] border-black border-2 text-[1rem]"
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
                    <div key={i}>
                      <option value={state}>{state}</option>
                    </div>
                  );
                })}
              </select>
            </FormRow>
            <FormRow
              label="Local-Government"
              error={errors?.localGovernment?.message}
            >
              <select
                name="localGovernment"
                id="localGovernment"
                className="px-[2rem] py-[1rem] rounded-[0.5rem] border-black border-2 text-[1rem]"
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
            <FormRow label="videoLink">
              <StyledInput
                placeHolder=" youtube video Link of the property"
                id="videoLink"
                {...register("videoUrl", {
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
