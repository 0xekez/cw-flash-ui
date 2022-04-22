import { FC, ReactNode } from 'react'

export interface ActionCardProps {
  children: ReactNode
  onClick?: () => void
  striped?: boolean
}

export const ActionCard: FC<ActionCardProps> = ({
  children,
  onClick,
  striped,
}) =>
  onClick ? (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full grow flex-col justify-center gap-4 rounded-sm bg-accent p-6 transition"
    >
      {children}
    </button>
  ) : (
    <div
      className="flex w-full grow flex-col justify-center gap-4 rounded-sm bg-accent p-6 transition"
      style={
        striped
          ? {
              background:
                'repeating-linear-gradient(135deg, rgb(var(--card)), rgb(var(--card)) 15px, rgb(var(--accent)) 15px, rgb(var(--accent)) 30px)',
            }
          : {}
      }
    >
      {children}
    </div>
  )
