import { BankAccountCard } from "../components/BankAccountCard"
import { SyncAccountModal } from "../components/SyncAccountModal"

const accounts = [
  { id: "acct-1", name: "High-yield reserve", institution: "Mercury", balance: 48210, lastSync: "3m ago", status: "healthy" as const },
  { id: "acct-2", name: "Everyday checking", institution: "Chase", balance: 12180, lastSync: "12m ago", status: "syncing" as const },
  { id: "acct-3", name: "Brokerage", institution: "Fidelity", balance: 78200, lastSync: "2h ago", status: "attention" as const },
]

export const LinkedAccountsPage = () => {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Accounts</p>
        <h1 className="text-3xl font-semibold text-white">Linked institutions</h1>
        <p className="text-muted-foreground">Monitor balances in real time with full sync visibility.</p>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">{accounts.length} connections</p>
        <SyncAccountModal />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {accounts.map((account) => (
          <BankAccountCard key={account.id} {...account} />
        ))}
      </div>
    </div>
  )
}
