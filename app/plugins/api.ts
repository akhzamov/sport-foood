// plugins/repositories.ts
import { defineNuxtPlugin } from "#app";
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

export default defineNuxtPlugin((nuxtApp) => {
  const salesPlanRep = new SalesPlanRep();
  const storesRep = new StoresRep();
  const salesPlanMarketplaceRep = new SalesPlanMarketplaceRep();
  const salesPlanDayRep = new SalesPlanDayRep();
  const areasRep = new AreasRep();
  const storageTypesRep = new StorageTypesRep();
  const storagesLeftRep = new StoragesLeftRep();
  const marketplaceLeftRep = new MarketplaceLeftRep();
  const salesAgentLeftRep = new SalesAgentLeftRep();
  const loginRep = new LoginRep();
  const usersRep = new UsersRep();
  const permissionsRep = new PermissionsRep();
  const indexMarketplacesRep = new IndexMarketplacesRep();

  nuxtApp.provide("salesPlanRep", salesPlanRep);
  nuxtApp.provide("storesRep", storesRep);
  nuxtApp.provide("salesPlanMarketplaceRep", salesPlanMarketplaceRep);
  nuxtApp.provide("salesPlanDayRep", salesPlanDayRep);
  nuxtApp.provide("areasRep", areasRep);
  nuxtApp.provide("storageTypesRep", storageTypesRep);
  nuxtApp.provide("storagesLeftRep", storagesLeftRep);
  nuxtApp.provide("marketplaceLeftRep", marketplaceLeftRep);
  nuxtApp.provide("salesAgentLeftRep", salesAgentLeftRep);
  nuxtApp.provide("loginRep", loginRep);
  nuxtApp.provide("usersRep", usersRep);
  nuxtApp.provide("permissionsRep", permissionsRep);
  nuxtApp.provide("indexMarketplacesRep", indexMarketplacesRep);
});
