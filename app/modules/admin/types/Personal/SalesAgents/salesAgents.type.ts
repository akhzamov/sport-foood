export type TPagination = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string;
  prev_page_url: string;
};

type TSalesAgentStore = {
  id: number;
  name: number;
};

export type TSalesAgent = {
  id: number;
  name: string;
  status: string;
  phone: string | null;
  stores: Record<symbol, TSalesAgentStore>;
};

export interface ISalesAgents {
  success: boolean;
  data: {
    agents: Record<number, TSalesAgent>;
  };
  pagination: TPagination;
}

export interface ISalesAgent {
  success: boolean;
  data: TSalesAgent;
}

export interface ISalesAgentDelete {
  success: boolean;
  message: string;
}

export interface ISalesAgentEdit {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    phone: string;
    stores: Record<symbol, TSalesAgentStore>;
  };
}
