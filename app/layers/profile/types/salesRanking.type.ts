export interface ISalesRankingProducts {
    name: string,
    plan: number,
    sold: number
}

export interface ISalesRankingMarketplace {
    name: string,
    type: string,
    totalSum: number,
    products: ISalesRankingProducts[]
}

export interface ISalesRanking {
    success: boolean,
    data: ISalesRankingMarketplace[]
}