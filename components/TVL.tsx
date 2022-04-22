import { FC } from 'react'

import Image from 'next/image'

import { useRecoilValue } from 'recoil'
import { nativeTVLSelector, USTValueSelector } from '../selectors/contract'
import { convertMicroDenomToDenom } from '../util/conversion'
import { BigCard } from './BigCard'
import { LoadingMono, Mono } from './Mono'
import { LoadingTitle, Title } from './Title'

export interface TVLProps {}

export const TVL: FC<TVLProps> = ({}) => {
  const nativeTVL = useRecoilValue(nativeTVLSelector)
  const USTValue = useRecoilValue(USTValueSelector(nativeTVL))

  return (
    <BigCard>
      <div className="flex flex-col gap-2">
        <Title>$ {Number(USTValue).toLocaleString()} TVL</Title>
        <div className="flex flex-row items-center gap-2">
          <Image
            layout="fixed"
            src="/juno.png"
            alt="juno logo"
            width={16}
            height={16}
          />
          <Mono>
            {convertMicroDenomToDenom(nativeTVL).toLocaleString()} Juno provided
          </Mono>
        </div>
      </div>
    </BigCard>
  )
}

export const TVLLoading: FC<TVLProps> = ({}) => (
  <BigCard>
    <div className="flex animate-pulse flex-col gap-2">
      <LoadingTitle>$ ?? TVL</LoadingTitle>
      <div className="flex flex-row items-center gap-2">
        <Image
          layout="fixed"
          src="/juno.png"
          alt="juno logo"
          width={16}
          height={16}
        />
        <LoadingMono>?? Juno provided</LoadingMono>
      </div>
    </div>
  </BigCard>
)
