import Button from "../components/Button";
import IMAGE from "../assets/images/logo.jpg";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";

export default function MerchantsPage() {
  return (
    <>
      <h2 className="mt-[10rem] text-3xl text-center m-7">
        The best designer near you
      </h2>
      <div className="flex justify-center items-center flex-col gap-7   border-black">
        <MerchantProfile />
        <MerchantProfile />
        <MerchantProfile />
      </div>
    </>
  );
}

function MerchantProfile() {
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
        <h3 className="font-medium mb-4">Wise enterprises</h3>
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
      <div className=" px-7">
        <Button type="secondary">Google Business</Button>
      </div>
    </div>
  );
}
