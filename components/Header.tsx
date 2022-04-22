import { FC } from 'react'

import { GradientSquare } from './GradientSquare'
import { Title } from './Title'

export interface HeaderProps {
  title: string
}

export const Header: FC<HeaderProps> = ({ title }) => (
  <div className="flex h-[100px] items-center justify-between gap-3 overflow-hidden rounded-sm bg-card p-6 text-white">
    <Title>{title}</Title>
    <div className="hidden items-center gap-3 sm:flex">
      <GradientSquare />
      <GradientSquare flip />
      <GradientSquare />
    </div>
    <div className="flex items-center sm:hidden">
      <GradientSquare />
    </div>
  </div>
)
