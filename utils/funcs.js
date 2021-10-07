import Web4 from "@cryptonteam/web4"
import BigNumber from "bignumber.js";
var Web3 = require('web3');
BigNumber.config({ EXPONENTIAL_AT: 60 });

let userAddress
let web3Wallet
let web3Guest
let web4

export const getUserAddress = async () => {
  try {
    const { ethereum } = window; // ethereum - metamask
    
    web3Wallet = new Web3(ethereum); // init web3
   
    userAddress = await web3Wallet.eth.getCoinbase(); // получить адрес пользователя

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
      let chainId = await web3Wallet.eth.net.getId(); // запись сети
      if (+chainId !== 4) {
        console.log('current project work on rinkeby network')
        return false;
      }
  
      web4 = new Web4();
      await web4.setProvider(ethereum, userAddress);
  
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }

}

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
  let balance = await fetchContractData(
    'balanceOf',
    abi,
    token,
    [userAddress]
  )

  balance = new BigNumber(balance).shiftedBy(-decimals).toString()
  return balance
}

export const approve = async (token, recipient, amount, abi, decimals) => {
  try {
      const { ethereum } = window;
      web3Wallet = new Web3(ethereum);
      await ethereum.enable();

      web4 = new Web4();
      await web4.setProvider(ethereum, userAddress);

      const absErc20 = web4.getContractAbstraction(abi);
      const inst = await absErc20.getInstance(token);
      const total = new BigNumber(amount).shiftedBy(+decimals).toString();
      await inst.approve(recipient, total);
      return true;
  } catch (err) {
      console.log(err);
      return false;
  }
};

export const getAllowance = async (token, recipient, abi, decimals) => {
  let allowance = await fetchContractData('allowance', abi, token, [userAddress, recipient])
  allowance = new BigNumber(allowance).shiftedBy(-decimals).toString();
  return allowance
}

export const transfer = async (token, recipient, amount, abi, decimals) => {
  try {
      const { ethereum } = window;
      web3Wallet = new Web3(ethereum);
      await ethereum.enable();

      web4 = new Web4();
      await web4.setProvider(ethereum, userAddress);

      const absErc20 = web4.getContractAbstraction(abi);
      const inst = await absErc20.getInstance(token);
      const total = new BigNumber(amount).shiftedBy(+decimals).toString();
      await inst.transfer(recipient, total);
      return true;
  } catch (err) {
      console.log(err);
      return false;
  }
};

export const getEvents = async (abi, token) => {
  try {
    const { ethereum } = window;
    web3Wallet = new Web3(ethereum);
    await ethereum.enable();

    web4 = new Web4();
    await web4.setProvider(ethereum, userAddress);

    const absErc20 = web4.getContractAbstraction(abi);
    const inst = await absErc20.getInstance(token);

    let events = inst.contract.events.allEvents({
      fromBlock: '7600000',
      addresses: userAddress
      // to: userAddress,
      // from: userAddress
    }, (error, result) => {
      console.log("события",result);
      console.log("события2",events);
    });

    return true;
  } catch (err) {
      console.log(err);
      return false;
  }
}
