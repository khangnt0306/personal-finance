import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { Skeleton } from "@components/ui/skeleton"
import { Accordion } from "@components/ui/accordion"
import { Plus } from "lucide-react"
import { DrawerDayItem } from "./drawer-day-item"
import type { TransactionsListProps } from "./types"

export const DrawerTransactionsList = ({
  days,
  currency,
  isLoading,
  onEdit,
  onCreateNew,
}: TransactionsListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (!days || days.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-6 text-center">Chưa có giao dịch nào</p>
          <Button
            onClick={onCreateNew}
            size="default"
            className="p-4 pr-[12px] group relative overflow-hidden rounded-full bg-gradient-to-br from-blue-50/80 via-sky-50/70 to-cyan-50/80 backdrop-blur-xl border-[1px] border-blue-200/30 text-blue-700 shadow-md hover:shadow-xl hover:shadow-blue-200/40 hover:border-blue-300/50 hover:bg-gradient-to-br hover:from-blue-100/60 hover:via-sky-100/50 hover:to-cyan-100/60 transition-all duration-300 hover:rounded-full hover:px-6"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 shrink-0 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100 font-medium text-sm">
                Thêm giao dịch đầu tiên
              </span>
            </div>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Accordion type="multiple" className="space-y-3">
      {days.map((day, dayIndex) => (
        <DrawerDayItem
          key={day.date}
          day={day}
          dayIndex={dayIndex}
          currency={currency}
          onEdit={onEdit}
        />
      ))}
    </Accordion>
  )
}

