<script lang="ts" setup>
	import { getStores } from "~/modules/profile/components/Header/profileHeader.data";
	import { useProfileStore } from "~/modules/profile/stores/profile";

	const profileStore = useProfileStore();

	watch(
		() => profileStore.reportGraphAddSettingModal,
		() => {
			if (profileStore.reportGraphAddSettingModal) {
				document.body.style.overflow = "hidden";
			} else {
				document.body.style.overflow = "unset";
			}
		}
	);

	onMounted(() => {
		getStores();
	});
</script>

<template>
	<CommonAppHeader />
	<HeaderProfileHeader />
	<ReportModulesReportGraphAddSettingModule
		v-if="profileStore.reportGraphAddSettingModal"
	/>
	<NuxtPage />
</template>

<style scoped></style>
