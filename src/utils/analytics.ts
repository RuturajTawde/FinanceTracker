import { CATEGORY_CONFIG } from "../config/categoryConfig";

export const calculateAnalytics = (transactions: any[]) => {
  let income = 0;
  let expense = 0;
  let investment = 0;

  const categoryTotals: Record<string, number> = {};

  transactions.forEach((t) => {
    const config = CATEGORY_CONFIG.find((c) => c.label === t.type);
    if (!config) return;

    const amount = Number(t.debit) || Number(t.credit) || 0;

    if (!categoryTotals[t.type]) categoryTotals[t.type] = 0;
    categoryTotals[t.type] += amount;

    if (config.group === "income") income += amount;
    if (config.group === "expense") expense += amount;
    if (config.group === "investment") investment += amount;
  });

  const savings = income - expense;
  const available = income - expense - investment;

  const expensePercent = income ? (expense / income) * 100 : 0;
  const investmentPercent = income ? (investment / income) * 100 : 0;
  const availablePercent = income ? (available / income) * 100 : 0;

  // Financial Health Score Logic
  let score = 100;

  if (expensePercent > 70) score -= 30;
  if (investmentPercent < 20) score -= 20;
  if (available < 0) score -= 30;

  score = Math.max(score, 0);

  let healthLabel = "Excellent";
  if (score <= 80) healthLabel = "Good";
  if (score <= 60) healthLabel = "Average";
  if (score <= 40) healthLabel = "Needs Attention";

  return {
    income,
    expense,
    investment,
    savings,
    available,
    expensePercent,
    investmentPercent,
    availablePercent,
    financialScore: score,
    healthLabel,
    categoryTotals,
  };
};