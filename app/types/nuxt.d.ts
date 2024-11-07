import { StoresRep } from '~/repository/stores';
import { SalesPlanRep } from '~/modules/profile/repository/salesPlan';
import { SalesPlanMarketplaceRep } from '~/modules/profile/repository/SalesPlanMarketPlace';
import { SalesPlanDayRep } from '~/modules/profile/repository/salesPlanDay';
import { AreasRep } from '~/modules/profile/repository/area';
import type { StorageTypesRep } from '~/modules/profile/repository/storageTypes';
import type { StoragesLeftRep } from '~/modules/profile/repository/storagesLeft';
import type { MarketplaceLeftRep } from '~/modules/profile/repository/marketplaceLeft';
import type { SalesAgentLeftRep } from '~/modules/profile/repository/salesAgentLeft';

declare module '#app' {
  interface NuxtApp {
    $storesRep: StoresRep;
    $salesPlanRep: SalesPlanRep;
    $salesPlanMarketplaceRep: SalesPlanMarketplaceRep;
    $salesPlanDayRep: SalesPlanDayRep;
    $areasRep: AreasRep;
    $storageTypesRep: StorageTypesRep;
    $storagesLeftRep: StoragesLeftRep;
    $marketplaceLeftRep: MarketplaceLeftRep;
    $salesAgentLeftRep: SalesAgentLeftRep;
  }
}
