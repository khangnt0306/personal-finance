import type { RouteObject } from "react-router-dom"
import { appRoutes } from "./appRoutes"
import { transactionRoutes } from "./transactionRoutes"
import { categoryRoutes } from "./categoryRoutes"
import { budgetRoutes } from "./budgetRoutes"
import { planRoutes } from "./planRoutes"
import { goalRoutes } from "./goalRoutes"
import { reportRoutes } from "./reportRoutes"
import { accountRoutes } from "./accountRoutes"
import { settingsRoutes } from "./settingsRoutes"
import { savingsRoutes } from "./savingsRoutes"

export const privateRoutes: RouteObject[] = [
  ...appRoutes,
  ...transactionRoutes,
  ...categoryRoutes,
  ...budgetRoutes,
  ...planRoutes,
  ...goalRoutes,
  ...reportRoutes,
  ...accountRoutes,
  ...settingsRoutes,
  ...savingsRoutes,
]


