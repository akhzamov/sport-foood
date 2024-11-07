type TSalesAgentLeftAgentHandLeft = {
  product_id: number;
  product_name: string;
  left_weight: number;
};

type TSalesAgentLeftAgentDistrictProduct = {
  [ket: string]: number;
  min: number;
  max: number;
};

export type TSalesAgentLeftAgentDistrict = {
  id: number;
  name: string;
  products: Record<string, TSalesAgentLeftAgentDistrictProduct>;
};

type TSalesAgentLeftAgent = {
  id: number;
  name: string;
  hand_left: Record<string, TSalesAgentLeftAgentHandLeft>;
  districts: Record<string, TSalesAgentLeftAgentDistrict>;
};

type TSalesAgentLeftDistrict = {
  id: number;
  name: string;
};

export type TSalesAgentLeftCity = {
  id: number;
  name: string;
  districts: Record<string, TSalesAgentLeftDistrict>;
  agents: Record<string, TSalesAgentLeftAgent>;
};

export interface ISalesAgentLeft {
  success: boolean;
  data: {
    cities: Record<string, TSalesAgentLeftCity>;
  };
}
