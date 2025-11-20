import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { DatePicker } from "@components/ui/date-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { Info } from "lucide-react"

export const SpendingAnalysisPage = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  const categories = [
    { name: "Food & Dining", amount: 1250, percentage: 35 },
    { name: "Shopping", amount: 890, percentage: 25 },
    { name: "Transportation", amount: 450, percentage: 13 },
    { name: "Entertainment", amount: 320, percentage: 9 },
    { name: "Bills & Utilities", amount: 650, percentage: 18 },
  ]

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Reports</p>
          <h1 className="text-3xl font-semibold text-white">Spending Analysis</h1>
          <p className="text-muted-foreground">Deep dive into your spending patterns and trends.</p>
        </header>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-2 block">Start Date</label>
            <DatePicker
              date={startDate}
              onDateChange={setStartDate}
              placeholder="Select start date"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-2 block">End Date</label>
            <DatePicker
              date={endDate}
              onDateChange={setEndDate}
              placeholder="Select end date"
            />
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Spending</CardTitle>
                <CardDescription>Period: {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">$3,560</div>
                <p className="text-sm text-muted-foreground mt-2">Average daily spending: $118.67</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>Breakdown of expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {categories.map((category, index) => (
                    <AccordionItem key={index} value={`category-${index}`}>
                      <AccordionTrigger>
                        <div className="flex items-center justify-between w-full pr-4">
                          <span>{category.name}</span>
                          <div className="flex items-center gap-4">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-sm font-semibold">${category.amount}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{category.percentage}% of total spending</p>
                              </TooltipContent>
                            </Tooltip>
                            <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>• {category.amount} transactions in this category</p>
                          <p>• Average transaction: ${(category.amount / 10).toFixed(2)}</p>
                          <p>• Top merchant: Sample Merchant</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Spending Trends</CardTitle>
                <CardDescription>Monthly comparison and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">This month</span>
                    <span className="font-semibold">$3,560</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last month</span>
                    <span className="font-semibold">$3,240</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Change</span>
                    <span className="font-semibold text-green-600">+9.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              <CardTitle>Insights</CardTitle>
            </div>
            <CardDescription>AI-powered spending recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Your spending on Food & Dining increased by 15% this month</p>
            <p>• Consider setting a budget for Shopping category to control expenses</p>
            <p>• Transportation costs are below average - great job!</p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}

