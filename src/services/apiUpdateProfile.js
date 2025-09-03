import { useRevalidator } from "react-router-dom";
import supabase, { supabaseUrl } from "./supabaseClients";
import { useUser } from "../hooks/useUser";
import { useId } from "react";

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

// export  async function uploadProfilePucture(file, userId) {
//   console.log(useId);

//   const imageName = `${Math.random()}-${file?.name}`.replace("/", "");

//   if (!file) throw new Error("No file Provided");
//   // 1 upload to supabase storage
//   const { error: storageError } = await supabase.storage
//     .from("for-sale")
//     .upload(
//       imageName,
//       file
//       //replaces old files if they exist
//     );
//   if (storageError) console.log(storageError);

//   // 2 Get publicURL

//   const { data: urlData } = supabase.storage
//     .from("display-picture")
//     .getPublicUrl(imageName);
//   const publicURL = urlData.publicUrl;
//   console.log(publicURL);

//   // 3 update user table with new avartar file

//   const { error: updateError } = await supabase
//     .from("Users")
//     .update({ image: publicURL })
//     .eq("id", userId);
//   if (updateError) throw new Error(updateError);

//   return publicURL;
// }
