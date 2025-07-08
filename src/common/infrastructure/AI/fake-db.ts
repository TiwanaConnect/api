export interface Entry {
  name: string;
  amount: number;
}

export const db: {
  expenses: Entry[];
  incomes: Entry[];
} = {
  expenses: [],
  incomes: [],
};
