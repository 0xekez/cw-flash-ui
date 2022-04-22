import { FC } from 'react'

import { useRecoilValue } from 'recoil'
import { feeSelector } from '../selectors/contract'

export interface FeeProps {
  add?: number
}

export const Fee: FC<FeeProps> = ({ add }) => {
  const fee = useRecoilValue(feeSelector) * 100 + (add || 0)
  return <>{fee}</>
}

export const FeeLoading: FC<{}> = ({}) => (
  <span className="animate-pulse bg-white text-white">3</span>
)
