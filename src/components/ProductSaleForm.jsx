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
import SpinnerMini from "./SpinnerMini";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetStatesFromApi } from "../hooks/useFetchStates";
import { useFetchLocalGovtga } from "../hooks/useFetchLga";
import SelectStateLocalGovt from "./SelectStateLocalGovt";
import { toYoutubeEmbed } from "../utility/youtubeLinkConverts";

export const StyledFormDiv = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  grid-template-rows: auto;
  align-items: center;

  & input {
    // width: 90%;
  }
`;

function ProductSaleForm() {
  const QueryClient = useQueryClient();
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState();

  const { allStates } = useGetStatesFromApi(
    "https://nga-states-lga.onrender.com/fetch"
  );

  const { localGovts } = useFetchLocalGovtga(
    `https://nga-states-lga.onrender.com/?state=${currentState}`
  );

  const { user } = useUser();

  const uid = user?.id;
  const businessName = user?.user_metadata?.businessName;
  const phoneNumber = user?.user_metadata?.phone;

  const { reset, register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationFn: (newProperty) => addPropertiesForsSale(newProperty),
    onSuccess: () => {
      toast.success("Property added successfully");
      navigate("/myaccount/dashboard");
      QueryClient.invalidateQueries({ queryKey: ["Outlets"] });
      reset();
    },
    onError: () => {
      toast.error("property could not be added");
    },
  });

  const onSubmit = (data) => {
    const videoLink = toYoutubeEmbed(data.videoLink);

    mutate({
      ...data,
      uid,
      image: data.image[0],
      videoLink,
      businessName,
      phoneNumber,
    });

    // mutate({ ...data, uid });
  };

  const handleOnChange = (e) => {
    setCurrentState(e.target.value);
    console.log(currentState);
  };

  return (
    <div className="">
      <div className="flex flex-col gap-8 ">
        <div className="flex flex-col gap-8 mt-14">
          <Form
            // className="flex flex-col items-center justify-center"
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
          >
            <FormRow
              label="Property details"
              error={errors?.propertyDetails?.message}
            >
              <StyledInput
                minLength="15"
                placeholder="Describe the property"
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
                placeHolder="The location of the property"
                id="address"
                {...register("address", {
                  required: "This field is required",
                })}
              />
            </FormRow>
            {/* <FormRow label="Title" error={errors?.state?.message}>
              <StyledInput
                minLength="7"
                placeHolder=" The name of the property owner"
                id="title"
                {...register("title", {
                  required: "This field is required",
                })}
              />
            </FormRow> */}
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
                {...register("videoLink", {
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
                {!isPending ? <p>Completed</p> : <SpinnerMini />}
              </Button>
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
      // className="flex flex-col items-center justify-center gap-4"
      className="grid grid-cols-2 gap-4"
    >
      {children}
    </StyledFormDiv>
  );
}
