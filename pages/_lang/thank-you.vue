<template>
  <main class="thank-you-area">
    <v-container class="text-center">
      <v-row>
        <v-col>
          <h2>Thank You for your order</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3></h3>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col><br>
          <p>we'll be back soon with a call</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col><br>
          <v-btn color="primary" :to="`/${language.lang}/`">
            <v-icon>mdi-home</v-icon>
            go back home
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import {mapGetters} from 'vuex'
import cartApi from '@/api/cartApi'

export default {
  data() {
    return {
      order: null,
    }
  },
  computed: mapGetters({
    language: 'getLanguage',
  }),
  mounted() {

    cartApi.getOrder(this.$route.query.order, res => {
      this.order = res
      console.log(res.cart.products);
    })
  }
}
</script>