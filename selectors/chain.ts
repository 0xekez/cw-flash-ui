import { selector } from 'recoil'

import { stargateClientRouter, cosmWasmClientRouter } from '../util/client'
import { CHAIN_RPC_ENDPOINT } from '../util/constants'

export const stargateClientSelector = selector({
  key: 'stargateClient',
  get: () => stargateClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const cosmWasmClientSelector = selector({
  key: 'cosmWasmClient',
  get: () => cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const blockHeightSelector = selector({
  key: 'blockHeight',
  get: async ({ get }) => {
    const client = get(cosmWasmClientSelector)
    if (!client) return

    return await client.getHeight()
  },
})
