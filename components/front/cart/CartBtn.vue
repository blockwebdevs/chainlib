<template>
  <v-btn outlined
         color="primary"
         @click="addToCart()"
         class="ml-4">
    <v-icon>mdi-cart</v-icon>
    Add to cart
  </v-btn>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
  props: ['product', 'subproduct', 'type'],
  computed: mapGetters({
    cart: 'cart/getCart',
    total: 'cart/getTotal',
    userCartId: 'cart/getUserCartId',
    language: 'getLanguage',
    currency: 'getCurrency',
  }),
  methods: {
    ...mapActions({
      appendToCart: 'cart/appendToCart',
    }),
    addToCart() {
      // if (this.type === 'prod') {
        this.appendToCart({
          userId: this.userCartId,
          productId: this.product.id,
          lang: this.language.lang,
          currency: this.currency.id
        })
      // }
    }
  }
}
</script>

<style>

</style>