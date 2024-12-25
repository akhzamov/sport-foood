export type TSalesPlanSpendingType = {
  name: string;
  amount: number;
};

export interface ISalesPlanSpending {
  success: boolean;
  data: {
    types: Record<string, TSalesPlanSpendingType>;
    total_amount: number;
  };
}
