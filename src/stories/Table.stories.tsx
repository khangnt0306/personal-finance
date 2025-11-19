import type { Meta, StoryObj } from "@storybook/react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@components/ui/table"

type LedgerEntry = {
  id: string
  vendor: string
  category: string
  amount: string
  status: "cleared" | "pending"
}

const sampleEntries: LedgerEntry[] = [
  { id: "TX-9281", vendor: "Figma", category: "Design tooling", amount: "-₫1,240,000", status: "cleared" },
  { id: "TX-9282", vendor: "Payroll", category: "Compensation", amount: "-₫18,400,000", status: "cleared" },
  { id: "TX-9283", vendor: "Stripe", category: "Revenue", amount: "+₫41,750,000", status: "pending" },
]

const meta = {
  title: "Atoms/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Responsive table primitives from `@components/ui/table`. Compose header/body rows to present ledger-style data.",
      },
    },
  },
  args: {
    entries: sampleEntries,
  },
} satisfies Meta<{ entries: LedgerEntry[] }>

export default meta
type Story = StoryObj<typeof meta>

export const Ledger: Story = {
  render: ({ entries }) => (
    <Table className="max-w-3xl">
      <TableCaption>Recent ledger events</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Vendor</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id} data-state={entry.status === "pending" ? "selected" : undefined}>
            <TableCell>{entry.id}</TableCell>
            <TableCell>{entry.vendor}</TableCell>
            <TableCell>{entry.category}</TableCell>
            <TableCell className="text-right">{entry.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}


