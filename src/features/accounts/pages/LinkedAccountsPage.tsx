import { useState } from "react"
import { BankAccountCard } from "../components/BankAccountCard"
import { SyncAccountModal } from "../components/SyncAccountModal"
import { Avatar, AvatarFallback } from "@components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"
import { Skeleton } from "@components/ui/skeleton"
import { Switch } from "@components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { Label } from "@components/ui/label"
import { AlertCircle } from "lucide-react"

const accounts = [
  { id: "acct-1", name: "High-yield reserve", institution: "Mercury", balance: 48210, lastSync: "3m ago", status: "healthy" as const },
  { id: "acct-2", name: "Everyday checking", institution: "Chase", balance: 12180, lastSync: "12m ago", status: "syncing" as const },
  { id: "acct-3", name: "Brokerage", institution: "Fidelity", balance: 78200, lastSync: "2h ago", status: "attention" as const },
]

export const LinkedAccountsPage = () => {
  const [loading] = useState(false)
  const [syncEnabled, setSyncEnabled] = useState<Record<string, boolean>>({
    "acct-1": true,
    "acct-2": true,
    "acct-3": false,
  })

  const accountsNeedingAttention = accounts.filter((acc) => acc.status === "attention" || acc.status === "syncing")

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Accounts</p>
          <h1 className="text-3xl font-semibold text-white">Linked institutions</h1>
          <p className="text-muted-foreground">Monitor balances in real time with full sync visibility.</p>
        </header>

        {accountsNeedingAttention.length > 0 && (
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Sync Issues Detected</AlertTitle>
            <AlertDescription>
              {accountsNeedingAttention.length} account{accountsNeedingAttention.length > 1 ? "s" : ""} {accountsNeedingAttention.length > 1 ? "need" : "needs"} attention. Please check sync status.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{accounts.length} connections</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <SyncAccountModal />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a new bank account or financial institution</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {accounts.map((account) => (
              <div key={account.id} className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{account.institution.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{account.institution}</p>
                      <p className="text-sm text-muted-foreground">{account.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`sync-${account.id}`} className="text-sm cursor-pointer">
                            Auto-sync
                          </Label>
                          <Switch
                            id={`sync-${account.id}`}
                            checked={syncEnabled[account.id] || false}
                            onCheckedChange={(checked) => {
                              setSyncEnabled((prev) => ({ ...prev, [account.id]: checked }))
                            }}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enable automatic synchronization for this account</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <BankAccountCard {...account} />
              </div>
            ))}
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
