import {ethers} from 'ethers';
import {ContractAbi, ContractAddr} from './Contract';




export const contractInstance = async (provider) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const etherSigner = etherProvider?.getSigner();
  const ContractInst = new ethers.Contract(
    ContractAddr,
    ContractAbi,
    etherSigner
  );
  return ContractInst;
};

