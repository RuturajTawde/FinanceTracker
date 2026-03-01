import { CATEGORY_KEYWORDS } from "../config/categoryKeywords";

export const autoDetectCategory = (
  description: string,
  credit?: number,
  debit?: number
) => {
  const upper = description?.toUpperCase() || "";

  for (const category in CATEGORY_KEYWORDS) {
    const keywords = CATEGORY_KEYWORDS[category];

    for (const keyword of keywords) {
      if (upper.includes(keyword)) {
        return category; // must match CATEGORY_CONFIG.label
      }
    }
  }

  // Smart fallback logic
  if (credit && credit > 0) return "Other Income";
  if (debit && debit > 0) return "Other Expense";

  return "Misc";
};