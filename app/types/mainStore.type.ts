import type { IUser } from "~/types/user.type"
import type { IMarketplace } from '~/types/marketplaces.type'

export interface IMainStore {
    user: IUser | null,
    marketplaces: IMarketplace[] | null
    marketplaceById: IMarketplace | null
}