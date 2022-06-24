import { FC } from 'react'

import { CubeIcon } from '@heroicons/react/outline'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { useWallet } from '@noahsaso/cosmodal'

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
  const { signingCosmWasmClient, address } = useWallet()

  return (
    <button
      className="rounded-sm bg-accent py-2 px-4"
      onClick={() => onClick(signingCosmWasmClient, address)}
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
