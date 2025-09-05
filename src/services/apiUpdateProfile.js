import { useRevalidator } from "react-router-dom";
import supabase, { supabaseUrl } from "./supabaseClients";
import { useUser } from "../hooks/useUser";

export default async function uploadProfilePicture(newImage, userId) {
  console.log(newImage.name, userId);

  const imageName = `${Math.random()}-${newImage.name}`.replace("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/to-lets/${imageName}`;

  //upload Image
  const { error: storageEror } = await supabase.storage
    .from("display-picture")
    .upload(imageName, newImage);
  if (storageEror) console.log(storageEror);

  console.log(newImage);

  const { data, error } = await supabase
    .from("Users")
    .update({ image: imagePath })
    .eq("id", userId);

  if (error) {
    console.log("Error uploading User", error.message);
  }

  console.log(data);

  return data;
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
