import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Toast, ToastProvider as ShadToastProvider, ToastViewport } from "@/components/ui/toast";

interface ToastContextType {
  showToast: (title: string, description?: string, variant?: "default" | "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<
    { id: string; title: string; description?: string; variant: "default" | "success" | "error" | "info" }[]
  >([]);

  const showToast = (title: string, description?: string, variant: "default" | "success" | "error" | "info" = "default") => {
    setToasts((prev) => [
      ...prev,
      { id: Date.now().toString(), title, description, variant },
    ]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Toast classes based on variants
  const toastClass = useMemo(
    () => ({
      success: "bg-green-100 border-l-4 border-green-500 text-green-800",
      error: "bg-red-100 border-l-4 border-red-500 text-red-800",
      info: "bg-blue-100 border-l-4 border-blue-500 text-blue-800",
      default: "bg-gray-100 border-l-4 border-gray-500 text-gray-800",
    }),
    []
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ShadToastProvider>
        {/* Toast Viewport explicitly positioned at the top-center */}
        <ToastViewport
          className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md space-y-2 z-50"
          style={{ bottom: "auto", top: "1rem" }} // Override default positioning
        />
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            className={`p-4 rounded-md shadow-md ${toastClass[toast.variant]}`}
            duration={2500}
            onOpenChange={(isOpen) => {
              if (!isOpen) removeToast(toast.id);
            }}
          >
            <div className="font-medium">{toast.title}</div>
            {toast.description && <div className="text-sm">{toast.description}</div>}
          </Toast>
        ))}
      </ShadToastProvider>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
