import { selector, atom, selectorFamily } from 'recoil'

import { cosmWasmClientSelector } from './chain'

import { CONTRACT_ADDR, FEE_DENOM, UST_SWAP_ADDR } from '../util/constants'
import { convertMicroDenomToDenom } from '../util/conversion'
import { walletAddressSelector } from './keplr'

export const stateUpdatesAtom = atom({
  key: 'stateUpdatesAtom',
  default: 0,
})

export const nativeTVLSelector = selector({
  key: 'junoTVLSelector',
  get: async ({ get }) => {
    get(stateUpdatesAtom)
    const client = get(cosmWasmClientSelector)
    const locked = await client.getBalance(CONTRACT_ADDR, FEE_DENOM)
    return locked.amount
  },
})

export const feeSelector = selector({
  key: 'feeSelector',
  get: async ({ get }) => {
    get(stateUpdatesAtom)
    const client = get(cosmWasmClientSelector)
    const config = await client.queryContractSmart(CONTRACT_ADDR, {
      get_config: {},
    })
    return config.fee
  },
})

export const walletProvidedSelector = selector({
  key: 'walletProvidedSelector',
  get: async ({ get }) => {
    get(stateUpdatesAtom)
    const client = get(cosmWasmClientSelector)
    const address = get(walletAddressSelector)
    if (!address) {
      return '0'
    }
    const provided = client.queryContractSmart(CONTRACT_ADDR, {
      provided: { address },
    })
    return provided
  },
})

export const USTValueSelector = selectorFamily({
  key: 'USTValueSelector',
  get:
    (juno: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)
      try {
        const resp = await client.queryContractSmart(UST_SWAP_ADDR, {
          token1_amount: juno,
        })
        return resp.token2_amount
      } catch (_) {
        // TODO(zeke): remove once on mainnet.
        return (convertMicroDenomToDenom(juno) * 14.81).toString()
      }
    },
})
