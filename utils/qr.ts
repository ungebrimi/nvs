import { supabase } from '../lib/supabase'

export async function getStaticQrCodes() {
  let { data: static_points, error } = await supabase
    .from("static_points")
    .select("*");
  if (error) console.error(error);
  return static_points;
}

export async function getDynamicQrCodes() {
  let { data: dynamic_points, error } = await supabase
    .from("dynamic_points")
    .select("*");
  if (error) console.error(error);
  return dynamic_points;
}

export async function getQrCodes() {
  let static_points: any = await getStaticQrCodes();
  let dynamic_points: any = await getDynamicQrCodes();
  return [...static_points, ...dynamic_points];
}


export async function claimPoints(
  user_id: string,
  store_id: number,
  points: number,
  key: string
) {
  let { data: user_table, error } = await supabase
    .from("claimed_points")
    .insert({
      store_id: store_id,
      user_id: user_id,
      value: points,
      unique_key: key,
    });
  if (error) console.error(error);
  return user_table;
}

export async function decrementStaticEditions(
  store_id: number,
  newEditions: any
) {
  let { data: static_points, error } = await supabase
    .from("static_points")
    .update({ editions: newEditions })
    .eq("store_id", store_id);
  if (error) console.error(error);
  return static_points;
}

export async function decrementDynamicEditions(unique_key: string) {
  let { data: dynamic_points, error } = await supabase
    .from("dynamic_points")
    .update({ editions: 0, claimed: true })
    .eq("unique_key", unique_key);
  if (error) console.error(error);
  return dynamic_points;
}

export async function updateUserPoints(user_id: string, value: number) {
  let { data: user_table, error } = await supabase
    .from("user_table")
    .update({ points: value })
    .eq("id", user_id)
    .select("*");
  if (error) console.error(error);
  return user_table;
}

export async function getAllUserQrCodes(user_id: string) {
  let { data: claimed_points, error } = await supabase
    .from("claimed_points")
    .select("*")
    .eq("user_id", user_id);
  if (error) console.error(error);
  return claimed_points;
}

