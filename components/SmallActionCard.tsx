import { FC } from 'react'

import { CubeIcon } from '@heroicons/react/outline'

import { useRecoilValue } from 'recoil'
import { signingCosmWasmClientSelector } from '../selectors/chain'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import { walletAddressSelector } from '../selectors/keplr'

export interface SmallActionCardProps {
  text: string
  onClick: (
    client: SigningCosmWasmClient | undefined,
    walletAddress: string | undefined
  ) => void
}

export const SmallActionCard: FC<SmallActionCardProps> = ({
  text,
  onClick,
}) => {
  const client = useRecoilValue(signingCosmWasmClientSelector)
  const walletAddress = useRecoilValue(walletAddressSelector)

  return (
    <button
      className="rounded-sm bg-accent py-2 px-4"
      onClick={() => onClick(client, walletAddress)}
    >
      <p className="font-header text-[14px] text-white">{text}</p>
    </button>
  )
}

export const SmallActionCardLoading: FC<{}> = () => (
  <div className="rounded-sm bg-accent py-2 px-4">
    <div className="flex items-center gap-2">
      <CubeIcon className="h-4 animate-spin text-white" />
      <p className="font-header text-[14px] text-white">Working</p>
    </div>
  </div>
)
