<script lang="ts" setup>
	import { getStores } from "~/modules/profile/components/Header/profileHeader.data";
  
	onMounted(() => {
		getStores();
	});
</script>

<template>
	<CommonAppHeader />
	<HeaderProfileHeader />
	<NuxtPage />
</template>

<style scoped></style>
