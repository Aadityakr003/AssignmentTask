import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {init} from '@web3-onboard/react';
import injectedModule,{ProviderLabel} from '@web3-onboard/injected-wallets';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Onboard from '@web3-onboard/core'
import walletConnectModule from '@web3-onboard/walletconnect'
import 'bootstrap/dist/js/bootstrap.bundle.min';

//wallet initialize
const injected = injectedModule({
displayUnavailable:[ProviderLabel.MetaMask]
});
const wcV2InitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: 'abc123...',
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1, 11155111],
  /**
   * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
   * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
   * To connect with WalletConnect
   */
  dappUrl: 'http://YourAwesomeDapp.com'
}
const walletConnect = walletConnectModule(wcV2InitOptions)



init({
  wallets: [injected,walletConnect],
  chains: [
    {
      // 0xaa36a7
      // 11155111
      id: '0xaa36a7',
      token: 'SepoliaETH',
      label: 'Sepolia Testnet',
      rpcUrl: 'https://sepolia.infura.io/v3/'
    }
  ],
  accountCenter: {
    mobile: {enabled: false},
    desktop: {enabled: false}
  },
  theme: 'dark'
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
