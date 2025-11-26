# Toast Notification System

This project uses `react-hot-toast` with a custom glass morphism design that matches the overall UI aesthetic.

## Installation

Already installed! ✅

```bash
npm install react-hot-toast
```

## Usage

Import the toast functions from `@lib/toast`:

```typescript
import { showSuccess, showError, showLoading, showToast, showPromise } from "@lib/toast"
```

### Basic Toast Types

#### Success Toast
```typescript
showSuccess("Operation completed successfully!")
```

#### Error Toast
```typescript
showError("Something went wrong. Please try again.")
```

#### Loading Toast
```typescript
const loadingToast = showLoading("Processing your request...")
// Later, dismiss it
dismissToast(loadingToast)
```

#### Custom Toast
```typescript
showToast("This is a custom message")
```

#### Custom Toast with Icon
```typescript
showCustomToast("Payment received!", "💰")
```

### Promise Toast

Automatically handles loading, success, and error states:

```typescript
showPromise(
  fetchDataFromAPI(),
  {
    loading: "Fetching data...",
    success: "Data loaded successfully!",
    error: "Failed to load data"
  }
)
```

With dynamic messages:

```typescript
showPromise(
  createUser(userData),
  {
    loading: "Creating user...",
    success: (data) => `User ${data.name} created successfully!`,
    error: (error) => `Error: ${error.message}`
  }
)
```

### Dismissing Toasts

```typescript
// Dismiss a specific toast
const toastId = showLoading("Loading...")
dismissToast(toastId)

// Dismiss all toasts
dismissToast()
```

## Styling

The toast notifications use a glass morphism design with:
- Semi-transparent background with backdrop blur
- Soft borders with white/color accents
- Custom colors for success (green), error (red), and loading (blue) states
- Smooth animations
- Responsive sizing

## Examples in Code

### Login Success
```typescript
const response = await loginMutation(credentials).unwrap()
showSuccess(`Welcome back, ${response.data.user.name}! 👋`)
```

### Login Error
```typescript
try {
  await loginMutation(credentials).unwrap()
} catch (error) {
  showError("Invalid credentials. Please try again.")
}
```

### Async Operation
```typescript
const saveData = async () => {
  showPromise(
    api.saveData(data),
    {
      loading: "Saving...",
      success: "Saved successfully!",
      error: "Failed to save"
    }
  )
}
```

## Configuration

Toast configuration is set in `/src/components/ui/toaster.tsx`:

- **Position**: `top-right`
- **Duration**: 4000ms (4 seconds)
- **Success duration**: 3000ms (3 seconds)
- **Max width**: 420px

You can modify these settings by editing the `Toaster` component.

