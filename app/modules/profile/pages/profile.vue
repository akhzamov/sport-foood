<script lang="ts" setup>
	import { getStores } from "~/modules/profile/components/Header/profileHeader.data";
import { useProfileStore } from "../stores/profile";

	const profileStore = useProfileStore()

	useSeoMeta({
		title: "Sport Food | Profile",
	});
	definePageMeta({
		middleware: "auth",
	});
	onMounted(() => {
		getStores();
	});
</script>

<template>
	<HeaderProfileHeader />
	<ProfileTabs />
	<ReportModulesReportGraphAddSettingModule v-if="profileStore.reportGraphAddSettingModal"/>
</template>

<style scoped></style>
