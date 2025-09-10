import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";
import { getSingleRent } from "../services/apiToLet";
import supabase from "../services/supabaseClients";
import Button from "../components/Button";
import styled from "styled-components";

export default function SingleProperty() {
  const { id } = useParams();
  const [propertyDescription, setPropertyDescription] = useState();
  const [propertyLocation, setPropertyLocation] = useState();
  const [PropertyImage, setPropertyImage] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [state, setState] = useState();
  const [localGovernment, setLocalGovernment] = useState();
  const [price, setPrice] = useState();
  const [businessName, setBusinessName] = useState();

  const navigate = useNavigate();

  const StyledHeading = styled.span`
    font-weight: 500;
    font-size: 18px;
  `;
  // const { propToLet, isPending: isLoading } = useFetchPropertiesTolet();

  useEffect(() => {
    const fetchSingleProperty = async () => {
      const { data, error } = await supabase
        .from("ToLet")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
      }

      if (data) {
        setPropertyDescription(data.propertyDescription);
        setPropertyLocation(data.propertyLocation);
        setPropertyImage(data.image);
        setPhoneNumber(data.phoneNumber);
        setState(data.state);
        setBusinessName(data.businessName);
        setLocalGovernment(data.localGovernment);
        setPrice(data.price);
        console.log(data);
      }

      return data;
    };

    fetchSingleProperty();
  }, [id]);

  return (
    <>
      <div className="flex xl:flex-row xl:gap-0 min-[0px]:gap-[5rem] flex-col  justify-around  mt-[9rem]">
        <div className="flex flex-col items-center w-[80%] gap-5 ">
          <div className="flex justify-between w-[70%] md:w-[50%]  min-[0px]:text-2xl text-3xl text-[#000000c0] font-bold">
            <p>{propertyDescription?.slice(0, 10)}</p>
            <p className="text-red-500 ">₦{price}</p>
          </div>
          <div className="min-[0px]:w-[100%] px-7 xl:w-[100%] flex justify-center ">
            <img src={PropertyImage} />
          </div>
        </div>

        <div className="flex flex-col gap-[4rem] xl:basis-[70%]  ">
          <div className="flex flex-col px-7 gap-[2rem] text-[17px] font-bold ">
            <p>Marketed By</p>
            <p>{businessName}</p>
          </div>

          <ul className="text-[16px] px-6   flex flex-col gap-[1.5rem]">
            <li className="">
              <StyledHeading>property-Description: </StyledHeading>{" "}
              {propertyDescription}
            </li>
            <li>
              <StyledHeading>Property-Location:</StyledHeading>{" "}
              {propertyLocation}
            </li>
            <li>
              <StyledHeading>price:</StyledHeading> ₦{price}
            </li>
            <li>
              <StyledHeading>phone:</StyledHeading> {phoneNumber}
            </li>
            <li>
              <StyledHeading>State:</StyledHeading> {state}
            </li>
            <li>
              <StyledHeading>local-government: </StyledHeading>
              {localGovernment}
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-[9rem]  mx-auto">
        <Button to="/rent" type="secondary">
          Back
        </Button>
      </div>
    </>
  );
}
