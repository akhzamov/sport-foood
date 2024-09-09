import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { baseUrl } from '~/api';
import axios from 'axios'
import { useMainStore } from '~/stores/main';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const mainStore = useMainStore()
    const authCookie = useCookie('auth');
    const token = authCookie.value;

    if (token) {
        try {
            // Отправляем запрос на сервер для проверки токена
            const res = await axios.get(`${baseUrl}/user`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Если сервер вернул ошибку, считаем, что токен недействителен
            if (!res) {
                throw new Error('Invalid token');
            }

            mainStore.user = res.data

            // Если находимся на странице входа, перенаправляем на профиль
            if (to.path.startsWith('/sign-in')) {
                return navigateTo('/');
            }
        } catch (error) {
            console.error('Token validation failed:', error);
            // Токен недействителен, удаляем куку и перенаправляем на страницу входа
            authCookie.value = null;
            return navigateTo('/sign-in');
        }
    } else {
        console.log('No token found, redirecting to sign-in');
        // Если токена нет, перенаправляем на страницу входа
        if (!to.path.startsWith('/sign-in')) {
            return navigateTo('/sign-in');
        }
    }
});