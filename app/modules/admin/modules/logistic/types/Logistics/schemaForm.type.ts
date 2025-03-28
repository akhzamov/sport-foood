export interface IProductSchemaFormLogistic {
  id: number;
  productId: number;
  name: string;
  quantity: number;
  kg_price: number;
  packageId: number;
  packageName: string;
}

export interface IPointSchemaFormLogistic {
  id: number;
  name: string;
  city_id: number;
  point_products: IProductSchemaFormLogistic[];
}

export interface ISchemaFormLogistic {
  supplierId: number | null;
  driverId: number | null;
  getDate: Date | null;
  amount: number | null;
  driverAmount: number | null;
  additional: string;
  points: IPointSchemaFormLogistic[];
}

export interface ISchemaProductAdd {
  productId: number | null;
  packageId: number | null;
  count: number | null;
  price: number | null;
}
