interface ISalesAgentsSellerBalance {
	[key: string]: number;
}

interface ISalesAgentsSellerDistrictsBalance {
	id: number;
	balance: ISalesAgentsSellerBalance;
}

interface ISalesAgentsSeller {
	balance: Record<string, ISalesAgentsSellerBalance>;
	districtsBalance: Record<
		string,
		ISalesAgentsSellerDistrictsBalance
	>;
}

interface ISalesAgentsDistricts {
	id: number;
}

export interface ISalesAgents {
	id: number;
	districts: Record<string, ISalesAgentsDistricts>;
	agents: Record<string, ISalesAgentsSeller>;
}
