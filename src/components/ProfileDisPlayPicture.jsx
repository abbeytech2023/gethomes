import { useForm } from "react-hook-form";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ImageUpload from "./ImageUploadContainer";

export default function ProfileDisPlayPicture({ userDetails }) {
  console.log(userDetails);

  const queryClient = useQueryClient();

  const { register, formState, handleSubmit, reset, getValues, watch } =
    useForm();

  const { errors } = formState;

  return (
    <>
      <div className="flex flex-col items-center gap-4 mx-auto mb-12 text-black mt-22">
        <h2 className="font-medium tracking-wider md:text-2xl">
          Account Profile
        </h2>

        {userDetails && userDetails.image === null ? (
          <div>
            <ImageUpload />
          </div>
        ) : (
          <div className="flex justify-center items-center text-amber-50 w-[10rem] h-[9rem]">
            <img src={userDetails?.image} alt="" />
          </div>
        )}

        <p className="font-[500] text-[1.1rem]   md:text-[1.1rem]">
          Welcome {userDetails?.displayName}
        </p>
        <p className="md:pl-6.5 text-[1.2rem]">{userDetails?.email}</p>
      </div>
    </>
  );
}
