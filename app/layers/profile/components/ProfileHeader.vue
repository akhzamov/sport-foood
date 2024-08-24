<script lang="ts" setup>
const branches = reactive([
    { id: 1, label: 'Ozon', value: '1' },
    { id: 2, label: 'Wildberries', value: '2' },
    { id: 3, label: 'Пятёрочка', value: '3' },
])

const selectedBranch = ref('')
const tabs = reactive([
    { id: 1, title: 'Дашборд', icon: 'IconPieDash', active: true },
    { id: 2, title: 'Статистика продаж', icon: 'IconBarChart', active: false },
    { id: 3, title: 'Отчеты', icon: 'IconBarLine', active: false },
    { id: 4, title: 'Логистика', icon: 'IconRoute', active: false },
    { id: 5, title: 'Реклама', icon: 'IconTrendUp', active: false },
])
const activeTab = (id) => {
    tabs.forEach((item) => {
        item.active = false
        if (item.id == id) {
            item.active = true
        }
    })
}
</script>

<template>
    <div class="w-full h-[338px] relative flex items-end justify-center">
        <div class="absolute top-0 left-0 w-full h-full bg-dark-charcoal-color z-[-1]">
            <div class="block w-full h-[280px] bg-profile-header-bg-liner absolute"></div>
            <img src="~/assets/img/background.png" alt="profile-header-bg"
                class="w-full h-[280px] object-cover object-center">
        </div>
        <div class="container-custom z-[20] px-8 h-[136px] flex gap-6">
            <div class="w-[120px] h-[120px] overflow-hidden rounded-[50%] border-[3px]">
                <img src="~/assets/img/avatar.png" alt="profile-header-avatar"
                    class="w-full h-full object-center object-cover">
            </div>
            <div class="flex flex-col justify-between flex-grow">
                <div class="flex justify-between">
                    <div>
                        <span class="bg-gray-15-color rounded-[20px] px-3 py-1 text-16-med text-gray-90-color ">
                            id: #317487
                        </span>
                        <p class="text-32-semi text-gray-90-color">Валерий Альбертович Жмышенко</p>
                    </div>
                    <UiSelect :mainTextColor="'text-gray-90-color'" :textColor="'text-dark-night-color'"
                        :textHoverColor="'text-white'" :selectBgColor="'bg-gray-15-color'"
                        :menuBgColor="'bg-primary-color'" :array="branches" v-model="selectedBranch" />
                </div>
                <div class="flex gap-8">
                    <div class="px-5 pt-5 cursor-pointer flex flex-col after:w-full after:h-[2px] after:rounded-t-[4px] after:bg-primary-color"
                        v-for="tab in tabs" :key="tab.id" :class="tab.active ? 'after:block' : 'after:hidden'"
                        @click="activeTab(tab.id)">
                        <div class="flex items-center justify-center pb-4 gap-2">
                            <IconPieDash class="text-gray-75-color" v-if="tab.icon == 'IconPieDash'" />
                            <IconBarChart class="text-gray-75-color" v-if="tab.icon == 'IconBarChart'" />
                            <IconBarLine class="text-gray-75-color" v-if="tab.icon == 'IconBarLine'" />
                            <IconRoute class="text-gray-75-color" v-if="tab.icon == 'IconRoute'" />
                            <IconTrendUp class="text-gray-75-color" v-if="tab.icon == 'IconTrendUp'" />
                            <span class="text-16-med text-gray-75-color">{{ tab.title }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
