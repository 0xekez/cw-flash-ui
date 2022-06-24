import { useWallet } from '@noahsaso/cosmodal'
import { FC } from 'react'
import { constSelector, useRecoilValue } from 'recoil'
import { nativeTVLSelector, providedSelector } from '../selectors/contract'
import {
  convertDenomToMicroDenom,
  convertMicroDenomToDenom,
} from '../util/conversion'

export interface ProvidedProps {}
export interface ProvidedPercentProps {
  amount: number
}

export const Provided: FC<ProvidedProps> = () => {
  const { address } = useWallet()
  const provied = useRecoilValue(
    address ? providedSelector(address) : constSelector('0')
  )

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
