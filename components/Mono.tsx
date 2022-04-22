import { FC, ReactNode } from 'react'

export interface MonoProps {
  children: ReactNode
  invert?: boolean
}

export const Mono: FC<MonoProps> = ({ children, invert }) => (
  <h2 className={`font-mono text-sm ${invert ? 'text-black' : 'text-white'}`}>
    {children}
  </h2>
)

export const LoadingMono: FC<MonoProps> = ({ children, invert }) => (
  <h2
    className={`rounded-sm font-mono text-sm ${
      invert ? 'bg-black text-black' : 'bg-white text-white'
    }`}
  >
    {children}
  </h2>
)
