<script lang="ts" setup>
	import { getStores } from "~/modules/profile/components/Header/profileHeader.data";

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
	<ReportModulesReportGraphAddSettingModule />
</template>

<style scoped></style>
