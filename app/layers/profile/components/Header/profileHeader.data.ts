import type { IStore } from '~/layers/profile/types/stores.type'
import type { ISalesPlan } from '~/layers/profile/types/salesPlan.type'
import axios from 'axios'
import { useProfileStore } from '~/layers/profile/stores/profile'
import { baseUrl } from '~/api'


export async function getStores() {
    const profileStore = useProfileStore()
    const authCookie = useCookie('auth');
    profileStore.salesPlan = null
    try {
        const res = await axios.get<IStore[]>(`${baseUrl}/stores`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authCookie.value}`
            }
        })
        profileStore.stores = res.data
        profileStore.selectedBranch = res.data ? res.data[0]?.id || null : null;
        if (res.data.length > 0) {
            getSalesPlan()
        }
    } catch (error) {
        console.error('Не удалось получить /stores: ', error);
    }
}

export async function getSalesPlan() {
    const profileStore = useProfileStore()
    const authCookie = useCookie('auth');
    profileStore.salesPlan = null
    try {
        const res = await axios.get<ISalesPlan>(`${baseUrl}/sales-plan`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authCookie.value}`
            },
            params: {
                store_id: profileStore.selectedBranch,
                days: profileStore.activeDayFilter
            }
        })
        profileStore.salesPlan = res.data.data
        profileStore.monthAnnotation = res.data.salesPlan
    } catch (error) {
        console.error('Не удалось получить /sales-plan: ', error);
    }
}