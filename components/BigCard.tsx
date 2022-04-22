import { FC, ReactNode } from 'react'

export interface BigCardProps {
  children: ReactNode
}

export const BigCard: FC<BigCardProps> = ({ children }) => (
  <div className="relative flex grow flex-col gap-2 rounded-sm bg-card p-6">
    {children}
  </div>
)
