import { useEffect, useState } from "react";
import Button from "../components/Button";
import SpinnerMini from "../components/SpinnerMini";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useFetchUsersWithId } from "../hooks/useFetchUsers";
import { useFetchPropertiesWithId } from "../hooks/useFetchProperties";

export default function MerchantsPage() {
  const { id } = useParams();

  const { documents, isLoading, error } = useFetchUsersWithId(id);

  console.log(document);

  return (
    <>
      <h2 className="mt-[10rem] uppercase font-medium text-2xl text-center m-7">
        {`The best ${id} near you`}
      </h2>
      {isLoading && <SpinnerMini />}
      {document?.length === 0 && (
        <p className="text-center text-[1.3rem] text-red-600">
          we are sorry!!! we currently do not <br /> have available
          professionals this time, please check back later
        </p>
      )}
      {documents &&
        documents.map((doc, i) => {
          return (
            <div key={i}>
              <div className="flex justify-center items-center flex-col gap-7   border-black">
                <MerchantProfile doc={doc} />
              </div>
            </div>
          );
        })}
      <div className="mt-[9rem]   mx-auto">
        <Button to="/homeessentials" type="secondary">
          Back
        </Button>
      </div>
    </>
  );
}

function MerchantProfile({ doc }) {
  return (
    <div className="border-2 border-gray-500 py-7 px-11 flex sm:flex-row md:flex-row lg:flex-row xl:flex-row min-[0px]:flex-col justify-center items-center gap-9 ">
      <div className="bg-red-700 px-7 py-5 rounded-[50%]">
        <img
          src={`https://media.istockphoto.com/id/2161204802/photo/threatening-revelations-under-the-magnifying-glass.webp?a=1&b=1&s=612x612&w=0&k=20&c=WEhP6EvDBMD0ZLf1YfRxvkiSK9ERTnTLZlxabjMh_VU=`}
          height="100px"
          width="100px"
        />
      </div>
      <div className="">
        <h3 className="font-medium mb-4">{doc.displayName}</h3>
        <ul className="text-gray-800 max-w-[29rem] mb-6">
          <li className="flex gap-3">
            <span>
              <CiLocationOn className="text-2xl" />
            </span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            possimus est facere. Vitae, odio reprehenderit!
          </li>
          <li className="flex gap-3">
            <span>
              <IoCallOutline className="text-2xl" />
            </span>
            Lorem, ipsum dolor sit amet consectetur adipisicing.
          </li>
          <li className="flex gap-3">
            <span>
              <IoTimeOutline className="text-2xl" />
            </span>
            Lorem ipsum dolor sit.
          </li>
        </ul>
        <p className="text-gray-900">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam expedita
          rem dignissimos?
        </p>
      </div>
      <div>
        <Button type="secondary">
          {OpenGoogleInNewTab(doc.googleBusiness)}
        </Button>
      </div>
    </div>
  );
}

function OpenGoogleInNewTab(link) {
  const handleOpen = () => {
    window.open(link, "_blank");
  };

  return <Button onClick={handleOpen}>Open google business</Button>;
}
