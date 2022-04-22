import { FC } from 'react'

export interface GradientSquareProps {
  flip?: boolean
}

export const GradientSquare: FC<GradientSquareProps> = ({ flip }) =>
  flip ? (
    <div className="h-16 w-16 rounded-sm bg-gradient-to-t from-background to-accent"></div>
  ) : (
    <div className="h-16 w-16 rounded-sm bg-gradient-to-t from-accent to-background"></div>
  )
