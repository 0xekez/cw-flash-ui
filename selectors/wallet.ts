import { selectorFamily } from 'recoil'

import { FEE_DENOM } from '../util/constants'

import { stargateClientSelector } from './chain'

export const nativeBalanceSelector = selectorFamily<number | undefined, string>(
  {
    key: 'walletNativeBalance',
    get:
      (walletAddress) =>
      async ({ get }) => {
        const client = get(stargateClientSelector)
        if (!client) return

        const balance = await client.getBalance(walletAddress, FEE_DENOM)
        return Number(balance.amount)
      },
  }
)
