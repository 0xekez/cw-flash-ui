import { FC, ReactNode } from 'react'

export interface CardRowProps {
  children: ReactNode
}

export const CardRow: FC<CardRowProps> = ({ children }) => (
  <div className="mt-5 flex flex-wrap gap-5 md:grid md:grid-cols-2">
    {children}
  </div>
)
