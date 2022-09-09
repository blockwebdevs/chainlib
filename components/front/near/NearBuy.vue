<template>
  <div>
    <v-btn color="body" class="mt-4" block @click="buy" v-if="currentUser">
      <v-icon>mdi-cart</v-icon>
      Buy with Near
    </v-btn>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Big from 'big.js';
import {getProducts} from "~/assembly/main";

export default {
  name: "NearBuyProductBtn",
  props: ['product'],
  data() {
    return {
      user: '',
      price: 0,
    }
  },
  computed: mapGetters({
    contract: 'near/getContract',
    currentUser: 'near/getCurrentUser',
    nearConfig: 'near/getNearConfig',
    walletConnection: 'near/getWalletConnection',
    language: 'getLanguage',
  }),
  mounted() {
    this.initContract();
  },
  methods: {
    ...mapActions({
      initContract: 'near/initContract'
    }),
    buy() {
      this.user = this.currentUser.accountId;
      // this.price = this.product.main_price.price;

      const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

      // console.log(this.contract)

      // const payload = {
      //   id: 'qwertyu',
      //   name: "Test name",
      //   description: "Test Description",
      //   image: "Test image",
      //   location: "Location",
      //   price: 20,
      //   sender: "chainlib.testnet"
      // }
      //
      // this.contract.setProduct({payload}
      //     // BOATLOAD_OF_GAS,
      //     // Big(this.price || '0').times(10 ** 24).toFixed()
      // )

      // const products = this.contract.getProducts();

      // console.log(products)
    }
  }
}
</script>