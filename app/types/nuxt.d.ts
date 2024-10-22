import { StoresRep } from '~/repository/stores';
import { SalesPlanRep } from '~/modules/profile/repository/salesPlan';
import { SalesPlanMarketplaceRep } from './../modules/profile/repository/SalesPlanMarketPlace';
import { SalesPlanDayRep } from '~/modules/profile/repository/salesPlanDay';

declare module '#app' {
  interface NuxtApp {
    $storesRep: StoresRep;
    $salesPlanRep: SalesPlanRep;
    $salesPlanMarketplaceRep: SalesPlanMarketplaceRep;
    $salesPlanDayRep: SalesPlanDayRep;
  }
}
