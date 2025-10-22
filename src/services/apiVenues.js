import supabase, { supabaseUrl } from "./supabaseClients";

export async function getVenues() {
  let query = supabase.from("Venues").select("*");

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("venues could not be loaded");
  }

  return data;
}

export async function addVenues(newVenue) {
  const imageName = `${Math.random()}-${newVenue.image.name}`.replace("/", "");
  const imageName1 = `${Math.random()}-${newVenue.image1.name}`.replace(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/venue/${imageName}`;
  const imagePath1 = `${supabaseUrl}/storage/v1/object/public/venue/${imageName1}`;

  const { data, error } = await supabase
    .from("Venues")
    .insert([{ ...newVenue, image: imagePath, image1: imagePath1 }])
    .select();

  console.log(data);

  if (error) {
    console.log(error);
    throw new Error("Venue could not be created");
  }

  //3a upload image
  const { error: storageEror } = await supabase.storage
    .from("venue")
    .upload(imageName, newVenue.image);
  console.log(newVenue.image);

  if (storageEror) {
    await supabase.from("Venue").delete().eq("id", newVenue.id);
    console.error(storageEror);
    throw new Error(
      "venue image could not be added and the venue was not added"
    );
  }

  //3b upload image
  const { error: storageEror1 } = await supabase.storage
    .from("venue")
    .upload(imageName1, newVenue.image1);
  console.log(newVenue.image1);

  //4 delete the cabin if there was an error uploading the corresponding image
  if (storageEror1) {
    await supabase.from("Venue").delete().eq("id", newVenue.id);
    console.error(storageEror);
    throw new Error(
      "venue image could not be added and the venue was not added"
    );
  }

  return data;
}
