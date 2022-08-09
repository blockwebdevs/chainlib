<template>

  <div class="h-content">
    <v-img src="/Main-banner.jpeg" class="banner-search">
      <div class="banner-search-wrapper">
        <input type="text" class="search-input">
        <button></button>
      </div>
    </v-img>

    <v-container>
      <v-row>

        <v-col class="col-12">

          <div class="category-container">
<!--            {{ products }}-->
            <v-row>
              <v-col class="col-lg-12 col-12 mb-2"
                     v-for="(product, key) in products"
                     :key="key">

                <v-row class="product-item-wrapper">

                  <v-col class="col-lg-9 col-9 mb-2">
                    <h2 class="mb-4 product-name">
<!--                      <nuxt-link :to="`/ro/categories/${category.alias}/${item.product.alias}`" class="product">-->
                        {{ item.product.translation.name }}
<!--                      </nuxt-link>-->
                    </h2>
                    <p class="product-description" v-html="product.translation.body"></p>
                    <div class="product-properties-list">
                      <div class="product-properties-item"
                           v-for="(property, key) in filterProperties(properties)"
                           :key="key">
                        <b>{{ key }}:</b> {{ property }}
                      </div>
                    </div>
                  </v-col>

                  <v-col class="col-lg-3 col-3 mb-2">
<!--                    <nuxt-link :to="`/ro/categories/${category.alias}/${product.alias}`" class="product">-->
<!--                      <v-img-->
<!--                          :src="`https://back.soledynft.shop/images/products/sm/${product.main_image.src}`"></v-img>-->
<!--                    </nuxt-link>-->
                  </v-col>

                </v-row>

              </v-col>
            </v-row>

          </div>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import contentApi from '@/api/contentApi'
import FilterModal from '@/components/front/productWidgets/FilterModal.vue'
import SortModal from '@/components/front/productWidgets/SortModal.vue'
import NearBuyProductBtn from "~/components/front/near/NearBuyProductBtn"

export default {
  components: {FilterModal, SortModal, NearBuyProductBtn},
  async asyncData({app, params, store}) {
    let products = null;
    await contentApi.getAllProducts({lang: store.state.lang.lang, currency: store.state.currency.id}, data => {
      products = data
    })
    return {
      products: products
    }
  },
  watch: {
    async currency() {
      await contentApi.getAllProducts({
            lang: this.language.lang,
            currency: this.currency.id
          },
          data => {
            this.products = data
          }
      )
    },
  },
  data() {
    return {
      category: null,
      filterModal: false,
      sortModal: false,
    }
  },
  computed: mapGetters({
    categories: 'getCategories',
    language: 'getLanguage',
    currency: 'getCurrency',
    trans: 'getTranslations',
  }),
  async mounted() {
    this.$nuxt.$on('replaceProducts', data => {
      this.products = data
    })
  },
  methods: {}
}
</script>

<style lang="scss">
.marketplace-btn-area {
  padding-top: 20px;
  display: block;

  .btn-wrapper_1 {
    margin-left: 5px;
  }

  .buy-btn-area {
    display: flex;
    justify-content: space-between;

    button {
      background-color: #eddcd5 !important;
      width: auto !important;
      font-size: 13px;
      color: #734030 !important;
      padding: 6px !important;

      i {
        font-size: 14px;
      }
    }
  }
}

.product-properties-list {
  margin: 5px 5px 15px 5px;
  display: flex;
  justify-content: space-between;

  .product-properties-item {
    text-transform: none;
    display: inline-block;
    font-size: 13px;
    font-weight: bold;

    b {
      color: #5C591A;
      font-weight: normal;
    }
  }
}

.product-description {
  font-size: 14px;
  //color: #363636;
}

.product-name {
  //color: #363636;
}

.product-item-wrapper {
  background-color: hsla(0, 0%, 91%, 0.8);
  padding: 30px;
  margin-bottom: 20px;
}
</style>
