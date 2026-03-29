import React, { useState, useCallback } from "react";

type ToastOpts = { title: string; description?: string; variant?: "default" | "destructive" };
interface ToastContextType {
  toast: (opts: ToastOpts) => void;
}
const ToastContext = React.createContext<ToastContextType>({ toast: () => {} });

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<(ToastOpts & { id: number })[]>([]);

  const toast = useCallback((opts: ToastOpts) => {
    const id = Date.now();
    setToasts(prev => [...prev, { ...opts, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 p-4 max-h-screen w-full md:max-w-[420px] flex flex-col gap-2">
        {toasts.map(t => (
          <div key={t.id} className={`pointer-events-auto relative flex w-full flex-col gap-1 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all ${t.variant === 'destructive' ? 'border-red-500 bg-red-600 text-white' : 'border-zinc-200 bg-white text-zinc-950'}`}>
            <div className="font-semibold text-sm">{t.title}</div>
            {t.description && <div className="text-sm opacity-90">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => React.useContext(ToastContext);
