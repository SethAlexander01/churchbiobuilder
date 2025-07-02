import { useState, useCallback } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ id = Math.random().toString(36), ...props }: Omit<Toast, "id"> & { id?: string }) => {
    setToasts((prev) => [...prev, { id, ...props }]);
    
    // Auto remove after duration
    const duration = props.duration ?? 3000;
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    toast,
    dismiss,
  };
}
