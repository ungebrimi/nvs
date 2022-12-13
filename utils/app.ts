import { supabase } from "../lib/supabase";

export async function getStores() {
  const { data: stores_v3, error } = await supabase
    .from("stores_v3")
    .select("*")
    .eq("is_listed", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
  }
  return stores_v3;
}
