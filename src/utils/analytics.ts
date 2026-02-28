import { CATEGORY_CONFIG } from "../config/categoryConfig";

export const calculateAnalytics = (transactions: any[]) => {
  let income = 0;
  let expense = 0;
  let investment = 0;

  const categoryTotals: Record<string, number> = {};

  transactions.forEach((t) => {
    const config = CATEGORY_CONFIG.find(c => c.label === t.type);
    if (!config) return;

    const amount = Number(t.debit) || Number(t.credit) || 0;

    if (!categoryTotals[t.type]) categoryTotals[t.type] = 0;
    categoryTotals[t.type] += amount;

    if (config.group === "income") income += amount;
    if (config.group === "expense") expense += amount;
    if (config.group === "investment") investment += amount;
  });

  return {
    income,
    expense,
    investment,
    savings: income - expense,
    available: income - expense - investment,
    categoryTotals
  };
};