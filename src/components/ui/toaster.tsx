import { Toaster as HotToaster } from "react-hot-toast"

export const Toaster = () => {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "1rem",
          boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          color: "hsl(var(--foreground))",
          padding: "1rem 1.25rem",
          fontSize: "0.875rem",
          fontWeight: "500",
          maxWidth: "420px",
        },
        success: {
          duration: 3000,
          style: {
            background: "rgba(240, 253, 244, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(34, 197, 94, 0.2)",
            color: "hsl(142 76% 36%)",
          },
          iconTheme: {
            primary: "hsl(142 76% 36%)",
            secondary: "rgba(240, 253, 244, 0.9)",
          },
        },
        error: {
          duration: 4000,
          style: {
            background: "rgba(254, 242, 242, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            color: "hsl(0 84% 60%)",
          },
          iconTheme: {
            primary: "hsl(0 84% 60%)",
            secondary: "rgba(254, 242, 242, 0.9)",
          },
        },
        loading: {
          style: {
            background: "rgba(239, 246, 255, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            color: "hsl(221 83% 53%)",
          },
          iconTheme: {
            primary: "hsl(221 83% 53%)",
            secondary: "rgba(239, 246, 255, 0.9)",
          },
        },
      }}
    />
  )
}

