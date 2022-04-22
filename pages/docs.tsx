import type { NextPage } from 'next'

import { Background } from '../components/Background'
import { BigCard } from '../components/BigCard'
import { CardRow } from '../components/CardRow'
import { Header } from '../components/Header'
import { Title } from '../components/Title'
import { Mono } from '../components/Mono'
import { ActionCard } from '../components/ActionButton'
import { Address } from '../components/Address'
import { GitHub } from '../components/GitHub'
import { CONTRACT_ADDR } from '../util/constants'
import { Fee, FeeLoading } from '../components/Fee'
import { Loader } from '../components/Loader'

const Docs: NextPage = () => (
  <Background theme="docs">
    <Header title="Docs" />
    <CardRow>
      <BigCard>
        <Title>Loaning</Title>
        <Mono>
          To receive a loan provide a smart contract that has a `Receive {'{}'}`
          execute message variant.
        </Mono>
        <Mono>
          From the UI, select the amount of Juno you would like to receive and
          input the address of your contract.
        </Mono>
        <Mono>
          After execution your contract must return{' '}
          <Loader fallback={<FeeLoading />}>
            <Fee add={100} />
          </Loader>
          % of the Juno lent.
        </Mono>
      </BigCard>
      <div className="flex flex-col gap-5">
        <BigCard>
          <Title>Providing</Title>
          <Mono>
            The{' '}
            <Loader fallback={<FeeLoading />}>
              <Fee />
            </Loader>
            % loan fee is distributed among providers prportional to the amount
            of Juno they have provied.
          </Mono>
        </BigCard>
        <ActionCard>
          <Title>Loan contract</Title>
          <div className="flex flex-wrap gap-4 text-background">
            <a
              target="_blank"
              href="https://github.com/ezekiiel/cw-flash-ui"
              rel="noopener noreferrer"
            >
              <GitHub fill="currentColor" />
            </a>
            <Address address={CONTRACT_ADDR} />
          </div>
        </ActionCard>
      </div>
    </CardRow>
  </Background>
)

export default Docs
