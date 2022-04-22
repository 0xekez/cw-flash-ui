import { FC, ReactNode } from 'react'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { CubeIcon } from '@heroicons/react/outline'

import { useRecoilValue } from 'recoil'
import { signingCosmWasmClientSelector } from '../selectors/chain'
import { walletAddressSelector } from '../selectors/keplr'
import { Title } from './Title'
import { ActionCard } from './ActionButton'

export interface ExecuteCardProps {
  children: ReactNode
  onClick: (
    client: SigningCosmWasmClient | undefined,
    walletAddress: string | undefined
  ) => void
}

export const ExecuteCard: FC<ExecuteCardProps> = ({ children, onClick }) => {
  const client = useRecoilValue(signingCosmWasmClientSelector)
  const walletAddress = useRecoilValue(walletAddressSelector)

  const wrapped = () => onClick(client, walletAddress)

  return <ActionCard onClick={wrapped}>{children}</ActionCard>
}

export const LoadingExecuteCard: FC<{}> = () => (
  <ActionCard>
    <div className="flex items-center gap-2">
      <CubeIcon className="h-7 animate-spin text-white" />
      <Title>Working</Title>
    </div>
  </ActionCard>
)
