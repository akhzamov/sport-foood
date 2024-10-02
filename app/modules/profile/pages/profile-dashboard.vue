<script lang="ts" setup>
	import { useProfileStore } from "../stores/profile";

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

	useSeoMeta({
		title: "Sport Food | Profile",
	});

	definePageMeta({
		middleware: "auth",
		layout: "profile",
	});
</script>

<template>
	<div class="container-custom">
		<Analysis />
		<ReportModulesReportGraphAddSettingModule
			v-if="profileStore.reportGraphAddSettingModal"
		/>
	</div>
</template>

<style scoped></style>
