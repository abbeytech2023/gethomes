// import { useForm } from "react-hook-form";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import ImageUpload from "./ImageUploadContainer";

// export default function ProfileDisPlayPicture({ userDetails }) {
//   console.log(userDetails);

//   const queryClient = useQueryClient();

//   const { register, formState, handleSubmit, reset, getValues, watch } =
//     useForm();

//   const { errors } = formState;

//   return (
//     <>
//       <div className="flex flex-col items-center gap-4 mx-auto mb-12 text-black mt-22">
//         <h2 className="font-medium tracking-wider md:text-2xl">
//           Account Profile
//         </h2>

//         {userDetails && userDetails.image === null ? (
//           <div>
//             <ImageUpload />
//           </div>
//         ) : (
//           <div className="flex justify-center items-center text-amber-50 w-[10rem] h-[9rem]">
//             <img src={userDetails?.image} alt="" />
//           </div>
//         )}

//         <p className="font-[500] text-[1.1rem]   md:text-[1.1rem]">
//           Welcome {userDetails?.displayName}
//         </p>
//         <p className="md:pl-6.5 text-[1.2rem]">{userDetails?.email}</p>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { useFetchUsersWithId } from "../hooks/useFetchUsers";
import { useUser } from "../hooks/useUser";
import uploadProfilePicture from "../services/apiUpdateProfile";

const ProfileCard = ({ user }) => {
  const userId = user?.id;

  const [avatar, setAvatar] = useState(user?.image);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (preview) {
      setAvatar(preview);
    }
  }, [preview]);

  // Handle file change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file); // preview image
      setPreview(imageUrl);
      const result = await uploadProfilePicture(userId, file);
      // mutate({ image: selectedFile });
      if (result.success) console.log("profile updated:", result.url);
      if (result.error) console.error("Error:", result.error);
    } else {
      setAvatar(null);
      alert("Please select a valid image file");
    }
  };

  return (
    <div className="max-w-sm p-6 mx-auto text-center bg-white shadow-lg rounded-2xl">
      {/* Profile Picture */}
      <div className="relative inline-block">
        <img
          src={avatar}
          alt={user?.name}
          className="object-cover w-32 h-32 border-4 border-blue-500 rounded-full"
        />

        {/* Upload Form */}
        <label className="absolute bottom-0 right-0 px-2 py-1 text-xs text-white bg-blue-600 rounded cursor-pointer hover:bg-blue-700">
          Change
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* User Info */}
      <h2 className="mt-4 text-2xl font-bold">{user?.displayName}</h2>
      <p className="text-gray-600">{user?.email}</p>
    </div>
  );
};

export default function ProfileDisplayPicture() {
  const { user } = useUser();
  const { authenticatedUser } = useFetchUsersWithId(user?.id);

  const authUser = authenticatedUser?.[0];

  return (
    <div className="flex items-center justify-center bg-gray-100 mt-28">
      {authUser && <ProfileCard user={authUser} />}
    </div>
  );
}
