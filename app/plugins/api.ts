// plugins/repositories.ts
import { defineNuxtPlugin } from '#app';
import { StoresRep } from '~/repository/stores';
import { SalesPlanRep } from '~/modules/profile/repository/salesPlan';
import { SalesPlanMarketplaceRep } from '~/modules/profile/repository/SalesPlanMarketPlace';

export default defineNuxtPlugin((nuxtApp) => {
  const salesPlanRep = new SalesPlanRep();
  const storesRep = new StoresRep();
  const salesPlanMarketplaceRep = new SalesPlanMarketplaceRep()

  nuxtApp.provide('salesPlanRep', salesPlanRep);
  nuxtApp.provide('storesRep', storesRep);
  nuxtApp.provide('salesPlanMarketplaceRep', salesPlanMarketplaceRep);
});
