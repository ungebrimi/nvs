import { supabase } from "../lib/supabase";

export async function unlikeStore(user_id: string, store_id: number) {
  const { data: store_likes, error } = await supabase
    .from("store_likes")
    .delete()
    .match({ user_id: user_id, store_id: store_id })
    .select("*");
  if (error) {
    console.log(error);
  }
  return store_likes;
}

export async function likeStore(user_id: string, store_id: number) {
  let { data: store_likes, error } = await supabase
    .from("store_likes")
    .insert({
      user_id: user_id,
      store_id: store_id,
    })
    .select("*");
  if (error) {
    console.log(error);
  }
  return store_likes;
}

export async function followStore(user_id: string, store_id: number) {
  let { data: store_followers, error } = await supabase
    .from("store_followers")
    .insert({
      user_id: user_id,
      store_id: store_id,
    })
    .select("*");
  if (error) {
    console.log(error);
  }
  return store_followers;
}



export async function unfollowStore(user_id: string, store_id: number) {
  const { data: store_followers, error } = await supabase
    .from("store_followers")
    .delete()
    .match({ user_id: user_id, store_id: store_id })
    .select("*");
  if (error) {
    console.log(error);
  }
  return store_followers;
}

export async function incrementUserPoints(user_id: string, points: number) {
  const { data, error } = await supabase.rpc("increment_points", {
    user_id: user_id,
    increment_num: points,
  });
  if (error) {
    console.log(error);
  }
  return data;
}

export async function decrementUserPoints(user_id: string, points: number) {
  const { data, error } = await supabase.rpc("decrement_points", {
    user_id: user_id,
    // this is really decrement, but sql function is called increment
    increment_num: points,
  });
  if (error) {
    console.log(error);
  }
  return data;
}

export async function likeProduct(
  user_id: string,
  id: number,
  store_id: number
) {
  let { data: product_likes, error } = await supabase
    .from("product_likes")
    .insert({
      user_id: user_id,
      product_id: id,
      store_id: store_id,
    })
    .select("*");
  if (error) console.error(error);
  return product_likes;
}

export async function unLikeProduct(user_id: string, store_id: number) {
  let { data: store_likes, error } = await supabase
    .from("product_likes")
    .delete()
    .match({ user_id: user_id, store_id: store_id })
    .select("*");
  if (error) {
    console.log(error);
  }
  return store_likes;
}

export async function getStoreLikes(store_id: number) {
  let { data, error } = await supabase
    .from("store_likes")
    .select("user_id")
    .eq("store_id", store_id);
  if (error) {
    console.log(error);
  }
  return data;
}

export async function getStoreFollowers(store_id: number) {
  let { data, error } = await supabase
    .from("store_followers")
    .select("user_id")
    .eq("store_id", store_id);
  if (error) {
    console.log(error);
  }
  return data;
}

export async function getProductLikes(product_id: number) {
  let { data, error } = await supabase
    .from("product_likes")
    .select("*")
    .eq("product_id", product_id);
  if (error) {
    console.log(error);
  }
  return data;
}
