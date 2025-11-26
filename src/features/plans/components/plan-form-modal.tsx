import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { Input } from "@components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Textarea } from "@components/ui/textarea"
import { Button } from "@components/ui/button"
import { Switch } from "@components/ui/switch"
import type { Plan } from "../types"
import { planSchema, type PlanFormData } from "../validation/plan.schemas"

interface PlanFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: PlanFormData) => Promise<void> | void
  plan?: Plan | null
  isSubmitting?: boolean
}

const CURRENCY_OPTIONS = [
  { value: "VND", label: "VND (₫)" },
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
] as const

const PLAN_TYPE_OPTIONS = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "YEARLY", label: "Yearly" },
] as const

export const PlanFormModal = ({
  open,
  onOpenChange,
  onSubmit,
  plan,
  isSubmitting,
}: PlanFormModalProps) => {
  const form = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      description: "",
      currency: "VND",
      planType: "MONTHLY",
      autoRepeat: false,
      autoAdjustEnabled: true,
      dailyMinLimit: 10,
      warnLevelYellow: 50,
      warnLevelRed: 80,
    },
  })

  useEffect(() => {
    if (plan) {
      form.reset({
        name: plan.name,
        description: plan.description || "",
        currency: plan.currency,
        planType: plan.planType,
        autoRepeat: plan.autoRepeat,
        autoAdjustEnabled: plan.autoAdjustEnabled,
        dailyMinLimit: plan.dailyMinLimit,
        warnLevelYellow: plan.warnLevelYellow,
        warnLevelRed: plan.warnLevelRed,
      })
    } else {
      form.reset({
        name: "",
        description: "",
        currency: "VND",
        planType: "MONTHLY",
        autoRepeat: false,
        autoAdjustEnabled: true,
        dailyMinLimit: 10,
        warnLevelYellow: 50,
        warnLevelRed: 80,
      })
    }
  }, [plan, form])

  const handleSubmit = async (data: PlanFormData) => {
    await onSubmit(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{plan ? "Update plan" : "Create plan"}</DialogTitle>
          <DialogDescription>
            {plan
              ? "Edit the plan details and milestones"
              : "Define your financial plan and desired outcomes"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter plan name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your plan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CURRENCY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="planType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select plan type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PLAN_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="dailyMinLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily minimum limit (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0" max="100"
                      placeholder="10%"
                      value={field.value}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="warnLevelYellow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yellow warning level (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="50"
                        value={field.value}
                        onChange={(event) => field.onChange(Number(event.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="warnLevelRed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Red warning level (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="80"
                        value={field.value}
                        onChange={(event) => field.onChange(Number(event.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="autoRepeat"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Auto-repeat</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Automatically repeat this plan when completed
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="autoAdjustEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Auto-adjust enabled</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Automatically adjust plan based on spending patterns
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : plan ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

