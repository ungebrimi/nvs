import { supabase } from "../lib/supabase";

// get all avaible store paths
export async function getStorePaths() {
  const { data, error } = await supabase
    .from('stores_v3')
    .select('city, slug, store_id')
    .eq("is_listed", true)
  if (error) {
    console.log(error)
    return []
  }
  return data.map((store) => ({
    params: {
      slug: store.slug,
      city: store.city,
      id: store.store_id,
    },
  }))
}

// gets each name so we can use it in the url
export async function getProductsNames(store_id: any) {
  const { data, error } = await supabase
    .from('product_table')
    .select('name, product_id')
    .eq("store_id", store_id)
  if (error) {
    console.log(error)
    return []
  }
  return data
}

// create a function to get each product page
// this function get's the product name from all the products in the store
// and creates a page for each product
export async function getProductPaths() {
  let paths: any = []
  const stores = await getStorePaths()
  for (let i = 0; i < stores.length; i++) {
    const products = await getProductsNames(stores[i].params.id)
    for (let j = 0; j < products.length; j++) {
      paths.push({
        params: {
          slug: stores[i].params.slug,
          city: stores[i].params.city,
          id: stores[i].params.id,
          produit: products[j].name.toLowerCase().replace(/ /g, '-'),
          product_id: products[j].product_id.toString(),
        },
      })
    }
  }
  return paths
}
