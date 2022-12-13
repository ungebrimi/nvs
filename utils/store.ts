import { supabase } from '../lib/supabase'

export async function getStore(slug: any, city: any) {
  const { data: stores_v3, error } = await supabase
    .from('stores_v3')
    .select('*')
    .match({ slug: slug, city: city })
  if (error) {
    throw error
  }
  return stores_v3
}

export const getMarkers = async () => {
  let { data, error } = await supabase.from("types_of_stores").select("marker_id, icon_url")
  if (error) {
    throw error
  }
  return data;
}

export const getStoreBrands = async (store_id: any) => {
  let { data, error } = await supabase
    .from("product_table")
    .select("brand")
    .eq("store_id", store_id)
    .order("brand", { ascending: true })
  if (error) {
    throw error
  }
  return data;
}

export const getStoreProductCategories = async (store_id: any) => {
  let { data, error } = await supabase
    .from("product_table")
    .select("product_category")
    .eq("store_id", store_id)
    .order("product_category", { ascending: true })
  if (error) {
    throw error
  }
  return data;
}

export const getStoreProductfilters = async (store_id: any) => {
  const filters: any = [
    {
      id: "brand",
      name: "Marque",
      options: [],
    },
    {
      id: "category",
      name: "Type de produit",
      options: [],
    },
  ];

  await getStoreBrands(store_id).then((res) => {
    if (res) {
      const filtered = res.filter(
        (v: any, i: any, a: any) =>
          // remove if brand is null
          v.brand !== null && a.findIndex((t: any) => t.brand === v.brand) === i
      );
      filtered.map((brand: any) => {
        filters[0].options.push({
          value: brand.brand,
          label: brand.brand,
          checked: false,
          type: "brand",
        })
      })
    }
    return res
  })

  await getStoreProductCategories(store_id).then((res) => {
    if (res) {
      const filtered = res.filter(
        (v: any, i: any, a: any) =>
          // remove if name is null
          v.product_category !== null && a.findIndex((t: any) => t.product_category === v.product_category) === i
      );
      filtered.map((product_name: any) => {
        filters[1].options.push({
          value: product_name.product_category,
          label: product_name.product_category,
          checked: false,
          type: "product_name",
        })
      })
    }
    return res
  })
  return filters;
}
