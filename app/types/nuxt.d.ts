import { StoresRep } from "~/repository/stores";
import { SalesPlanRep } from "~/modules/profile/repository/salesPlan";
import { SalesPlanMarketplaceRep } from "~/modules/profile/repository/SalesPlanMarketPlace";
import { SalesPlanDayRep } from "~/modules/profile/repository/salesPlanDay";
import { AreasRep } from "~/modules/profile/repository/area";
import { StorageTypesRep } from "~/modules/profile/repository/storageTypes";
import { StoragesLeftRep } from "~/modules/profile/repository/storagesLeft";
import { MarketplaceLeftRep } from "~/modules/profile/repository/marketplaceLeft";
import { SalesAgentLeftRep } from "~/modules/profile/repository/salesAgentLeft";
import { LoginRep } from "~/modules/auth/repository/login";
import { UsersRep } from "~/modules/admin/modules/personal/repository/users";
import { PermissionsRep } from "~/modules/admin/modules/personal/repository/permissions";
import { IndexMarketplacesRep } from "~/modules/profile/repository/indexMarketplaces";

declare module "#app" {
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
    $loginRep: LoginRep;
    $usersRep: UsersRep;
    $permissionsRep: PermissionsRep;
    $indexMarketplacesRep: IndexMarketplacesRep;
  }
}
