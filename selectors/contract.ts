import { selector, atom, selectorFamily } from 'recoil'

import { cosmWasmClientSelector } from './chain'

import { CONTRACT_ADDR, FEE_DENOM, USDC_SWAP_ADDR } from '../util/constants'

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

export const providedSelector = selectorFamily<string, string>({
  key: 'walletProvidedSelector',
  get:
    (address) =>
    async ({ get }) => {
      get(stateUpdatesAtom)
      const client = get(cosmWasmClientSelector)

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
      if (!client || !USDC_SWAP_ADDR) return '0'

      const junoUSD = (
        await client.queryContractSmart(
          // Juno UST pool on Junoswap.
          USDC_SWAP_ADDR,
          { token1_for_token2_price: { token1_amount: '1000000' } }
        )
      ).token2_amount

      return (Number(junoUSD) * Math.pow(10, -12) * Number(juno)).toString()
    },
})
