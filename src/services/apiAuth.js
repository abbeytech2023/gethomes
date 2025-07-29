import supabase from "./supabaseClients";

export async function signup({ email, password, fullName, profession }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
        profession,
      },
    },
  });

  if (error) throw new Error(error.message);
  // console.log(error);

  const user = data.user;
  console.log(user);

  if (!user) {
    console.log("user not returned from auth signup");
    return;
  }

  // insert into the users table
  const { error: insertError } = await supabase.from("Users").insert([
    {
      id: user.id,
      email: email,
      displayName: user.user_metadata.fullName,
      profession: profession,
    },
  ]);

  if (insertError) {
    console.error("database inserterror:,", insertError);
    return;
  }

  console.log("user registered and saved successfully");

  // console.log(data)

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  // console.log(data);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
