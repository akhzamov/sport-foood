export type TPermission = {
  group: string;
  name: string;
  display_name: string;
  sub_group: string;
  checked: boolean;
};

export type TPermissions = {
  [key: string]: Record<string, TPermission[]>;
}

export interface IPermissions {
  success: boolean;
  data: TPermissions;
}
