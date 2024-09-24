<script lang="ts" setup>
	import { useProfileStore } from "~/modules/profile/stores/profile";

	const profileStore = useProfileStore();
</script>

<template>
	<div class="container-custom">
		<Analysis v-if="profileStore.activeTab == 1" />
		<Report v-if="profileStore.activeTab == 2" />
	</div>
</template>

<style></style>
