import Button from "./Button";
import FormRow from "./FormRow";
import StyledInput from "./StyledInput";
import toast from "react-hot-toast";
import { useUser } from "../hooks/useUser";
import { useForm } from "react-hook-form";

import { addPropertiesForsSale } from "../services/apiForSale";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FileInput from "./FileInput";
import styled from "styled-components";
import SpinnerMini from "./SpinnerMini";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toYoutubeEmbed } from "../utility/youtubeLinkConverts";
import { nigeriaData } from "../utility/stateLocalGovt";

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

  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");

  const allStates = Object.keys(nigeriaData);

  const localGovts = selectedState ? nigeriaData[selectedState] : [];
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
    setSelectedState(e.target.value);
    console.log(selectedState);
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
                value={selectedState}
                className="px-[2rem] py-[1rem] rounded-[0.5rem] border-black border-2 text-[1rem]"
                {...register("state", {
                  onChange: (e) => handleOnChange(e),

                  required: "This field is required",
                  minLength: {
                    message: "select one profession from the list below",
                  },
                })}
              >
                <option>choose state</option>
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
                <option>choose lga</option>
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
