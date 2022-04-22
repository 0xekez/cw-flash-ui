export const isValidContractAddress = (
  address: string,
  chainPrefix: string
): boolean => {
  const bech32Regex = /^[a-km-zA-HJ-NP-Z0-9]{59}$/im
  if (!address?.length) {
    return false
  }
  if (!address.startsWith(chainPrefix)) {
    return false
  }
  const unprefixed = address.replace(chainPrefix, '')
  return !!unprefixed.match(bech32Regex)
}
