import { motion } from "framer-motion"
import { Badge } from "@components/ui/badge"
import { Separator } from "@components/ui/separator"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion"
import { Calendar } from "lucide-react"
import { formatCurrency } from "@core/utils/format"
import { format, parseISO, isToday } from "date-fns"
import { DrawerTransactionItem } from "./drawer-transaction-item"
import type { DayItemProps } from "./types"

export const DrawerDayItem = ({ day, dayIndex, currency, onEdit }: DayItemProps) => {
  const dayDate = parseISO(day.date)
  const isTodayDate = isToday(dayDate)
  const dayTotal = day.transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: dayIndex * 0.1 }}
    >
      <AccordionItem
        value={day.date}
        className={`bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm border-border/60 rounded-xl overflow-hidden ${
          isTodayDate ? "ring-2 ring-primary/30" : ""
        }`}
      >
        <AccordionTrigger className="px-3 py-2.5 sm:px-4 sm:py-3 hover:no-underline hover:bg-muted/30 transition-colors">
          <div className="flex items-center justify-between w-full pr-2 sm:pr-4 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 shrink-0">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <p className="font-semibold text-sm sm:text-base">
                    {format(dayDate, "dd/MM/yyyy")}
                  </p>
                  {isTodayDate && (
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] sm:text-xs px-1.5 sm:px-2">
                      Hôm nay
                    </Badge>
                  )}
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                  {day.transactions.length} giao dịch
                </p>
              </div>
            </div>
            <Badge variant="pastel" className="font-bold bg-red-500/10 text-red-600 shadow-soft hover:bg-red-500/20 text-[10px] sm:text-xs shrink-0">
                <span className="hidden sm:inline">Tổng: </span>{formatCurrency(dayTotal, currency)}
            </Badge>
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-3 pb-3 sm:px-4 sm:pb-4">
          <div className="space-y-2 mt-2">
            {day.transactions.map((transaction, index) => (
              <div key={transaction.id}>
                {index > 0 && <Separator className="my-2" />}
                <DrawerTransactionItem
                  transaction={transaction}
                  currency={currency}
                  onEdit={onEdit}
                />
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  )
}

