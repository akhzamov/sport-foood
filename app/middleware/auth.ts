import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { getAuthToken } from "~/utils/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
	if (process.client) {
		const token = getAuthToken();

		if (token) {
			if (to.path.startsWith("/sign-in")) {
				return navigateTo("/");
			}
		} else {
			console.log("No token found, redirecting to sign-in");
			if (!to.path.startsWith("/sign-in")) {
				return navigateTo("/sign-in");
			}
		}
	}
});
