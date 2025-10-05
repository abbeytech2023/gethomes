import React, { useEffect, useState } from "react";
import { useFetchUsersWithId } from "../hooks/useFetchUsers";
import { useUser } from "../hooks/useUser";
import uploadProfilePicture from "../services/apiUpdateProfile";
import imageCompression from "browser-image-compression";


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
      if (file.size > 4 * 1024 * 1024) {
        alert("image too large, please select image with a smaller size");
        return;
      }

      try {
        // Compress the image
        const options = {
          maxSizeMB: 1, // Target size ~1MB
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const imageUrl = URL.createObjectURL(compressedFile); // preview image
        setPreview(imageUrl);
        const result = await uploadProfilePicture(userId, file);
        if (result.success) console.log("profile updated:", result.url);
        if (result.error) console.error("Error:", result.error);
      } catch (error) {
        console.error("image compression failed", error);

        alert("could not process image, please try a smaller one");
      }
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
          className="object-cover w-32 h-32 border-4 border-[#69a8cf] rounded-full"
        />

        {/* Upload Form */}
        <label className="absolute bottom-0 right-0 px-2 py-1 text-xs text-white bg-[#144c6f] rounded cursor-pointer hover:bg-[#042438]">
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


