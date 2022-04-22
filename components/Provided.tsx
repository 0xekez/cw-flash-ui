import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import {
  nativeTVLSelector,
  walletProvidedSelector,
} from '../selectors/contract'
import {
  convertDenomToMicroDenom,
  convertMicroDenomToDenom,
} from '../util/conversion'

export interface ProvidedProps {}
export interface ProvidedPercentProps {
  amount: number
}

export const Provided: FC<ProvidedProps> = () => {
  const provied = useRecoilValue(walletProvidedSelector)

  return <>{convertMicroDenomToDenom(provied)}</>
}

export const ProvidedLoading: FC<ProvidedProps> = () => (
  <span className="animate-pulse rounded-sm bg-white text-white">546</span>
)

export const ProvidedPercentLoading: FC<ProvidedPercentProps> = ({
  amount: _,
}) => <span className="animate-pulse rounded-sm bg-white text-white">546</span>

export const ProvidedPercent: FC<ProvidedPercentProps> = ({ amount }) => {
  const TVL = useRecoilValue(nativeTVLSelector)
  return (
    <>
      {(
        (Number(convertDenomToMicroDenom(amount)) / Number(TVL)) *
        100
      ).toLocaleString()}
    </>
  )
}
