import type { ITradingFloor } from "~/modules/profile/types/tradingFloorBalance.type";
import type { ISalesAgents } from "~/modules/profile/types/salesAgentsBalance.type";
import type {
  IAreas,
  IAreasArea,
} from "~/modules/profile/types/Warehouse/areas.type";
import type { TStoragesLeftCity } from "~/modules/profile/types/Warehouse/storagesLeft.type";
import type {
  IMarketplaceLeft,
  TMarketplaceLeftArea,
} from "~/modules/profile/types/Warehouse/marketplaceLeft.type";
import type { TSalesAgentLeftCity } from "./salesAgentLeft.type";

export interface IWarehouseStore {
  isLoading: boolean;
  areas: Record<string, IAreasArea> | null;
  selectedCities: number[];
  storageTypes: Record<string, string> | null;
  activeStorageType: string;
  storagesLeft: Record<string, TStoragesLeftCity> | null;
  marketplaceLeft: Record<string, TMarketplaceLeftArea> | null;
  salesAgentLeft: Record<string, TSalesAgentLeftCity> | null;
}
