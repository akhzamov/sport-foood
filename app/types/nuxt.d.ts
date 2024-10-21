import { StoresRep } from '~/repository/stores';
import { SalesPlanRep } from '~/modules/profile/repository/salesPlan';
import { SalesPlanMarketplaceRep } from './../modules/profile/repository/SalesPlanMarketPlace';

declare module '#app' {
  interface NuxtApp {
    $storesRep: StoresRep;
    $salesPlanRep: SalesPlanRep;
    $salesPlanMarketplaceRep: SalesPlanMarketplaceRep;
  }
}
