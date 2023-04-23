import Web3 from 'web3'
import configuration from '../../../build/contracts/Tickets.json';

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

export const web3 = new Web3('http://127.0.0.1:7545');
export const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);