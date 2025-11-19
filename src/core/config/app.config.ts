export const APP_CONFIG = {
  name: "Personal Finance Manager",
  version: "1.0.0",
  currency: {
    default: "VND",
    symbol: "₫",
  },
  dateFormat: "dd/MM/yyyy",
  storage: {
    prefix: "pfm_",
    keys: {
      transactions: "transactions",
      categories: "categories",
      budgets: "budgets",
    },
  },
} as const

