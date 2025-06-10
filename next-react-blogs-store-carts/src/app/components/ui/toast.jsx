'use client'

import React, { useState, useEffect, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

const ToastContext = createContext()

export function ToastProviderWrapper({ children }) {
  const [toasts, setToasts] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const showToast = ({ title, description, variant = "default", duration = 3000 }) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, title, description, variant }])

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted && createPortal(
        <div className="fixed top-5 right-5 z-50 space-y-3 max-w-sm w-full">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-start justify-between gap-3 p-4 rounded-lg shadow-md animate-slide-in
                ${toast.variant === 'error' ? 'bg-rose-800' :
                   'success' ? 'bg-green-600':
                   'loading'? 'bg-gray-600':
                   'bg-gray-600'

                   
                } text-white`}
            >
              <div className="flex-1">
                <p className="font-semibold">{toast.title}</p>
                {toast.description && (
                  <p className="text-sm mt-1 opacity-90">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="hover:text-red-300 transition"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within ToastProviderWrapper")
  return context
}
