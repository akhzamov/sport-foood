import type { TPagination } from "~/modules/admin/types/Others/pagination.type";

type TSalesAgentStore = {
  id: number;
  name: number;
};

export type TSalesAgent = {
  id: number;
  name: string;
  status: string;
  contact: string | null;
  stores: TSalesAgentStore[];
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
  data?: {
    id: number;
    name: string;
    phone: string;
    stores: Record<symbol, TSalesAgentStore>;
  };
  errors?: {
    [key: string]: string[];
  };
}
