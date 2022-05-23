import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useSetRecoilState, useRecoilValueLoadable } from 'recoil'

import { toast } from 'react-hot-toast'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import { Background } from '../components/Background'
import { BigCard } from '../components/BigCard'
import { CardRow } from '../components/CardRow'
import { Header } from '../components/Header'
import { Title } from '../components/Title'
import { Mono } from '../components/Mono'
import { ActionCard } from '../components/ActionButton'
import { ExecuteCard, LoadingExecuteCard } from '../components/ExecuteCard'
import { TVL, TVLLoading } from '../components/TVL'
import { Loader } from '../components/Loader'
import {
  Provided,
  ProvidedLoading,
  ProvidedPercent,
  ProvidedPercentLoading,
} from '../components/Provided'

import { useWallet } from '../hooks/useWallet'

import { CONTRACT_ADDR, FEE_DENOM } from '../util/constants'
import {
  convertDenomToMicroDenom,
  convertMicroDenomToDenom,
} from '../util/conversion'

import { stateUpdatesAtom, walletProvidedSelector } from '../selectors/contract'

import { TXHash } from '../components/TXHash'
import {
  SmallActionCard,
  SmallActionCardLoading,
} from '../components/SmallActionCard'

const Provide: NextPage = () => {
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  const [validate, setValidate] = useState(false)
  const [amountError, setAmountError] = useState<string | undefined>(undefined)

  const validateAmount = (amount: number) => {
    if (isNaN(amount)) {
      return 'Unspecified.'
    }

    const nativeAmount = convertDenomToMicroDenom(amount)
    if (nativeAmount > nativeBalance) {
      return `Greater than Juno balance (${convertMicroDenomToDenom(
        nativeBalance
      )}).`
    } else if (amount <= 0) {
      return 'Not positive.'
    } else {
      return undefined
    }
  }

  const provided = useRecoilValueLoadable(walletProvidedSelector)
  const setStateUpdates = useSetRecoilState(stateUpdatesAtom)

  const { connect, connected, nativeBalance } = useWallet()

  useEffect(
    () => setAmountError(validate ? validateAmount(amount) : undefined),
    [amount, validate]
  )

  const onProvide = (
    client: SigningCosmWasmClient | undefined,
    walletAddress: string | undefined
  ) => {
    if (validateAmount(amount)) {
      setValidate(true)
      return
    }

    if (!client || !walletAddress) {
      toast.error('Wallet not connected.')
      return
    }

    setLoading(true)

    client
      .execute(
        walletAddress,
        CONTRACT_ADDR,
        {
          provide: {},
        },
        'auto',
        undefined,
        [
          {
            amount: convertDenomToMicroDenom(amount),
            denom: FEE_DENOM,
          },
        ]
      )
      .catch((e) => toast.error(e.message))
      .then((r) => {
        if (typeof r !== 'string') {
          toast.success('', {
            icon: <TXHash hash={r.transactionHash} />,
          })
        }
      })
      .finally(() => {
        setLoading(false)
        setAmount(0)
        setValidate(false)
        setStateUpdates((n) => n + 1)
      })
  }

  const onWithdraw = (
    client: SigningCosmWasmClient | undefined,
    walletAddress: string | undefined
  ) => {
    if (!client || !walletAddress) {
      toast.error('Wallet not connected.')
      return
    }

    setLoading(true)

    client
      .execute(
        walletAddress,
        CONTRACT_ADDR,
        {
          withdraw: {},
        },
        'auto',
        undefined,
        []
      )
      .catch((e) => toast.error(e.message))
      .then((r) => {
        if (typeof r !== 'string') {
          toast.success('', {
            icon: <TXHash hash={r.transactionHash} />,
          })
        }
      })
      .finally(() => {
        setLoading(false)
        setStateUpdates((n) => n + 1)
      })
  }

  return (
    <Background theme="provide">
      <Header title="Provide" />
      <CardRow>
        <BigCard>
          <Title>Provided</Title>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row flex-wrap items-end gap-3">
              <p className="font-header gap-2 text-[52px] text-white">
                <Loader loading={loading} fallback={<ProvidedLoading />}>
                  <Provided />
                </Loader>
              </p>
              <div className="mb-3 flex flex-row items-center gap-2">
                <Image
                  layout="fixed"
                  src="/juno.png"
                  alt="juno logo"
                  width={16}
                  height={16}
                />
                <Mono>Juno</Mono>
              </div>
            </div>
            {provided.state === 'hasValue' && provided.contents !== '0' && (
              <div className="bottom-4 right-4 block w-min md:absolute">
                <Loader loading={loading} fallback={<SmallActionCardLoading />}>
                  <SmallActionCard onClick={onWithdraw} text="Withdraw" />
                </Loader>
              </div>
            )}{' '}
          </div>
        </BigCard>
        <BigCard>
          <Title>Amount</Title>
          <div className="flex flex-col gap-3">
            <input
              className={`font-header w-full px-1 ${
                amountError
                  ? 'rounded border-2 border-accent'
                  : 'border-2 border-transparent border-b-white'
              } bg-card text-[52px] text-white outline-none`}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.valueAsNumber)}
            />
            {!amountError ? (
              <div className="flex flex-row items-center gap-2">
                <Image
                  layout="fixed"
                  src="/juno.png"
                  alt="juno logo"
                  width={16}
                  height={16}
                />
                <Mono>
                  Juno (={' '}
                  <Loader
                    loading={loading}
                    fallback={<ProvidedPercentLoading amount={amount} />}
                  >
                    <ProvidedPercent amount={amount} />% of TVL
                  </Loader>
                  )
                </Mono>
              </div>
            ) : (
              <Mono>{amountError}</Mono>
            )}
          </div>
        </BigCard>
      </CardRow>
      <CardRow>
        <Loader loading={loading} fallback={<TVLLoading />}>
          <TVL />
        </Loader>
        {!connected ? (
          <ActionCard onClick={connect}>
            <Title>Connect wallet</Title>
          </ActionCard>
        ) : !amountError ? (
          <Loader loading={loading} fallback={<LoadingExecuteCard />}>
            <ExecuteCard onClick={onProvide}>
              <Title>Provide</Title>{' '}
            </ExecuteCard>
          </Loader>
        ) : (
          <ActionCard striped>
            <Title>Provide</Title>
          </ActionCard>
        )}
      </CardRow>
    </Background>
  )
}

export default Provide
