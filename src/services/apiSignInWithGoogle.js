import supabase from "./supabaseClients";

export async function loginWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin, // redirect after login
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
      return null;
    }

    console.log("Google login success:", data);
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
}
