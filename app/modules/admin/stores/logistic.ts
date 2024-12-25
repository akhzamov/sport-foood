import { defineStore } from "pinia";
import type { ILogisticStore } from "../types/Stores/logisticStore.type";

export const useLogisticStore = defineStore("logistic", {
  state: (): ILogisticStore => ({}),
  actions: {},
});
