<script lang="ts" setup></script>

<template>
	<div class="w-full h-full relative z-[70]">
		<div class="h-full flex flex-col items-center justify-between">
			<div
				class="w-full h-[38px] block bg-dark-gunmental rounded-t-lg"
			/>
			<div
				class="w-full h-full flex items-start justify-between bg-dark-charcoal rounded-b-lg"
			>
				<WarehouseGraphAside />
				<div class="flex-grow w-full h-max flex flex-col p-3">
					<WarehouseWarehouseBalance />
					<WarehouseTradingFloorBalance />
					<WarehouseSalesAgentsBalance />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
