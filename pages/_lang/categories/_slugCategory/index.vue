<template>

  <div class="h-content">
    <v-img src="/Main-banner.jpeg" class="banner-search">
      <div class="banner-search-wrapper">
        <input type="text" class="search-input">
        <button></button>
      </div>
    </v-img>

    <v-container v-if="category">

      <!--      <v-navigation-drawer v-model="filterModal" fixed color="body" temporary>-->
      <!--        <filter-modal @closeFilterModal="closeFilterModal" :category="category"/>-->
      <!--      </v-navigation-drawer>-->

      <!--      <v-navigation-drawer v-model="sortModal" fixed color="body" temporary>-->
      <!--        <sort-modal @closeSortModal="closeSortModal" :category="category"/>-->
      <!--      </v-navigation-drawer>-->

      <v-row>
        <v-col cols="12">
          <h3 class="c-title title-olive mt-3">{{ category.translation.name }}</h3>
        </v-col>

        <v-col class="col-12">

          <div class="category-container">
            <!--                        <div class="filter">-->
            <!--                          <v-btn large @click="openFilterModal">-->
            <!--                            <v-icon color="title" class="mr-2">mdi-filter</v-icon>-->
            <!--                            Filter-->
            <!--                          </v-btn>-->
            <!--                          <v-btn large @click="openSortModal">-->
            <!--                            <v-icon color="title" class="mr-2">mdi-sort</v-icon>-->
            <!--                            Sort-->
            <!--                          </v-btn>-->
            <!--                        </div>-->

            <v-row>

              <v-col class="col-lg-12 col-12 mb-2"
                     v-for="(item, key) in products"
                     :key="key"
                     v-if="item.product.main_image">

                <v-row class="product-item-wrapper">

                  <v-col class="col-lg-9 col-9 mb-2">
                    <h2 class="mb-4 product-name">
                      <nuxt-link :to="`/ro/marketplace/${item.product.alias}`" class="product">
                        {{ item.product.translation.name }}
                      </nuxt-link>
                    </h2>
                    <p class="product-description" v-html="item.product.translation.body"></p>
                    <div class="product-properties-list">
                      <div class="product-properties-item"
                           v-for="(property, key) in filterProperties(item.properties)"
                           :key="key">
                        <b>{{ key }}:</b> {{ property }}
                      </div>
                    </div>

                    <v-row>
                      <v-col>
                        <div class="collectionOne__price price">
                          <span>{{ item.product.personal_price.price }}</span>
                          <span
                              v-if="item.product.personal_price.old_price > item.product.personal_price.price">/</span>
                          <span class="price__discount"
                                v-if="item.product.personal_price.old_price > item.product.personal_price.price">
                              {{ item.product.personal_price.old_price }}
                        </span>
                          <span>{{ currency.abbr }}</span>
                        </div>
                      </v-col>
                      <v-col>
                        <near-buy-sub-product-btn :product="item.product"></near-buy-sub-product-btn>
                      </v-col>
                    </v-row>

                  </v-col>

                  <v-col class="col-lg-3 col-3 mb-2">
                    <nuxt-link :to="`/ro/marketplace/${item.product.alias}`" class="product">
                    <v-img
                        :src="`https://back.soledynft.shop/images/products/sm/${item.product.main_image.src}`"></v-img>
                    </nuxt-link>
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
    let categ = null;
    let products = null;
    await contentApi.getMarketplaceCategory({
      lang: store.state.lang.lang,
      alias: 'nfts',
      currency: store.state.currency.id
    }, data => {
      categ = data.category
      products = data.products
    })
    return {
      category: categ,
      products: products
    }
  },
  watch: {
    async currency() {
      await contentApi.getMarketplaceCategory({
            lang: this.language.lang,
            alias: this.category.alias,
            currency: this.currency.id
          },
          data => {
            this.category = data
            this.products = this.category.products
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

    this.$nuxt.$on('resetFilter', () => {
      contentApi.getMarketplaceCategory({
        lang: this.language.lang,
        alias: this.category.alias,
        currency: this.currency.id
      }, data => {
        this.category = data
        this.products = this.category.products
      })
    })
  },
  methods: {
    filterProperties(properties) {
      return Object.assign(
          ...Object
              .keys(properties)
              .slice(0, 2)
              .map(k => ({[k]: properties[k]}))
      );
    },
    openFilterModal() {
      this.filterModal = true
    },
    closeFilterModal() {
      this.filterModal = false
    },
    openSortModal() {
      this.sortModal = true
    },
    closeSortModal() {
      this.sortModal = false
    }
  }
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