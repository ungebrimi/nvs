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

  await getCityStoreTypes(cip).then((res: any) => {
    res.map((option: any) => {
      arr[0].options.push({
        name: option.name,
        value: option.name,
        type: "store",
        checked: false,
        store_id: [option.store_id],
      });
    });
  });

  await getCityBrands(cip).then((res: any) => {
    res.map((option: any) => {
      arr[1].options.push({
        name: option.brand,
        value: option.brand,
        type: "brand",
        checked: false,
        store_id: [option.storeid],
      });
    });
  });

  await getCityProductCategories(cip).then((res: any) => {
    res.map((option: any) => {
      arr[2].options.push({
        name: option.category,
        value: option.category,
        type: "product",
        checked: false,
        store_id: [option.storeid],
      });
    });
  });


  arr[0].options = arr[0].options.filter(
    (v: any, i: any, a: any) =>
      a.findIndex((t: any) => {
        if (t.name === v.name) {
          t.store_id.push(v.store_id[0]);
        }
        return t.name === v.name;
      }) === i
  );

  // for each time arrj.options.name is equal to arr.options.name, add the store_id to the store_id array
  arr[1].options = arr[1].options.filter(
    (v: any, i: any, a: any) =>
      // if t.name and v.name are equal, add the v.store_id to the t.store_id array
      a.findIndex((t: any) => {
        if (t.name === v.name) {
          t.store_id.push(v.store_id[0]);
        }
        return t.name === v.name;
      }) === i
  );

  arr[2].options = arr[2].options.filter(
    (v: any, i: any, a: any) =>
      // if t.name and v.name are equal, add the v.store_id to the t.store_id array
      a.findIndex((t: any) => {
        if (t.name === v.name) {
          t.store_id.push(v.store_id[0]);
        }
        return t.name === v.name;
      }) === i
  );

  return arr
}


