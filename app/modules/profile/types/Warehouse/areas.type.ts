type IAreasCity = {
  id: number;
  name: string;
  checked: boolean;
};

export type IAreasArea = {
  name: string;
  cities: Record<string, IAreasCity>;
  checked: boolean;
  menuOpen: boolean;
};

export interface IAreas {
  success: boolean;
  data: {
    areas: Record<string, IAreasArea>;
  };
}
