import './App.css';
import { useConnectWallet } from '@web3-onboard/react';
import Navbar from './component/Navbar/Navbar';
import { useEffect, useState } from 'react';
import Task from './component/Task/Task';
import { ToastContainer } from 'react-toastify';
function App() {
  const [{ wallet }, connect] = useConnectWallet();
  const [isStake, setIsStake] = useState(true);
  // console.log('🚀 ~ wallet', wallet);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
    }
  });


  return (
    <>
      <ToastContainer />
      <Navbar isStake={isStake} setIsStake={setIsStake} />
      <Task />

    </>
  );
}

export default App;
