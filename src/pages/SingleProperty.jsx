import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";
import { getSingleRent } from "../services/apiToLet";
import supabase from "../services/supabaseClients";
import Button from "../components/Button";

export default function SingleProperty() {
  const { id } = useParams();
  const [propertyDescription, setPropertyDescription] = useState();
  const [propertyLocation, setPropertyLocation] = useState();
  const [PropertyImage, setPropertyImage] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [localGovernment, setLocalGovernment] = useState();

  const navigate = useNavigate();

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
        setPhoneNumber(data.setPhoneNumber);
        setLocalGovernment(data.setLocalGovernment);
        console.log(data);
      }

      return data;
    };

    fetchSingleProperty();
  }, [id]);

  return (
    <>
      <div className="flex  justify-center w-[100%] bg-amber-700 mt-[9rem]">
        <div className="w-[400px]">
          <img src={PropertyImage} height="full" width="full" />
        </div>
        <div className="flex flex-col gap-[2rem]">
          <p className=" text-2xl">{propertyDescription}</p>
          <p>{propertyLocation}</p>
          <p>{phoneNumber}</p>
          <p>{localGovernment}</p>
        </div>
      </div>
      <div className="mt-[9rem]  mx-auto">
        <Button to="/rent" type="primary">
          Back
        </Button>
      </div>
    </>
  );
}
