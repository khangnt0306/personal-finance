import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"

export const GoalContributionModal = () => {
  const [amount, setAmount] = useState("250")
  const [note, setNote] = useState("Payroll sweep")

  const handleSubmit = () => {
    // eslint-disable-next-line no-console
    console.log({ amount, note })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Add contribution</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Boost emergency reserve</DialogTitle>
          <DialogDescription>Funds move instantly from your high-yield account.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <label className="space-y-2 text-sm">
            <span className="text-muted-foreground">Amount</span>
            <Input value={amount} onChange={(event) => setAmount(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-muted-foreground">Note</span>
            <Textarea rows={3} value={note} onChange={(event) => setNote(event.target.value)} />
          </label>
        </div>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button onClick={handleSubmit} className="gap-2">
            Commit transfer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
