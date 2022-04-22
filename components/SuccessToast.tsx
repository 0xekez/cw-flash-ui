import { FC } from 'react'

import { Toast, ToastBar, toast as hotToast } from 'react-hot-toast'

import { XIcon } from '@heroicons/react/outline'
import { Address } from './Address'

export interface SuccessToastProps {
  toast: Toast
}

export const SuccessToast: FC<SuccessToastProps> = ({ toast }) => (
  <ToastBar toast={toast}>
    {({ icon }) => {
      return (
        <div className="flex flex-wrap items-center gap-2 rounded-sm bg-card p-3 font-mono text-sm text-white">
          <button
            className="transition-outline rounded-full p-[1px]"
            onClick={() => hotToast.dismiss(toast.id)}
          >
            <XIcon className="w-4" />
          </button>
          {icon}
        </div>
      )
    }}
  </ToastBar>
)
