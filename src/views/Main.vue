<template>
  <div class="main">
    <div class="connect">
      <!-- <div v-if="true" class="connect__enter">
        <input class="connect__input" type="text" placeholder="Your wallet...">
        <button class="connect__button" >save</button>
      </div> -->
      <button class="connect__button" @click="test">connect wallet</button>
    </div>
    <h2>Amount</h2>
    <div class="amount">
        <input class="connect__input connect__input_amount" type="text" placeholder="Amount">
        <select class="amount__select" v-model="current_symbol">
          <option v-for="symbol in symbols" :key="symbol" :value="symbol">{{symbol}}</option>
        </select>
    </div>
    <h2>Address (recipient)</h2>
    <div class="recipient">
        <input class="connect__input connect__input_recipient" type="text" placeholder="Addres">
    </div>
    <h3>Your balance: {{current_balance.summ}}  {{current_balance.symbol}}</h3>
    <h3>Your allowance: -</h3>
    <div class="buttons">
        <button class="connect__button" >Get allowance</button>
        <button class="connect__button" >Approve</button>
        <button class="connect__button" >Transfer</button>
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
 getUserAddress
  } from '../../funcs'
import { ERC20 as ERC20Abi } from '../../abi'

// const Web4 = require('@cryptonteam/web4');


export default {
  name: 'Main',
  data() {
    return {
      symbols: [],      
      balances: [],
      current_balance: '',
      current_symbol: ''
    }
  },
  async created() {

    await connectNode()
    await getUserAddress()
    const symbol1 = await fetchContractData('symbol', ERC20Abi, '0x4b107a23361770534bd1839171bbf4b0eb56485c')
    this.symbols.push(symbol1)
    const symbol2 = await fetchContractData('symbol', ERC20Abi, '0xc13da4146d381c7032ca1ed6050024b4e324f4ef')
    this.symbols.push(symbol2)
    const symbol3 = await fetchContractData('symbol', ERC20Abi, '0x8d0c36c8842d1dc9e49fbd31b81623c1902b7819')
    this.symbols.push(symbol3)
    const symbol4 = await fetchContractData('symbol', ERC20Abi, '0xa364f66f40b8117bbdb772c13ca6a3d36fe95b13')
    this.symbols.push(symbol4)
    const name1 = await fetchContractData('name', ERC20Abi, '0x4b107a23361770534bd1839171bbf4b0eb56485c')
    const name2 = await fetchContractData('name', ERC20Abi, '0xc13da4146d381c7032ca1ed6050024b4e324f4ef')
    const name3 = await fetchContractData('name', ERC20Abi, '0x8d0c36c8842d1dc9e49fbd31b81623c1902b7819')
    const name4 = await fetchContractData('name', ERC20Abi, '0xa364f66f40b8117bbdb772c13ca6a3d36fe95b13')
    console.log('name', name1 + ', ' + name2 + ', ' + name3 + ', ' + name4)
    const bal1 = await getBalance(ERC20Abi, '0x4b107a23361770534bd1839171bbf4b0eb56485c')
    this.balances.push({summ: bal1, symbol: symbol1})
    const bal2 = await getBalance(ERC20Abi, '0xc13da4146d381c7032ca1ed6050024b4e324f4ef')
    this.balances.push({summ: bal2, symbol: symbol2})
    const bal3 = await getBalance(ERC20Abi, '0x8d0c36c8842d1dc9e49fbd31b81623c1902b7819')
    this.balances.push({summ: bal3, symbol: symbol3})
    const bal4 = await getBalance(ERC20Abi, '0xa364f66f40b8117bbdb772c13ca6a3d36fe95b13')
    this.balances.push({summ: bal4, symbol: symbol4})
    // console.log('balance', bal1 + ', ' + bal2 + ', ' + bal3 + ', ' + bal4)
    console.log(bal1)
    this.current_balance = this.balances[0]
    this.current_symbol = this.balances[0].symbol

  },

  methods: {
    test() {
      connectWallet()
    }
  },
  watch: {
    current_symbol() {
      let index = this.symbols.indexOf(this.current_symbol)
      
      // let new_current = balances[]
      this.current_balance = this.balances[index]
    }
  }
}
</script>
