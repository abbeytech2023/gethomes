import supabase, { supabaseUrl } from "./supabaseClients";

export async function getToLet() {
  let query = supabase.from("ToLet").select("*", { count: "exact" });

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("properties could not be loaded");
  }
  console.log(data);

  return { data, count };
}

export const getToLetCurrentUser = async (id) => {
  const { data, error } = await supabase
    .from("ToLet")
    .select("*")
    .eq("uid", id);

  if (error) console.log(error);

  return data;
};

export async function getSingleRent(id) {
  const { data, error } = await supabase
    .from("ToLet")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function addPropertiesToLet(newProperty) {
  const imageName = `${Math.random()}-${newProperty.image.name}`.replace(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/to-lets/${imageName}`;
  // https://eluekkplzzlsspmxmoky.supabase.co/storage/v1/object/public/to-lets//download%20(1).jpg

  // 1 create properties
  const { data, error } = await supabase
    .from("ToLet")
    .insert([{ ...newProperty, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("property could not be added");
  }

  //3 upload image
  const { error: storageEror } = await supabase.storage
    .from("to-lets")
    .upload(imageName, newProperty.image);

  // 4 delete the cabin if there was an error uploading the corresponding image
  if (storageEror) {
    await supabase.from("ToLet").delete().eq("id", newProperty.id);
    console.error(storageEror);
    throw new Error(
      "property image could not be added and the property was not added"
    );
  }

  return data;
}

export async function deleteProperty(id) {
  const { data, error } = await supabase.from("ToLet").delete().eq("id", id);
  // console.log(id);

  if (error) {
    console.error(error);
    throw new Error("propety could not be deleted");
  }

  return data;
}
