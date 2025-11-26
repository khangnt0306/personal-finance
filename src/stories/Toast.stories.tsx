import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@components/ui/button"
import { Toaster } from "@components/ui/toaster"
import {
  showSuccess,
  showError,
  showLoading,
  showToast,
  showPromise,
  showCustomToast,
  dismissToast,
} from "@lib/toast"

const meta = {
  title: "Components/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

const ToastDemo = () => {
  const handleSuccess = () => {
    showSuccess("Operation completed successfully!")
  }

  const handleError = () => {
    showError("Something went wrong. Please try again.")
  }

  const handleLoading = () => {
    const toastId = showLoading("Processing your request...")
    setTimeout(() => {
      dismissToast(toastId)
      showSuccess("Done!")
    }, 2000)
  }

  const handleCustom = () => {
    showToast("This is a custom notification")
  }

  const handleCustomIcon = () => {
    showCustomToast("Payment received!", "💰")
  }

  const handlePromise = () => {
    const mockPromise = new Promise((resolve) => {
      setTimeout(() => resolve({ name: "John Doe" }), 2000)
    })

    showPromise(mockPromise, {
      loading: "Loading data...",
      success: (data: any) => `Welcome, ${data.name}!`,
      error: "Failed to load data",
    })
  }

  const handleMultiple = () => {
    showSuccess("First notification")
    setTimeout(() => showError("Second notification"), 500)
    setTimeout(() => showCustomToast("Third notification", "🎉"), 1000)
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <Toaster />
      <h2 className="text-2xl font-bold text-foreground">Toast Notifications Demo</h2>
      <p className="text-sm text-muted-foreground">
        Click the buttons below to see different toast notification styles
      </p>

      <div className="mt-4 grid gap-3">
        <Button onClick={handleSuccess} variant="default">
          Show Success Toast
        </Button>
        <Button onClick={handleError} variant="destructive">
          Show Error Toast
        </Button>
        <Button onClick={handleLoading} variant="outline">
          Show Loading Toast
        </Button>
        <Button onClick={handleCustom} variant="secondary">
          Show Custom Toast
        </Button>
        <Button onClick={handleCustomIcon} variant="glass">
          Show Custom Toast with Icon
        </Button>
        <Button onClick={handlePromise} variant="outline">
          Show Promise Toast
        </Button>
        <Button onClick={handleMultiple} variant="subtle">
          Show Multiple Toasts
        </Button>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <ToastDemo />,
}

export const SuccessExample: Story = {
  render: () => (
    <div className="p-8">
      <Toaster />
      <Button
        onClick={() => showSuccess("Your changes have been saved successfully!")}
      >
        Save Changes
      </Button>
    </div>
  ),
}

export const ErrorExample: Story = {
  render: () => (
    <div className="p-8">
      <Toaster />
      <Button
        onClick={() => showError("Unable to connect to server. Please try again.")}
        variant="destructive"
      >
        Trigger Error
      </Button>
    </div>
  ),
}

export const LoadingExample: Story = {
  render: () => (
    <div className="p-8">
      <Toaster />
      <Button
        onClick={() => {
          const toastId = showLoading("Uploading file...")
          setTimeout(() => {
            dismissToast(toastId)
            showSuccess("File uploaded successfully!")
          }, 3000)
        }}
      >
        Upload File
      </Button>
    </div>
  ),
}

export const CustomIconExample: Story = {
  render: () => (
    <div className="p-8">
      <Toaster />
      <div className="flex gap-3">
        <Button onClick={() => showCustomToast("New message received", "💬")}>
          New Message
        </Button>
        <Button onClick={() => showCustomToast("Transaction completed", "💰")}>
          Transaction
        </Button>
        <Button onClick={() => showCustomToast("Goal achieved!", "🎯")}>
          Goal
        </Button>
      </div>
    </div>
  ),
}

