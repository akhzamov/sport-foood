type TCity = {
  id: number;
  name: string;
};

export type TCitiesArea = {
  id: number;
  name: string;
  cities: Record<number, TCity>;
};

export interface ICitiesByAreaResponse {
  success: boolean;
  data: {
    areas: Record<number, TCitiesArea>;
  };
}
