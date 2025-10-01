import { useState } from "react";
import supabase from "../services/supabaseClients";

export function useGetAccessCodes(data) {
  const [Error, setError] = useState();
  const [dataCodes, setDataCodes] = useState();
  //1. Look up the code
  const fetchData = async () => {
    const { data: codes, error: codesError } = await supabase
      .from("AccessCode")
      .select("*")
      .eq("code", data.accessCode)
      .eq("active", true)
      .single(); // expect only one match

    console.log(codes);
    setDataCodes(codes);

    if (codesError || !codes) {
      setError("invalid access code");
      console.log(codesError.message);
      alert(codesError.message);

      // setError("code", { message: "Invalid or already used code." });
      return;
    }

    //2. Mark the code as used
    const { error: updateError } = await supabase
      .from("AccessCode")
      .update({ active: false, used_at: new Date() })
      .eq("id", codes.id);

    if (updateError) {
      console.log(updateError);

      // setError("code", { message: "Error marking code as used." });
      return;
    }
  };
  fetchData(data);

  return { dataCodes, Error };
}
