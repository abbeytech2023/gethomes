import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import supabase from "../services/supabaseClients";
import SpinnerMini from "../components/SpinnerMini";
import Button from "../components/Button";
import styled from "styled-components";
import { formatDate, formatPrice } from "../utility/utility";
import ImageSlider from "../components/ImageSlider";

import React from "react";

export default function SinglePropertyForSale() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [propertyDetails, setPropertyDetails] = useState();
  const [propertyAddress, setPropertyAddress] = useState();
  const [PropertyImage, setPropertyImage] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [state, setState] = useState();
  const [localGovernment, setLocalGovernment] = useState();
  const [price, setPrice] = useState();
  const [videoLink, setVideoLink] = useState();
  const [businessName, setBusinessName] = useState();
  const [createdAt, setCreatedAt] = useState();

  const navigate = useNavigate();

  const StyledHeading = styled.span`
    font-weight: 600;
    font-size: 18px;
    margin-right: 6px;
  `;
  // const { propToLet, isPending: isLoading } = useFetchPropertiesTolet();

  useEffect(() => {
    const fetchSingleProperty = async () => {
      const { data, error } = await supabase
        .from("ForSale")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
      }

      if (data) {
        setData(data);
        setPropertyDetails(data.propertyDetails);
        setPropertyAddress(data.address);
        setPropertyImage(data.image);
        setPhoneNumber(data.phoneNumber);
        setState(data.state);
        setBusinessName(data.businessName);
        setLocalGovernment(data.localGovernment);
        setPrice(data.price);
        setVideoLink(data.videoLink);
        setCreatedAt(data.created_at);
        console.log(data);
      }

      return data;
    };

    fetchSingleProperty();
  }, [id]);

  const slides = [
    {
      type: "image",
      src: PropertyImage,
    },
    {
      type: "video",
      src: videoLink, // Replace with your YouTube link
    },
  ];

  return (
    <>
      {!data && <SpinnerMini />}
      {data && (
        <>
          <div>
            <div className="flex xl:flex-row xl:gap-0 min-[0px]:gap-[5rem] flex-col items-center  justify-around  mt-[9rem]">
              <div className="">
                <ImageSlider slides={slides} />
              </div>

              <div className="flex flex-col gap-[4rem] xl:basis-[70%]  ">
                <div className="flex flex-col px-7 gap-[2rem] text-[17px] font-bold ">
                  <p>Marketed By</p>
                  <p>{businessName}</p>
                </div>

                <ul className="text-[16px] px-6 flex flex-col gap-[1.5rem]">
                  <li className="">
                    <StyledHeading>property-Description: </StyledHeading>
                    {propertyDetails.toLowerCase()}
                  </li>
                  <li>
                    <StyledHeading>Property-Location:</StyledHeading>
                    {propertyAddress.toLowerCase()}
                  </li>
                  <li>
                    <StyledHeading>price:</StyledHeading> {formatPrice(price)}
                  </li>
                  <li>
                    <StyledHeading>phone:</StyledHeading> {phoneNumber}
                  </li>
                  <li>
                    <StyledHeading>State:</StyledHeading> {state}
                  </li>
                  <li>
                    <StyledHeading>Local-government: </StyledHeading>
                    {localGovernment}
                  </li>
                  <li>
                    <StyledHeading>Date:</StyledHeading> {formatDate(createdAt)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-[9rem]  mx-auto">
            <Button to="/buy" type="secondary">
              Back
            </Button>
          </div>
        </>
      )}

      {/* <ImageSlider images={PropertyImage} video={videoLink} /> */}
    </>
  );
}
