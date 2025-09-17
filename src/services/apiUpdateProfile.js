import { useRevalidator } from "react-router-dom";
import supabase, { supabaseUrl } from "./supabaseClients";
import { useUser } from "../hooks/useUser";

export default async function uploadProfilePicture(userId, newImage) {
  // console.log(newImage.name, userId);

  try {
    if (!newImage) {
      throw new Error("No file provided");
    }

    //create unique filepath
    const filePath = `profile_pictures/${userId}-${Date.now()}-${
      newImage.name
    }`;

    // const imageName = `${Math.random()}-${newImage.name}`.replace("/", "");
    // const imagePath = `${supabaseUrl}/storage/v1/object/public/display-picture/${imageName}`;

    //upload Image
    const { error: storageError } = await supabase.storage
      .from("display-picture")
      .upload(filePath, newImage, {
        cacheControl: "3600",
        upsert: true,
      });
    if (storageError) {
      console.log(storageError);
      throw storageError;
    }

    // console.log(newImage);

    //generate public URL
    const { data, error } = supabase.storage
      .from("display-picture")
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    //Update user row in db
    const { error: updateError } = await supabase
      .from("Users")
      .update({ image: publicUrl })
      .eq("id", userId);

    if (updateError) {
      console.log("Error uploading User", updateError.message);
    }

    console.log(data);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error("upload error:", error.message);
    return { success: false, error: error.message };
  }
}

export async function UpdateUserData(data, id) {
  const { data: profileData, error } = await supabase
    .from("Users")
    .update(data)
    .eq("id", id);

  if (error) {
    console.log("Error updating user", error.message);
  }

  return profileData;
}
