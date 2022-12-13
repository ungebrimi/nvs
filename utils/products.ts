import { supabase } from "../lib/supabase";

export const getProductsView = async () => {
  let { data, error } = await supabase
    .from("materialized_product_wall_feed_landing")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.warn(error);
  }
  return data;
};

export const getImages = async (store_id: number) => {
  let { data: image_table, error } = await supabase
    .from("image_table")
    .select("*")
    .eq("store_id", store_id);
  if (error) {
    console.log(error);
  }
  return image_table;
};

export const getAllImages = async () => {
  let { data: image_table, error } = await supabase
    .from("image_table")
    .select("*")
  if (error) {
    console.log(error);
  }
  return image_table;
};



export const getProducts = async (store_id: number) => {
  let { data: product_table, error } = await supabase
    .from("product_table")
    .select("*")
    .eq("store_id", store_id);
  if (error) {
    console.log(error);
  }
  return product_table;
}

export const getProduct = async (product_id: number) => {
  let { data: product_table, error } = await supabase
    .from("product_table")
    .select("*")
    .eq("product_id", product_id);
  if (error) {
    console.log(error);
  }
  return product_table;
}

export const initialize = async (store_id: any) => {
  const products: any = await getProducts(store_id)
  let images: any = await getImages(store_id)
  if (products.length > 0 && images.length > 0) {
    for (let i = 0; i < products.length; i++) {
      products[i].image = new Array();
      for (let j = 0; j < images.length; j++) {
        for (let k = 0; k < products[i].image_list.length; k++) {
          if (products[i].image_list[k] === images[j].image_id) {
            if (images[j].is_thumbnail === true) {
              products[i].thumbnail = images[j].url;
            }
            if (images[j].type === "iframe") {
              products[i].iframe = images[j].url;
            }
            if (images[j].type === "mp4") {
              products[i].video = images[j].url;
            }
            if (images[j].type === "model") {
              products[i].model = images[j].url;
            }
            if (images[j].type === "image") {
              products[i].image.push(images[j].url);
            }
          }
        }
      }
    }
  }
  return products;
}

export const getImage = async (image_id: number) => {
  let { data: image_table, error } = await supabase
    .from("image_table")
    .select("*")
    .eq("image_id", image_id);
  if (error) {
    console.log(error);
  }
  return image_table;
}

export const addImagesToProduct = async (product: any) => {
  let images: any = await getImages(product.store_id)
  if (images.length > 0) {
    product.images = new Array();
    for (let j = 0; j < images.length; j++) {
      for (let k = 0; k < product.image_list.length; k++) {
        if (product.image_list[k] === images[j].image_id) {
          if (images[j].is_thumbnail === true) {
            product.thumbnail = images[j].url;
          }
          if (images[j].type === "iframe") {
            product.iframe = images[j].url;
          }
          if (images[j].type === "mp4") {
            product.video = images[j].url;
          }
          if (images[j].type === "model") {
            product.model = images[j].url;
          }
          if (images[j].type === "image") {
            product.images.push(images[j].url);
          }
        }
      }
    }
  }
  return product;
}

export const addImagesToProductsFeed = async (products: any) => {
  const images: any = await getAllImages();
  if (images.length > 0) {
    for (let i = 0; i < products.length; i++) {
      products[i].image = new Array();
      // increment count by likes.length
      for (let j = 0; j < images.length; j++) {
        for (let k = 0; k < products[i].image_list.length; k++) {
          if (products[i].image_list[k] === images[j].image_id) {
            if (images[j].is_thumbnail === true) {
              products[i].thumbnail = images[j].url;
            }
            if (images[j].type === "iframe") {
              products[i].iframe = images[j].url;
            }
            if (images[j].type === "mp4") {
              products[i].video = images[j].url;
            }
            if (images[j].type === "model") {
              products[i].model = images[j].url;
            }
            if (images[j].type === "image") {
              products[i].image.push(images[j].url);
            }
          }
        }
      }
    }
  }
  return products;
}


