import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"
import { AlertCircle, CheckCircle2, InfoIcon, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@components/ui/card"

const meta = {
  title: "Atoms/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Alert component with glass morphism effect and smooth fade-in animations. Features backdrop blur, gradient backgrounds, and motion transitions.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success", "warning", "info"],
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
}

export const Success: Story = {
  render: () => (
    <Alert variant="success">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your transaction has been processed successfully.
      </AlertDescription>
    </Alert>
  ),
}

export const Warning: Story = {
  render: () => (
    <Alert variant="warning">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your account balance is running low.
      </AlertDescription>
    </Alert>
  ),
}

export const Info: Story = {
  render: () => (
    <Alert variant="info">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        New features are available. Check them out!
      </AlertDescription>
    </Alert>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert with glass morphism effect.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your transaction has been processed successfully.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Your account balance is running low.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          New features are available. Check them out!
        </AlertDescription>
      </Alert>
    </div>
  ),
}

export const InCard: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardContent className="pt-6 space-y-4">
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Payment Successful</AlertTitle>
          <AlertDescription>
            Your payment of $299.00 has been processed. Receipt sent to your email.
          </AlertDescription>
        </Alert>
        <Alert variant="info">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Tip</AlertTitle>
          <AlertDescription>
            You can save this transaction as a template for future use.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  ),
}

