import supabase from "./supabaseClients";

export async function getVenueById(id) {
  const { data, error } = await supabase
    .from("Venues")
    .select("*")
    .eq("id", id)
    .single(); // fetch one row only

  if (error) {
    console.error("Error fetching venue:", error);
    throw error;
  }

  return data;
}
