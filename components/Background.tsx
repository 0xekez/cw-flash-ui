import { FC, ReactNode } from 'react'

import { Toaster } from 'react-hot-toast'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { ErrorToast } from '../components/ErrorToast'
import { SuccessToast } from './SuccessToast'
import {
  useWallet,
  useWalletManager,
  WalletConnectionStatus,
} from '@noahsaso/cosmodal'

export interface BackgroundProps {
  children: ReactNode
  theme: 'provide' | 'docs' | 'loan'
}

export const Background: FC<BackgroundProps> = ({ children, theme }) => {
  const { disconnect, status, connectedWallet } = useWalletManager()
  const connected = status === WalletConnectionStatus.Connected
  const name = connectedWallet?.name

  const { pathname } = useRouter()

  return (
    <div
      className={`md:flex md:min-h-screen md:items-center md:justify-center ${theme}`}
    >
      <Toaster
        reverseOrder={false}
        position="top-center"
        toastOptions={{
          duration: 6000,
          style: {
            borderRadius: '0',
            background: 'none',
            color: '#fff',
            boxShadow: 'none',
          },
        }}
      >
        {(t) =>
          t.type === 'error' ? (
            <ErrorToast toast={t} />
          ) : (
            <SuccessToast toast={t} />
          )
        }
      </Toaster>
      <div
        className={`relative mt-9 ${
          connected ? 'mb-9' : ''
        } min-h-[496px] w-[750px] max-w-full bg-background p-6 md:mt-0 md:rounded`}
      >
        {children}
        <div className="absolute -bottom-7 right-1 text-right">
          {connected && (
            <p className="font-mono">
              {name} -{' '}
              <button className="underline" type="button" onClick={disconnect}>
                disconnect
              </button>
            </p>
          )}
        </div>
        <div className="absolute -top-7 left-1 flex flex-row gap-2">
          <Link href="/" passHref>
            <a className={`font-mono ${pathname === '/' && 'underline'}`}>
              Loan
            </a>
          </Link>
          <Link href="/provide" passHref>
            <a
              className={`font-mono ${pathname === '/provide' && 'underline'}`}
            >
              Provide
            </a>
          </Link>
          <Link href="/docs" passHref>
            <a className={`font-mono ${pathname === '/docs' && 'underline'}`}>
              Docs
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
