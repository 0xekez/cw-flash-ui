import { FC, ReactNode } from 'react'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { CubeIcon } from '@heroicons/react/outline'

import { Title } from './Title'
import { ActionCard } from './ActionButton'
import { useWallet } from '@noahsaso/cosmodal'

export interface ExecuteCardProps {
  children: ReactNode
  onClick: (
    client: SigningCosmWasmClient | undefined,
    walletAddress: string | undefined
  ) => void
}

export const ExecuteCard: FC<ExecuteCardProps> = ({ children, onClick }) => {
  const { signingCosmWasmClient, address } = useWallet()

  const wrapped = () => onClick(signingCosmWasmClient, address)

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
