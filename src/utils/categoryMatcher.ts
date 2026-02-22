const RULES: Record<string, string> = {
  SALARY: "Salary",
  ZOMATO: "Food",
  SWIGGY: "Food",
  UBER: "Travel",
  OLA: "Travel",
  RENT: "Rent",
  SIP: "Investment",
  MUTUAL: "Investment",
  TRANSFER: "Transfer",
  REFUND: "Refund",
  EMI: "EMI",
  AMAZON: "Shopping",
  FLIPKART: "Shopping"
};

export const autoDetectCategory = (description: string) => {
  const upper = description?.toUpperCase() || "";

  for (const key in RULES) {
    if (upper.includes(key)) return RULES[key];
  }

  return "Misc";
};