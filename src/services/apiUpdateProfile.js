import { useRevalidator } from "react-router-dom";
import supabase, { supabaseUrl } from "./supabaseClients";
import { useUser } from "../hooks/useUser";

export default async function apiUpdateProfile(newImage, userId) {
  const imageName = `${Math.random()}-${newImage.image.name}`.replace("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/to-lets/${imageName}`;

  //upload Image
  const { error: storageEror } = await supabase.storage
    .from("users")
    .upload(imageName, newImage.image);
  console.log(newImage.image);

  const { data, error } = await supabase
    .from("Users")
    .update({ image: imagePath })
    .eq("id", userId);

  if (error) {
    console.log("Error uploading User", error.message);
  }
}
