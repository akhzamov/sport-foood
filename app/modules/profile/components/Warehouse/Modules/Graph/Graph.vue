<script lang="ts" setup></script>

<template>
	<div class="w-full h-full relative z-[70]">
		<div class="h-full flex flex-col items-center justify-between">
			<div
				class="w-full h-[38px] block bg-dark-gunmental-color rounded-t-lg"
			/>
			<div
				class="w-full h-full flex items-start justify-between bg-dark-charcoal-color rounded-b-lg"
			>
				<WarehouseModulesGraphAside />
				<div class="flex-grow h-full flex flex-col p-3">
					<WarehouseModulesWarehouseBalance />
					<WarehouseModulesTradingFloorBalance />
					<WarehouseModulesSalesAgentsBalance />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
