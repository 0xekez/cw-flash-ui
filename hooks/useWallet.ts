import { useState, useCallback, useEffect } from 'react'
import { useSetRecoilState, useRecoilValueLoadable } from 'recoil'

import { keplrKeystoreIdAtom } from '../atoms/keplr'
import { isKeplrInstalled, getOfflineSignerAuto } from '../util/keplr'

import {
  walletAddressSelector,
  walletAccountNameSelector,
} from '../selectors/keplr'

import { walletNativeBalanceSelector } from '../selectors/wallet'

export const useWallet = () => {
  const setKeplrKeystoreId = useSetRecoilState(keplrKeystoreIdAtom)
  const [error, setError] = useState<string>()

  // Wallet address
  const { state: walletAddressState, contents: walletAddressContents } =
    useRecoilValueLoadable(walletAddressSelector)
  const address =
    walletAddressState === 'hasValue' ? walletAddressContents : undefined
  // Wallet account name
  const { state: walletAccountNameState, contents: walletAccountNameContents } =
    useRecoilValueLoadable(walletAccountNameSelector)
  const name =
    walletAccountNameState === 'hasValue'
      ? walletAccountNameContents
      : undefined
  // Wallet balance
  const {
    state: walletNativeBalanceState,
    contents: walletNativeBalanceContents,
  } = useRecoilValueLoadable(walletNativeBalanceSelector)
  const nativeBalance =
    walletNativeBalanceState == 'hasValue'
      ? walletNativeBalanceContents
      : undefined

  const refresh = useCallback(
    () => setKeplrKeystoreId((id) => id + 1),
    [setKeplrKeystoreId]
  )

  const connect = useCallback(async () => {
    // Set install message error if keplr not installed.
    if (!isKeplrInstalled()) {
      setKeplrKeystoreId(-1)
      return setError('Keplr is not installed.')
    }

    setError(undefined)

    // Attempt to connect and update keystore accordingly.
    try {
      await getOfflineSignerAuto()
      // If connection succeeds, propagate client to selector dependencies.
      refresh()
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : `${error}`)

      // Set disconnected so we don't try to connect again without manual action.
      setKeplrKeystoreId(-1)
    }
  }, [setKeplrKeystoreId, setError, refresh])

  // Listen for keplr keystore changes and update as needed.
  useEffect(() => {
    const keplrListener = () => {
      console.log('Keplr keystore changed, reloading client.')
      connect()
    }
    window.addEventListener('keplr_keystorechange', keplrListener)

    return () =>
      window.removeEventListener('keplr_keystorechange', keplrListener)
  }, [connect])

  const disconnect = useCallback(() => {
    setKeplrKeystoreId(-1)
  }, [setKeplrKeystoreId])

  return {
    connect,
    disconnect,
    refresh,
    error,
    address,
    name,
    nativeBalance,
    connected: !!address,
    installed: isKeplrInstalled(),
    loading: walletAddressState === 'loading',
  }
}
