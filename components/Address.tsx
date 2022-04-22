import { FC, useState } from 'react'

import { Mono } from './Mono'

import { DuplicateIcon, CheckCircleIcon } from '@heroicons/react/outline'

export interface AddressProps {
  address: string
}

const displayableAddress = (address: string) => {
  const first = address.slice(0, 12)
  const last = address.substring(address.length - 7)
  return `${first}...${last}`
}

export const Address: FC<AddressProps> = ({ address }) => {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      className="flex flex-row items-center gap-2"
      onClick={() => {
        navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
    >
      {copied ? (
        <CheckCircleIcon className="w-6 text-background" />
      ) : (
        <DuplicateIcon className="w-6 text-background" />
      )}
      <Mono>{displayableAddress(address)}</Mono>
    </button>
  )
}
