import type { ITradingFloor } from "~/modules/profile/types/tradingFloorBalance.type";
import { useProfileStore } from "~/modules/profile/stores/profile";
import { useWarehouseStore } from "~/modules/profile/stores/warehouse";

export const tradingFloorData: ITradingFloor = {
  marketplaces: {
    "Ozon": {
      id: 1,
      type: "Площадка",
      totalWeight: 1020000,
    },
    "Zeus": {
      id: 2,
      type: "Площадка",
      totalWeight: 840000,
    },
    "Coldmans": {
      id: 3,
      type: "Площадка",
      totalWeight: 1200000,
    },
    "Tenor": {
      id: 4,
      type: "Бот",
      totalWeight: 1500000,
    },
    "Yolo": {
      id: 5,
      type: "Бот",
      totalWeight: 660000,
    },
  },
  products: {
    "Протеины": {
      id: 1,
      marketplaces: {
        "Ozon": {
          id: 1,
          type: "Площадка",
          minWeight: 150000,
          maxWeight: 250000,
          weight: 170000,
        },
        "Zeus": {
          id: 2,
          type: "Площадка",
          minWeight: 110000,
          maxWeight: 220000,
          weight: 140000,
        },
        "Coldmans": {
          id: 3,
          type: "Площадка",
          minWeight: 120000,
          maxWeight: 230000,
          weight: 200000,
        },
        "Tenor": {
          id: 4,
          type: "Бот",
          minWeight: 100000,
          maxWeight: 220000,
          weight: 250000,
        },
        "Yolo": {
          id: 5,
          type: "Бот",
          minWeight: 150000,
          maxWeight: 250000,
          weight: 110000,
        },
      },
    },
    "Креатин": {
      id: 2,
      marketplaces: {
        "Ozon": {
          id: 1,
          type: "Площадка",
          minWeight: 150000,
          maxWeight: 250000,
          weight: 170000,
        },
        "Zeus": {
          id: 2,
          type: "Площадка",
          minWeight: 110000,
          maxWeight: 220000,
          weight: 140000,
        },
        "Coldmans": {
          id: 3,
          type: "Площадка",
          minWeight: 120000,
          maxWeight: 230000,
          weight: 200000,
        },
        "Tenor": {
          id: 4,
          type: "Бот",
          minWeight: 100000,
          maxWeight: 220000,
          weight: 250000,
        },
        "Yolo": {
          id: 5,
          type: "Бот",
          minWeight: 150000,
          maxWeight: 250000,
          weight: 110000,
        },
      },
    },
    "Глютамин": {
      id: 3,
      marketplaces: {
        "Ozon": {
          id: 1,
          type: "Площадка",
          minWeight: 150000,
          maxWeight: 250000,
          weight: 170000,
        },
        "Zeus": {
          id: 2,
          type: "Площадка",
          minWeight: 110000,
          maxWeight: 220000,
          weight: 140000,
        },
        "Coldmans": {
          id: 3,
          type: "Площадка",
          minWeight: 120000,
          maxWeight: 230000,
          weight: 200000,
        },
        "Tenor": {
          id: 4,
          type: "Бот",
          minWeight: 100000,
          maxWeight: 220000,
          weight: 250000,
        },
        "Yolo": {
          id: 5,
          type: "Бот",
          minWeight: 150000,
          maxWeight: 250000,
          weight: 110000,
        },
      },
    },
    "BCAA": {
      id: 4,
      marketplaces: {
        "Ozon": {
          id: 1,
          type: "Площадка",
          minWeight: 150000,
          maxWeight: 250000,
          weight: 170000,
        },
        "Zeus": {
          id: 2,
          type: "Площадка",
          minWeight: 110000,
          maxWeight: 220000,
          weight: 140000,
        },
        "Coldmans": {
          id: 3,
          type: "Площадка",
          minWeight: 120000,
          maxWeight: 230000,
          weight: 200000,
        },
        "Tenor": {
          id: 4,
          type: "Бот",
          minWeight: 100000,
          maxWeight: 220000,
          weight: 250000,
        },
        "Yolo": {
          id: 5,
          type: "Бот",
          minWeight: 150000,
          maxWeight: 250000,
          weight: 110000,
        },
      },
    },
    "L-Карнитин": {
      id: 5,
      marketplaces: {
        "Ozon": {
          id: 1,
          type: "Площадка",
          minWeight: 150000,
          maxWeight: 250000,
          weight: 170000,
        },
        "Zeus": {
          id: 2,
          type: "Площадка",
          minWeight: 110000,
          maxWeight: 220000,
          weight: 140000,
        },
        "Coldmans": {
          id: 3,
          type: "Площадка",
          minWeight: 120000,
          maxWeight: 230000,
          weight: 200000,
        },
        "Tenor": {
          id: 4,
          type: "Бот",
          minWeight: 100000,
          maxWeight: 220000,
          weight: 250000,
        },
        "Yolo": {
          id: 5,
          type: "Бот",
          minWeight: 150000,
          maxWeight: 250000,
          weight: 110000,
        },
      },
    },
    "Омега Жиры": {
      id: 6,
      marketplaces: {
        "Ozon": {
          id: 1,
          type: "Площадка",
          minWeight: 150000,
          maxWeight: 250000,
          weight: 170000,
        },
        "Zeus": {
          id: 2,
          type: "Площадка",
          minWeight: 110000,
          maxWeight: 220000,
          weight: 140000,
        },
        "Coldmans": {
          id: 3,
          type: "Площадка",
          minWeight: 120000,
          maxWeight: 230000,
          weight: 200000,
        },
        "Tenor": {
          id: 4,
          type: "Бот",
          minWeight: 100000,
          maxWeight: 220000,
          weight: 250000,
        },
        "Yolo": {
          id: 5,
          type: "Бот",
          minWeight: 150000,
          maxWeight: 250000,
          weight: 110000,
        },
      },
    },
  },
};

export async function getMarketplaceLeft() {
  const { $marketplaceLeftRep } = useNuxtApp();
  const profileStore = useProfileStore();
  const warehouseStore = useWarehouseStore();
  warehouseStore.marketplaceLeft = null;
  warehouseStore.isLoading = true;
  try {
    const param = {
      store_id: profileStore.selectedBranch,
      cities:warehouseStore.selectedCities.join(","),
    };
    const res = await $marketplaceLeftRep.getMarketplaceLeft(param);
    warehouseStore.marketplaceLeft = res.data.areas;
    warehouseStore.isLoading = false;
  } catch (error) {
    console.error("Не удалось получить /api/storages-left: ", error);
  }
}
