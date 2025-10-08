import supabase from "./supabaseClients";

export async function fetchAllRows() {
  const { data, error } = await supabase.from("Users").select("*"); // fetch all columns

  if (error) {
    console.error("Error fetching rows:", error.message);
    return [];
  }

  return data;
}
