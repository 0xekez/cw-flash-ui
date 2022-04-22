import { FC, ReactNode } from 'react'

export interface TitleProps {
  children: ReactNode
}

export const Title: FC<TitleProps> = ({ children }) => (
  <h2 className="font-header text-[32px] text-white">{children}</h2>
)

export const LoadingTitle: FC<TitleProps> = ({ children }) => (
  <h2 className="font-header rounded-sm bg-white text-[32px] text-white">
    gb
    {children}
  </h2>
)
