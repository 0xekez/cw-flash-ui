import { selector } from 'recoil'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'

import { stargateClientRouter, cosmWasmClientRouter } from '../util/client'
import { CHAIN_RPC_ENDPOINT, GAS_PRICE } from '../util/constants'

import { keplrOfflineSignerSelector } from './keplr'

export const stargateClientSelector = selector({
  key: 'stargateClient',
  get: () => stargateClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const cosmWasmClientSelector = selector({
  key: 'cosmWasmClient',
  get: () => cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const signingCosmWasmClientSelector = selector({
  key: 'signingCosmWasmClient',
  get: async ({ get }) => {
    const signer = get(keplrOfflineSignerSelector)
    if (!signer) return

    return await SigningCosmWasmClient.connectWithSigner(
      CHAIN_RPC_ENDPOINT,
      signer,
      {
        gasPrice: GasPrice.fromString(GAS_PRICE),
      }
    )
  },
  // We have to do this because of how SigningCosmWasmClient
  // will update its internal chainId
  dangerouslyAllowMutability: true,
})

export const blockHeightSelector = selector({
  key: 'blockHeight',
  get: async ({ get }) => {
    const client = get(cosmWasmClientSelector)
    if (!client) return

    return await client.getHeight()
  },
})
