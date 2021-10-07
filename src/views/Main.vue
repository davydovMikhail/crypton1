<template>
  <div class="main">
<button @click="test1"></button>
    <div class="connect">
      <button class="connect__button" @click="test">connect wallet</button>
    </div>
    <h2>Amount</h2>
    <div class="amount">
        <input class="amount__input amount__input_small" type="text" placeholder="Amount" v-model="amount">
        <select class="amount__select" v-model="currentToken">
          <option v-for="symbol in informationAboutTokens" :key="symbol.symbol" :value="symbol">{{symbol.symbol}}</option>
        </select>
    </div>
    <h2>Address (recipient)</h2>
    <div class="recipient">
        <input class="amount__input amount__input_big" type="text" placeholder="Addres" v-model="recipient">
    </div>
    <h3>Your balance: {{currentToken.bal }}  {{currentToken.symbol }}</h3>
    <h3>Your allowance: {{allowance}}</h3>
    <div class="buttons">
        <button class="connect__button" @click="getAllow">Get allowance</button>
        <button class="connect__button" @click="appr">Approve</button>
        <button class="connect__button" @click="send">Transfer</button>
    </div>
  </div>
</template>

<script>
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
      currentToken: {
        bal: "-",
        decimals: "",
        symbol: "Select currency"
      },
      informationAboutTokens: [],
      recipient: "",
      amount: "",
      allowance: "-"
    }
  },
  async created() {
    await connectNode()
    await getUserAddress()
    let aboutTokens = []
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
      if(!this.currentToken.decimals) {
        this.$vToastify.info("Select token")
      } else if(!this.amount) {
        this.$vToastify.info("Fill in the field with the amount")
      } else if(!this.recipient) {
        this.$vToastify.info("Fill in the field with the recipient")
      } else {
        let index = this.informationAboutTokens.indexOf(this.currentToken)
        approve(this.tokens[index], this.recipient, this.amount, ERC20Abi, this.currentToken.decimals)
      }
    },
    getAllow() {
      if(!this.currentToken.decimals) {
        this.$vToastify.info("Select token")
      } else if(!this.recipient) {
        this.$vToastify.info("Fill in the field with the recipient")
      } else {
        let index = this.informationAboutTokens.indexOf(this.currentToken)
        getAllowance(this.tokens[index], this.recipient, ERC20Abi, this.currentToken.decimals).then((result) => {this.allowance = result})
      }
      
    },
    send() {
      if(!this.currentToken.decimals) {
        this.$vToastify.info("Select token")
      } else if(!this.amount) {
        this.$vToastify.info("Fill in the field with the amount")
      } else if(!this.recipient) {
        this.$vToastify.info("Fill in the field with the recipient")
      } else {
        let index = this.informationAboutTokens.indexOf(this.currentToken)
        transfer(this.tokens[index], this.recipient, this.amount, ERC20Abi, this.currentToken.decimals)
      }
    },
    test1() {
      let index = this.informationAboutTokens.indexOf(this.currentToken)
      getEvents(ERC20Abi, this.tokens[index])
    }
  },
  
}
</script>
