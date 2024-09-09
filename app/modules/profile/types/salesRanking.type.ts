export interface ISalesRankingProducts {
    id: number,
    name: string,
    plan: number,
    sold: number
}

export interface ISalesRankingMarketplace {
    id: number,
    name: string,
    type: string,
    totalSum: number,
    products: ISalesRankingProducts[]
}

export interface ISalesRanking {
    success: boolean,
    data: ISalesRankingMarketplace[]
}