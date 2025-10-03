import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import supabase from "../services/supabaseClients";
import SpinnerMini from "../components/SpinnerMini";
import Button from "../components/Button";
import styled from "styled-components";
import { formatDate, formatPrice } from "../utility/utility";
import ImageSlider from "../components/ImageSlider";
// import ImageSlider from "../components/ImageSlider";

export default function SinglePropertyToLet() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [propertyDescription, setPropertyDescription] = useState();
  const [propertyLocation, setPropertyLocation] = useState();
  const [PropertyImage, setPropertyImage] = useState();
  const [propertyVideo, setPropertyVideo] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [state, setState] = useState();
  const [localGovernment, setLocalGovernment] = useState();
  const [price, setPrice] = useState();
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
        .from("ToLet")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
      }

      console.log(data.propertyVideo);

      if (data) {
        setData(data);
        setPropertyDescription(data.propertyDescription);
        setPropertyLocation(data.address);
        setPropertyImage(data.image);
        setPropertyVideo(data.videoUrl);
        setPhoneNumber(data.phoneNumber);
        setState(data.state);
        setBusinessName(data.businessName);
        setLocalGovernment(data.localGovernment);
        setPrice(data.price);
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
      src: propertyVideo, // Replace with your YouTube link
    },
  ];
  return (
    <>
      {!price && <SpinnerMini />}
      {data && (
        <>
          <div className="flex xl:flex-row xl:gap-0 min-[0px]:gap-[5rem] flex-col items-center  justify-around  mt-[9rem]">
            <div className="px-2">
              <ImageSlider slides={slides} />
            </div>

            <div className="flex flex-col gap-[4rem]  px-auto xl:basis-[50%]  ">
              <div className="flex flex-col px-7 gap-[2rem] text-[17px] font-bold ">
                <p>Marketed By</p>
                <p>{businessName}</p>
              </div>

              <ul className="text-[16px] px-6   flex flex-col gap-[0.6rem]">
                <li className="">
                  <StyledHeading>property-Description: </StyledHeading>{" "}
                  {propertyDescription}
                </li>
                <li>
                  <StyledHeading>Property-Location:</StyledHeading>{" "}
                  {propertyLocation}
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
          <div className="mt-[7rem]  mx-auto">
            <Button to="/rent" type="secondary">
              Back
            </Button>
          </div>
        </>
      )}
    </>
  );
}
