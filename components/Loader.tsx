import { FC, Suspense, ReactNode, useState, useEffect } from 'react'

export interface LoaderProps {
  fallback: NonNullable<ReactNode>
  children: ReactNode
  loading?: boolean
}

export const Loader: FC<LoaderProps> = ({ fallback, children, loading }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => setLoaded(true))

  return !loaded || loading ? (
    <>{fallback}</>
  ) : (
    <Suspense fallback={fallback}>{children}</Suspense>
  )
}
