import { FC } from 'react'

import { Toast, ToastBar, toast as hotToast } from 'react-hot-toast'

import { XIcon } from '@heroicons/react/outline'

export interface ErrorToastProps {
  toast: Toast
}

export const ErrorToast: FC<ErrorToastProps> = ({ toast }) => (
  <ToastBar toast={toast}>
    {({ message }) => (
      <div className="flex items-center gap-2 rounded-sm bg-accent p-3 font-mono text-sm text-white">
        <button
          className="transition-outline rounded-full p-[1px]"
          onClick={() => hotToast.dismiss(toast.id)}
        >
          <XIcon className="w-4" />
        </button>
        {message}
      </div>
    )}
  </ToastBar>
)
