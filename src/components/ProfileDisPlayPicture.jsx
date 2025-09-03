import { useForm } from "react-hook-form";
import FormRow from "./FormRow";
import FileInput from "./FileInput";
import Button from "./Button";
import SpinnerMini from "./SpinnerMini";
import UploadIcon from "../assets/images/upload-icon.webp";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ImageUpload from "./ImageUploadContainer";

export default function ProfileDisPlayPicture({ userDetails }) {
  const queryClient = useQueryClient();

  const { register, formState, handleSubmit, reset, getValues, watch } =
    useForm();

  const { errors } = formState;

  const [selectedFile, setSelectedFile] = useState();

  function onSubmited(data) {
    // console.log(data.image[0]);
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
    console.log(selectedFile);
  };

  return (
    <>
      <div className="mt-22 mb-12 gap-4 flex flex-col text-black mx-auto items-center">
        <h2 className="font-medium  md:text-2xl tracking-wider">
          Account Profile
        </h2>

        <div>
          <ImageUpload />
        </div>

        {/* <div className="flex justify-center items-center text-amber-50 w-[10rem] h-[9rem] bg-blue-700">
          OA
        </div> */}

        <p className="font-[500] text-[1.1rem]   md:text-[1.1rem]">
          {userDetails?.fullName}
        </p>
        <p className="md:pl-6.5 text-[1.2rem]">{userDetails?.email}</p>
      </div>
    </>
  );
}
