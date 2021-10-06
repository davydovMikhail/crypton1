<template>
  <div class="main">
<button @click="test1"></button>

    <div class="connect">
      <!-- <div v-if="true" class="connect__enter">
        <input class="connect__input" type="text" placeholder="Your wallet...">
        <button class="connect__button" >save</button>
      </div> -->
      <button class="connect__button" @click="test">connect wallet</button>
    </div>
    <h2>Amount</h2>
    <div class="amount">
        <input class="connect__input connect__input_amount" type="text" placeholder="Amount" v-model="amount">
        <select class="amount__select" v-model="current_token">
          <option v-for="symbol in informationAboutTokens" :key="symbol.symbol" :value="symbol">{{symbol.symbol}}</option>
        </select>
    </div>
    <h2>Address (recipient)</h2>
    <div class="recipient">
        <input class="connect__input connect__input_recipient" type="text" placeholder="Addres" v-model="recipient">
    </div>
    <h3>Your balance: {{current_token.bal }}  {{current_token.symbol }}</h3>
    <h3>Your allowance: -</h3>
    <div class="buttons">
        <button class="connect__button" @click="getAllow">Get allowance</button>
        <button class="connect__button" @click="appr">Approve</button>
        <button class="connect__button" @click="send">Transfer</button>
    </div>
  </div>
</template>

<script>
// import Web4 from "@cryptonteam/web4"
// var Web3 = require('web3');
// var BigNumber = require('big-number');
import { connectWallet,
 fetchContractData, 
 connectNode, 
 getBalance, 
 getUserAddress,
 approve,
 getAllowance,
 transfer,
 getEvents
  } from '../../funcs'
import { ERC20 as ERC20Abi } from '../../abi'

// const Web4 = require('@cryptonteam/web4');


export default {
  name: 'Main',
  data() {
    return {
      tokens: [
        '0x4b107a23361770534bd1839171bbf4b0eb56485c',
        '0xc13da4146d381c7032ca1ed6050024b4e324f4ef',
        '0x8d0c36c8842d1dc9e49fbd31b81623c1902b7819',
        '0xa364f66f40b8117bbdb772c13ca6a3d36fe95b13'
      ],     
      current_token: {
        bal: "-",
        decimals: "",
        symbol: "Select currency"
      },
      informationAboutTokens: [],
      recipient: "",
      amount: ""
    }
  },
  async created() {
    await connectNode()
    await getUserAddress()
    let aboutTokens = []
    // console.log('пустой массив', aboutTokens)
    this.tokens.forEach(async function(t) {
        let symbol = await fetchContractData('symbol', ERC20Abi, t)
        let decimals = await fetchContractData('decimals', ERC20Abi, t)
        let bal = await getBalance(ERC20Abi, t)
        let obj = {
          symbol,
          decimals,
          bal
        }
        aboutTokens.push(obj)
    });
    this.informationAboutTokens = aboutTokens
  },


  methods: {
    test() {
      connectWallet()
    },
    appr() {
      let index = this.informationAboutTokens.indexOf(this.current_token)
      console.log(this.tokens[index], this.recipient, this.amount, ERC20Abi, this.current_token.decimals)
      approve(this.tokens[index], this.recipient, this.amount, ERC20Abi, this.current_token.decimals)
    },
    getAllow() {
      let index = this.informationAboutTokens.indexOf(this.current_token)
      console.log(this.tokens[index], this.recipient, ERC20Abi)
      getAllowance(this.tokens[index], this.recipient, ERC20Abi, this.current_token.decimals)
      this
    },
    send() {
      let index = this.informationAboutTokens.indexOf(this.current_token)

      transfer(this.tokens[index], this.recipient, this.amount, ERC20Abi, this.current_token.decimals)
    },
    test1() {
      let index = this.informationAboutTokens.indexOf(this.current_token)
      getEvents(ERC20Abi, this.tokens[index])
    }
  },
  
}
</script>
