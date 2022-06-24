import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import {
  ChainInfoID,
  WalletManagerProvider,
  WalletType,
} from '@noahsaso/cosmodal'
import { GasPrice } from '@cosmjs/stargate'

const LOCAL_STORAGE_KEY = 'connectedWalletId'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletManagerProvider
      walletConnectClientMeta={{
        name: 'cw-flash-ui',
        description: 'An example frontend for CosmWasm flash loans.',
        url: 'https://cw-flash-ui.vercel.app',
        icons: ['https://moonphase.is/image.svg'],
      }}
      enabledWalletTypes={[WalletType.Keplr, WalletType.WalletConnectKeplr]}
      renderLoader={() => <p>Loading...</p>}
      localStorageKey={LOCAL_STORAGE_KEY}
      defaultChainId={ChainInfoID.Juno1}
      getSigningCosmWasmClientOptions={(chainInfo) => ({
        gasPrice: GasPrice.fromString(
          '0.0025' + chainInfo.feeCurrencies[0].coinMinimalDenom
        ),
      })}
      getSigningStargateClientOptions={(chainInfo) => ({
        gasPrice: GasPrice.fromString(
          '0.0025' + chainInfo.feeCurrencies[0].coinMinimalDenom
        ),
      })}
    >
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </WalletManagerProvider>
  )
}

export default MyApp
