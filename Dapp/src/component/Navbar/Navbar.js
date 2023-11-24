import React, {useEffect} from 'react';
import './navbar.css';
import {useConnectWallet, useSetChain} from '@web3-onboard/react';
export default function Navbar(props) {
  const [{wallet, connecting}, connect, disconnect] = useConnectWallet();

  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain // boolean indicating if the chain is in the process of being set
    },
    setChain // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();
  const handleChain = async () => {
    try {
      await setChain({chainId: '0x89'});
      console.log('set', setChain);
    } catch (error) {
      console.log('🚀 ~ handleChain ~ error', error);
    }
  };
  useEffect(() => {
    console.log('my wallet', wallet);

    if (!wallet) {
      props?.setIsStake(false);
    }
    return () => {};
  }, [wallet]);

  return (
    <>
      {/* <button onClick={handleChain}>click</button> */}
      <nav
        className="navbar navbar-expand-lg  pb-3  mt-2 "
        style={{
          backgroundColor: 'black !important'
        }}
      >
        <div className="container-fluid">
          <div className="navbar-brand ps-5">
            <a href="/" className="text-decoration-none">
           
              <span className="text-white">Assignment Dapp</span>
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
           
          
           
              {/* <button disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
          {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
        </button> */}

              <li className="nav-item ">
                <div className="">
                  <button
                    className="wallet-button"
                    disabled={connecting}
                    onClick={() =>
                      wallet
                        ? connectedChain?.id === '0xaa36a7'
                          ? disconnect(wallet)
                          : setChain({chainId: '0xaa36a7'})
                        : connect()
                    }
                  >
                    {connecting ? (
                      'connecting'
                    ) : wallet ? (
                      <>
                        {connectedChain?.id === '0xaa36a7' ? (
                          <>
                            {wallet?.accounts[0]?.address.substring(0, 5)}...
                            {wallet?.accounts[0]?.address.substring(
                              38,
                              42
                            )}{' '}
                          </>
                        ) : (
                          'Switch Network'
                        )}
                      </>
                    ) : (
                      'Connect Wallet'
                    )}
                  </button>

                  {/* <button className="wallet-button" onClick={()=>disconnect(wallet)}>
                      {wallet?.accounts[0]?.address.substring(0, 5)}...
                      {wallet?.accounts[0]?.address.substring(38, 42)}{' '}
                    </button> */}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
