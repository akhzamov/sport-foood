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
import { IndexBalanceRep } from "~/modules/profile/repository/indexBalance";
import { PurchasesRep } from "~/modules/profile/repository/purchases";
import { SalesAgentsRep } from "~/modules/admin/modules/personal/repository/salesAgents";
import { DriversRep } from "~/modules/admin/modules/personal/repository/drivers";
import { PaymentRequestsRep } from "~/modules/admin/modules/payment/repository/paymentRequests";
import { SalesPlanSpendingRep } from "~/modules/profile/repository/salesPlanSpending";
import { CrudCitiesRep } from "~/modules/admin/repository/cities";
import { CrudDistrictsRep } from "~/modules/admin/repository/districts";
import { CrudProductsRep } from "~/modules/admin/repository/products";
import { CrudMarketplacesRep } from "~/modules/admin/repository/marketplaces";
import { CrudStoresRep } from "~/modules/admin/repository/stores";
import { CrudSuppliersRep } from "~/modules/admin/repository/suppliers";
import type { CrudLogisticRep } from "~/modules/admin/repository/logistic";

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
    $indexBalanceRep: IndexBalanceRep;
    $purchasesRep: PurchasesRep;
    $salesAgentsRep: SalesAgentsRep;
    $driversRep: DriversRep;
    $paymentRequestsRep: PaymentRequestsRep;
    $salesPlanSpendingRep: SalesPlanSpendingRep;
    $crudCitiesRep: CrudCitiesRep;
    $crudDistrictsRep: CrudDistrictsRep;
    $crudProductsRep: CrudProductsRep;
    $crudMarketplacesRep: CrudMarketplacesRep;
    $crudStoresRep: CrudStoresRep;
    $crudSuppliersRep: CrudSuppliersRep;
    $crudLogisticRep: CrudLogisticRep;
  }
}
