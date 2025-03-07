import { defineStore } from "pinia";
import type { ILocalitiesStore } from "../types/Stores/localitiesStore";
import { useSessionStorage } from "@vueuse/core";

export const useLocalitiesStore = defineStore("localities", {
  state: (): ILocalitiesStore => ({
    areas: null,
    selectedArea: null,
    city: null,
    cities: null,
    citiesPagination: null,
    citiesPage: useSessionStorage("citiesPage", 1),
    citiesByArea: null,
    searchCities: useSessionStorage("searchCities", ""),
    searchDistricts: useSessionStorage("searchDistricts", ""),
    selectedCityByArea: null,
    districts: null,
    district: null,
    districtsPagination: null,
    districtsPage: useSessionStorage("districtsPage", 1),
    products: null,
    product: null,
    marketplaces: null,
    marketplace: null,
    newMarketplace: null,
    stores: null,
    store: null,
    perPage: 15,
  }),
  actions: {},
});
