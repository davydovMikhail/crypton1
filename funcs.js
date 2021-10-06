import Web4 from "@cryptonteam/web4"
import BigNumber from "bignumber.js";
var Web3 = require('web3');
// var BigNumber = require('big-number');
// import { ERC20 as ERC20Abi } from '../../abi'
// import { ERC20 as ERC20Abi } from '/abi'

// const Web4 = require('@cryptonteam/web4');


// async connectWallet() {

let userAddress
let web3Wallet


export const getUserAddress = async () => {
  try {
    const { ethereum } = window; // ethereum - metamask
    if (!ethereum) {
      console.log('metamask is not install')
      return false;
    }
    web3Wallet = new Web3(ethereum); // init web3
    if (await web3Wallet.eth.getCoinbase() === null) { // проверяем подключен ли metamask
      await ethereum.enable(); // подключить metamask
    }

    userAddress = await web3Wallet.eth.getCoinbase(); // получить адрес пользователя
    console.log(userAddress)

  } catch (err) {
    console.log(err);
    return false;
  }
}




export const connectWallet = async () => {

    try {
      const { ethereum } = window; // ethereum - metamask
      if (!ethereum) {
        console.log('metamask is not install')
        return false;
      }
      web3Wallet = new Web3(ethereum); // init web3
      if (await web3Wallet.eth.getCoinbase() === null) { // проверяем подключен ли metamask
        await ethereum.enable(); // подключить metamask
      }
      userAddress = await web3Wallet.eth.getCoinbase(); // получить адрес пользователя
      console.log(userAddress)
      let chainId = await web3Wallet.eth.net.getId(); // запись сети
      if (+chainId !== 4) {
        console.log('current project work on rinkeby network')
        return false;
      }
  
      let web4 = new Web4();
      await web4.setProvider(ethereum, userAddress);
  
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  
  
  
}

let web3Guest

export const connectNode = () => {
    try {
      let bscUrl
      if (process.env.IS_MAINNET === 'true') {
        bscUrl = 'https://rinkeby.infura.io/v3/bf6438abd38f4772a8e9f86569452673'
      } else {
        bscUrl = 'wss://rinkeby.infura.io/ws/v3/bf6438abd38f4772a8e9f86569452673'
      }
      const provider = new Web3.providers.WebsocketProvider(bscUrl)
      web3Guest = new Web3(provider)
      return true
    } catch (e) {
      return false
    }
  }


export const fetchContractData = async (method, abi, address, params) => {
    try {
      const contract = new web3Guest.eth.Contract(abi, address)
      return await contract.methods[method].apply(this, params).call()
      
    } catch (e) {
      console.log(e)
      return ''
    }
  } 


export const getBalance = async (abi, token) => {
  const decimals = await fetchContractData('decimals', abi, token)
  // userAddress = await web3Wallet.eth.getCoinbase();
  console.log(decimals)
  console.log(userAddress)
  let balance = await fetchContractData(
    'balanceOf',
    abi,
    token,
    [userAddress]
  )
  console.log(balance)

  balance = new BigNumber(balance).shiftedBy(-decimals).toString()
  console.log('balance', balance.toString())
  return balance
}

