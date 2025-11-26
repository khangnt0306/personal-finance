import toast from "react-hot-toast"

/**
 * Display a success toast notification
 */
export const showSuccess = (message: string) => {
  return toast.success(message)
}

/**
 * Display an error toast notification
 */
export const showError = (message: string) => {
  return toast.error(message)
}

/**
 * Display a loading toast notification
 */
export const showLoading = (message: string) => {
  return toast.loading(message)
}

/**
 * Display a custom toast notification
 */
export const showToast = (message: string) => {
  return toast(message)
}

/**
 * Display a promise toast that shows loading, success, and error states
 */
export const showPromise = <T,>(
  promise: Promise<T>,
  messages: {
    loading: string
    success: string | ((data: T) => string)
    error: string | ((error: Error) => string)
  }
) => {
  return toast.promise(promise, messages)
}

/**
 * Dismiss a specific toast or all toasts
 */
export const dismissToast = (toastId?: string) => {
  if (toastId) {
    toast.dismiss(toastId)
  } else {
    toast.dismiss()
  }
}

/**
 * Remove a specific toast or all toasts
 */
export const removeToast = (toastId?: string) => {
  if (toastId) {
    toast.remove(toastId)
  } else {
    toast.remove()
  }
}

/**
 * Custom toast with icon
 */
export const showCustomToast = (message: string, icon?: string) => {
  return toast(message, {
    icon: icon || "💰",
  })
}

