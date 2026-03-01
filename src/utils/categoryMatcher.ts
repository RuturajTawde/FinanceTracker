const RULES: Record<string, string> = {
  SALARY: "Salary",
  ZOMATO: "Food",
  SWIGGY: "Food",
  DIETICO: "Food",
  UBER: "Travel",
  OLA: "Travel",
  MMRDA:"Travel",
  MOHAN: "Rent",
  SIP: "Investment",
  MUTUAL: "Investment",
  INDSTOCKS:"Investment",
  CLEARING:"Investment",
  SAVING:"Investment",
  RD:"Investment",
  TRANSFER: "Transfer",
  BAVKAR:"Transfer",
  REFUND: "Refund",
  EMI: "EMI",
  AMAZON: "Shopping",
  FLIPKART: "Shopping",
  HEALTH:"Health",
  BHAKTIVEDANTA:"Health",
  CHEMIST:"Health"
};

export const autoDetectCategory = (description: string) => {
  const upper = description?.toUpperCase() || "";

  for (const key in RULES) {
    if (upper.includes(key)) return RULES[key];
  }

  return "Misc";
};