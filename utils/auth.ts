import { supabase } from "../lib/supabase"

export const signUp = async (values: any) => {
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      emailRedirectTo: "https://www.virtualia.shop/compte-confirme",
    },
  })
  if (error) {
    return error
  }
  return data
}

export const signInWithPassword = async (values: any) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  })
  if (error) {
    throw error
  }
  return data
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  })
  if (error) {
    throw error
  }
  return data
}

export const signInWithLinkedIn = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "linkedin",
  })
  if (error) {
    throw error
  }
  return data
}

export async function getUserData(uid: any) {
  const { data: user_table, error } = await supabase
    .from("user_table")
    .select("*")
    .eq("id", uid);
  if (error) {
    console.log(error);
  }
  return user_table;
}

export const updateUserInfo = async (values: any, uid: any) => {
  let { data: user_table, error } = await supabase
    .from("user_table")
    .update({
      username: values.username,
      email: values.email,
      phone_prefix: values.phone_prefix,
      phone_number: values.phone_number,
      street_address: values.street_address,
      first_name: values.first_name,
      last_name: values.last_name,
      country: values.country,
      city: values.city,
      region: values.region,
      zip: values.zip,
    })
    .eq("id", uid);
  if (error) {
    console.warn(error);
  }
  return user_table;
};

export const updateEmail = async (user: any) => {
  const { data: user_table, error } = await supabase
    .from('user_table')
    .update({ email: user.email })
    .eq('id', user.id)
  if (error) {
    return error
  }
  return user_table
}


export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    return error
  }
  return true
}

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    return error
  }
  return data
}

export const refreshSession = async () => {
  const { data: { user, session }, error } = await supabase.auth.refreshSession()
  if (error) {
    return error
  }
  return { user, session }
}

export const resetPassword = async (
  email: string,
) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://www.virtualia.shop/reinitialiser",
  });
  if (error) {
    return error
  }
  return data
};


