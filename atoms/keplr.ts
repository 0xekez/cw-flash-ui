import { atom, AtomEffect } from 'recoil'

import { CHAIN_ID } from '../util/constants'

export const getLocalStorageNamespacedKey = (key: string) =>
  `${CHAIN_ID}:${key}`

export const localStorageEffect =
  <T>(
    key: string,
    serialize: (value: T) => string,
    parse: (saved: string) => T
  ): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    // Do nothing on server.
    if (typeof localStorage === 'undefined') {
      return
    }

    // Namespace localStorage keys to prevent collisions.
    const namespacedKey = getLocalStorageNamespacedKey(key)

    const savedValue = localStorage.getItem(namespacedKey)
    if (savedValue !== null) setSelf(parse(savedValue))

    onSet((newValue: T, _: any, isReset: boolean) => {
      if (isReset) {
        localStorage.removeItem(namespacedKey)
      } else {
        localStorage.setItem(namespacedKey, serialize(newValue))
      }
    })
  }

export const keplrConnectedBeforeKey = 'keplrConnectedBefore'

export const keplrKeystoreIdAtom = atom({
  key: 'keplrKeystoreId',
  default: -1,
  effects: [
    // Store whether previously connected, but restart at 0 on each page load
    // instead of infinitely increment a value in their local storage.
    localStorageEffect(
      keplrConnectedBeforeKey,
      (id) => (id > -1).toString(),
      (saved) => (saved === 'true' ? 0 : -1)
    ),
  ],
})
