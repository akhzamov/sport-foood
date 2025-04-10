import { defineNuxtPlugin } from "#app";
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component("DatePicker", DatePicker);
});
