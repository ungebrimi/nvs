import { useEffect, useState } from 'react'

// Path: nvs/hooks/useStoreFilter.tsx
export const useStoreFilter = ({ state, setState, activeFilters }: any) => {

  useEffect(() => {
    if (activeFilters.length === 0) {
      setState(state);
    }

    let brandAndCategory = false;
    let storeAndCategory = false;
    let storeAndBrand = false;
    let storeOnly = false;
    let brandOnly = false;
    let categoryOnly = false;
    let storeAndBrandAndCategory = false;
    const storeType = activeFilters.filter(
      (filter: any) => filter.type === "store"
    );
    const brandType = activeFilters.filter(
      (filter: any) => filter.type === "brand"
    );
    const categoryType = activeFilters.filter(
      (filter: any) => filter.type === "product"
    );

    if (
      storeType.length > 0 &&
      brandType.length > 0 &&
      categoryType.length > 0
    ) {
      storeAndBrandAndCategory = true;
    } else if (storeType.length > 0 && brandType.length > 0) {
      storeAndBrand = true;
    } else if (storeType.length > 0 && categoryType.length > 0) {
      storeAndCategory = true;
    } else if (brandType.length > 0 && categoryType.length > 0) {
      brandAndCategory = true;
    } else if (storeType.length > 0) {
      storeOnly = true;
    } else if (brandType.length > 0) {
      brandOnly = true;
    } else if (categoryType.length > 0) {
      categoryOnly = true;
    }
    if (storeOnly) {
      setState(
        state.filter((store: any) =>
          // check if any of the storeOnly.store_id array contains the store.store_id
          storeType.some((storeOnly: any) =>
            storeOnly.store_id.includes(store.store_id)
          )
        )
      );
    }
    if (brandOnly) {
      setState(
        state.filter((store: any) =>
          // check if any of the brandOnly.value is included in the store.brands array
          brandType.some((brandOnly: any) => {
            return store.brands.includes(brandOnly.value);
          })
        )
      );
    }
    if (categoryOnly) {
      setState(
        state.filter((store: any) => {
          // check if any of the categoryOnly.value is included in the store.categories array
          return categoryType.some((categoryOnly: any) =>
            store.categories.includes(categoryOnly.value)
          );
        })
      );
    }
    if (storeAndBrand) {
      setState(
        state.filter((store: any) => {
          return (
            storeType.some((storeAndBrand: any) =>
              storeAndBrand.store_id.includes(store.store_id)
            ) &&
            brandType.some((storeAndBrand: any) =>
              store.brands.includes(storeAndBrand.value)
            )
          );
        })
      );
    }
    if (storeAndCategory) {
      setState(
        state.filter((store: any) => {
          return (
            storeType.some((storeAndCategory: any) =>
              storeAndCategory.store_id.includes(store.store_id)
            ) &&
            categoryType.some((storeAndCategory: any) =>
              store.categories.includes(storeAndCategory.value)
            )
          );
        })
      );
    }
    if (brandAndCategory) {
      setState(
        state.filter((store: any) => {
          return (
            brandType.some((brandAndCategory: any) =>
              store.brands.includes(brandAndCategory.value)
            ) &&
            categoryType.some((brandAndCategory: any) =>
              store.categories.includes(brandAndCategory.value)
            )
          );
        })
      );
    }
    if (storeAndBrandAndCategory) {
      setState(
        state.filter((store: any) => {
          return (
            storeType.some((storeAndBrandAndCategory: any) =>
              storeAndBrandAndCategory.store_id.includes(store.store_id)
            ) &&
            brandType.some((storeAndBrandAndCategory: any) =>
              store.brands.includes(storeAndBrandAndCategory.value)
            ) &&
            categoryType.some((storeAndBrandAndCategory: any) =>
              store.categories.includes(storeAndBrandAndCategory.value)
            )
          );
        })
      );
    }
  }, [activeFilters, setState, state]);

  return { state, setState, activeFilters }
}

export default useStoreFilter
