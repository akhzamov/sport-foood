import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

// Создаем экземпляр axios
const apiClient = axios.create({
	baseURL: "", // Пустой базовый URL, так как мы будем использовать полный URL в запросах
	timeout: 1000, // Тайм-аут в миллисекундах
});

// Интерцептор запроса для добавления полного URL
apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// Проверяем, начинается ли URL с '/api'
		if (config.url && config.url.startsWith("/api")) {
			// Если да, то добавляем полный URL
			config.url = `https://crm-api.autosale.pw${config.url}`;
		}
		return config;
	},
	(error: AxiosError) => {
		// Обработка ошибки
		return Promise.reject(error);
	}
);

export default apiClient;
