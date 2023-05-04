import Web3 from 'web3'
import configuration from '../../../build/contracts/Marketplace.json';
import bearConfig from '../../../build/contracts/BearNft.json';
import squirrelConfig from '../../../build/contracts/SquirrelNft.json';

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

export const web3 = new Web3('http://127.0.0.1:7545');
export const marketplaceContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS, {
  from: '0xFf02c74586E2a627064d086364413280476b87eC'
});


const BEAR_CONTRACT_ADDRESS = bearConfig.networks['5777'].address;
const BEAR_CONTRACT_ABI = bearConfig.abi;
export const bearContract = new web3.eth.Contract(BEAR_CONTRACT_ABI, BEAR_CONTRACT_ADDRESS);


const SQUIRREL_CONTRACT_ADDRESS = squirrelConfig.networks['5777'].address;
const SQUIRREL_CONTRACT_ABI = squirrelConfig.abi;
export const squirrelContract = new web3.eth.Contract(SQUIRREL_CONTRACT_ABI, SQUIRREL_CONTRACT_ADDRESS);