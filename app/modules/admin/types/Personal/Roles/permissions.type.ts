export type TPermission = {
  group: string;
  name: string;
  display_name: string;
};

export interface IPermissions {
  success: boolean;
  data: Record<string, TPermission[]>;
}
