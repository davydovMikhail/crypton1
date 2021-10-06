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
        <select class="amount__select">
          <option value="">qwer</option>
          <option value="">qwer</option>
          <option value="">qwe</option>
          <option value="">qweqwe</option>
        </select>
    </div>
    <h2>Address (recipient)</h2>
    <div class="recipient">
        <input class="connect__input connect__input_recipient" type="text" placeholder="Addres">
    </div>
    <h3>Your balance: 1000</h3>
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
 start
//  getUserAddress
  } from '../../funcs'
import { ERC20 as ERC20Abi } from '../../abi'

// const Web4 = require('@cryptonteam/web4');


export default {
  name: 'Main',
  data() {
    return {
    }
  },
  async created() {

    await connectNode()
    await start()
    // await getUserAddress()
    const symbol1 = await fetchContractData('symbol', ERC20Abi, '0x4b107a23361770534bd1839171bbf4b0eb56485c')
    const symbol2 = await fetchContractData('symbol', ERC20Abi, '0xc13da4146d381c7032ca1ed6050024b4e324f4ef')
    const symbol3 = await fetchContractData('symbol', ERC20Abi, '0x8d0c36c8842d1dc9e49fbd31b81623c1902b7819')
    const symbol4 = await fetchContractData('symbol', ERC20Abi, '0xa364f66f40b8117bbdb772c13ca6a3d36fe95b13')
    console.log('symbol', symbol1 + ', ' + symbol2 + ', ' + symbol3 + ', ' + symbol4)
    const name1 = await fetchContractData('name', ERC20Abi, '0x4b107a23361770534bd1839171bbf4b0eb56485c')
    const name2 = await fetchContractData('name', ERC20Abi, '0xc13da4146d381c7032ca1ed6050024b4e324f4ef')
    const name3 = await fetchContractData('name', ERC20Abi, '0x8d0c36c8842d1dc9e49fbd31b81623c1902b7819')
    const name4 = await fetchContractData('name', ERC20Abi, '0xa364f66f40b8117bbdb772c13ca6a3d36fe95b13')
    console.log('name', name1 + ', ' + name2 + ', ' + name3 + ', ' + name4)
    // const decimals1 = await fetchContractData('decimals', ERC20Abi, '0x4b107a23361770534bd1839171bbf4b0eb56485c')
    // const decimals2 = await fetchContractData('decimals', ERC20Abi, '0xc13da4146d381c7032ca1ed6050024b4e324f4ef')
    // const decimals3 = await fetchContractData('decimals', ERC20Abi, '0x8d0c36c8842d1dc9e49fbd31b81623c1902b7819')
    // const decimals4 = await fetchContractData('decimals', ERC20Abi, '0xa364f66f40b8117bbdb772c13ca6a3d36fe95b13')
    // console.log('decimals', decimals1 + ', ' + decimals2 + ', ' + decimals3 + ', ' + decimals4)
    const bal1 = await getBalance(ERC20Abi, '0x4b107a23361770534bd1839171bbf4b0eb56485c')
    // const bal2 = await getBalance(ERC20Abi, '0xc13da4146d381c7032ca1ed6050024b4e324f4ef')
    // const bal3 = await getBalance(ERC20Abi, '0x8d0c36c8842d1dc9e49fbd31b81623c1902b7819')
    // const bal4 = await getBalance(ERC20Abi, '0xa364f66f40b8117bbdb772c13ca6a3d36fe95b13')
    // console.log('balance', bal1 + ', ' + bal2 + ', ' + bal3 + ', ' + bal4)
    console.log(bal1)

  },

  methods: {

    test() {
      connectWallet()
    }

  }
}
</script>
