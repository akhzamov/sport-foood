<script lang="ts" setup>
	import UserCheck02 from "~/components/icon/UserCheck02.vue";
	import Icon34 from "~/components/icon/Icon34.vue";
	import Building07 from "~/components/icon/Building07.vue";

	const router = useRouter();
	const items = reactive([
		{
			id: 1,
			name: "Торговые Агенты",
			balance: 180000,
			icon: markRaw(UserCheck02),
		},
		{
			id: 2,
			name: "Торговые площадки",
			balance: 540000,
			icon: markRaw(Icon34),
		},
		{
			id: 3,
			name: "Склад",
			balance: 2800000,
			icon: markRaw(Building07),
		},
	]);

	const handleRouterWarehouse = () => {
		router.push("/profile-warehouse");
	};
</script>

<template>
	<div class="w-[390px] rounded-lg overflow-hidden">
		<h4
			class="px-5 h-[40px] flex items-center bg-dark-gunmental-color text-14-bold text-gray-90-color"
		>
			Остатки и резерв
		</h4>
		<div
			class="flex flex-col gap-2 w-full h-[360px] bg-dark-charcoal-color overflow-hidden overflow-y-auto p-2"
		>
			<div
				class="flex flex-col w-full h-max bg-gray-15-color border border-gray-15-color rounded-lg p-2"
				v-for="item in items"
				:key="item.id"
			>
				<div
					class="w-full h-max rounded-md p-2 bg-gray-15-color flex items-center justify-start gap-1 text-white"
				>
					<component
						:is="item.icon"
						class="w-6 h-6"
					/>
					<span class="text-12-semi">{{ item.name }}</span>
				</div>
				<div
					class="w-full h-[18px] flex items-center justify-between mt-[17px]"
				>
					<div
						class="flex items-center justify-start gap-[6px] h-full"
					>
						<div
							class="w-[2px] h-[18px] inline-block bg-primary-color"
						></div>
						<p class="text-primary-color text-12-semi">Остаток</p>
					</div>
					<p class="text-white text-14-med">
						{{ item.balance.toLocaleString() }} гр
					</p>
				</div>
			</div>
			<UiButton
				bg-color="bg-gray-15-color"
				:border="true"
				border-color="bg-gray-15-color"
				hover=""
				:icon="true"
				text="Подробно"
				text-color="text-white"
				@click="handleRouterWarehouse"
			>
				<template v-slot:icon-r>
					<IconArrowUpRight class="text-white" />
				</template>
			</UiButton>
		</div>
	</div>
</template>

<style scoped></style>
