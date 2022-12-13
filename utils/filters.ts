import { supabase } from "../lib/supabase";



export async function getCityStoreTypes(cip: number) {
  let { data, error } = await supabase.rpc("get_city_store_types", {
    cip: cip,
  });
  if (error) {
    throw error
  }
  return data;
};

// marque on city
export const getCityBrands = async (cip: number) => {
  let { data, error } = await supabase.rpc("get_city_brands", { cip: cip }).not("brand", "is", null);
  if (error) {
    throw error
  }
  return data;
};

// produit on city
export const getCityProductCategories = async (cip: number) => {
  let { data, error } = await supabase.rpc("get_city_categories", { cip: cip }).not("category", "is", null);
  if (error) {
    throw error
  }
  return data;
};

// call each function with the city id 11898 
// and then merge the results into the arr array

export async function getFilters(cip: number) {
  const arr: any = [
    {
      name: "Type de boutique",
      value: "boutique",
      type: "store",
      options: [],
    },
    {
      name: "Marque",
      value: "marque",
      type: "brand",
      options: [],
    },
    {
      name: "Produit",
      value: "produit",
      type: "product",
      options: [],
    },
  ];
  const storeTypes = await getCityStoreTypes(cip).then((res) => {
    if (res) return res.filter((v: any, i: any, a: any) => a.findIndex((t: any) => (t.marker_id === v.marker_id)) === i)
  });
  const brands = await getCityBrands(cip).then((res) => {
    if (res) return res.filter((v: any, i: any, a: any) => a.findIndex((t: any) => (t.brand === v.brand)) === i)
  });
  const categories = await getCityProductCategories(cip).then((res) => {
    if (res) return res.filter((v: any, i: any, a: any) => a.findIndex((t: any) => (t.category === v.category)) === i)
  });

  if (storeTypes) {
    storeTypes.forEach((type: any) => {
      arr[0].options.push({ ...type, value: type.name, checked: false, type: "store" })
    })
  }
  if (brands) {
    brands.forEach((brand: any) => {
      arr[1].options.push({ ...brand, name: brand.brand, value: brand.brand, checked: false, type: "brand" })
    })
  }
  if (categories) {
    categories.forEach((category: any) => {
      arr[2].options.push({ ...category, name: category.category, value: category.category, checked: false, type: "product" })
    })
  }
  return arr;
}


