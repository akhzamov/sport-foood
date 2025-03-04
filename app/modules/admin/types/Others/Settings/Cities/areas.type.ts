export type TAreas = {
  id: number;
  name: string;
};

export interface IAreasResponse {
  success: boolean;
  data: {
    areas: TAreas[];
  };
}
