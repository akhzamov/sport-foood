import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useMainStore } from "~/stores/main";
import { getAuthToken, removeAuthToken } from "~/utils/auth";
import axios from "axios";
import { baseUrl } from "~/api";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const mainStore = useMainStore();

	if (process.client) {
		// Проверяем, что код выполняется на клиенте
		const token = getAuthToken(); // Получаем токен из localStorage

		if (token) {
			try {
				// Отправляем запрос на сервер для проверки токена
				const res = await axios.get(`/api/user`, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				// Если сервер вернул ошибку, считаем, что токен недействителен
				if (!res) {
					throw new Error("Invalid token");
				}

				mainStore.user = res.data;

				// Если находимся на странице входа, перенаправляем на профиль
				if (to.path.startsWith("/sign-in")) {
					return navigateTo("/");
				}
			} catch (error) {
				console.error("Token validation failed:", error);
				// Токен недействителен, удаляем из localStorage и перенаправляем на страницу входа
				removeAuthToken();
				return navigateTo("/sign-in");
			}
		} else {
			console.log("No token found, redirecting to sign-in");
			// Если токена нет, перенаправляем на страницу входа
			if (!to.path.startsWith("/sign-in")) {
				return navigateTo("/sign-in");
			}
		}
	}
});
