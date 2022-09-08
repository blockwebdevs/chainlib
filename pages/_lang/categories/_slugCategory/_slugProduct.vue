<template>
  <div class="oneProduct-content" v-if="product">

    <v-img src="/Main-banner.jpeg" class="banner-search">
      <div class="banner-search-wrapper">
        <input type="text" class="search-input">
        <button></button>
      </div>
    </v-img>

    <v-container>
      <v-row>
        <v-col class="col-12">
          <div class="productOne mt-6">
            <v-row class="justify-space-between">
              <v-col class="col-lg-4 col-12">
                <div class="slider-img-wrap">
                  <slider-one-product :images="product.images"
                                      @openZoom="openZoom"
                                      :productImages="product.images"
                                      path="products"/>
                </div>
              </v-col>
              <v-col class="col-lg-8 col-12 book-property-area">
                <h2 class="productOne__name">{{ product.translation.name }}</h2>
                <p class="productOne__price mb-4" v-if="thing.length > 0">
                  {{ parsePrice(thing) }}
                  <!--                  {{ product.personal_price.price }}-->
                  <!--                  <span v-if="product.personal_price.old_price > product.personal_price.price">/</span>-->
                  <!--                  <span class="price__discount" v-if="product.personal_price.old_price > product.personal_price.price">-->
                  <!--                  {{ product.personal_price.old_price }}-->
                  <!--                </span>-->
                  {{ currency.abbr }}
                </p>

                <v-btn outlined color="primary"
                       :href="`https://testnet.mintbase.io/thing/${product.translation.description}/auction?tokenId=23:art.mintspace2.testnet`"
                       target="_blank"
                       class="mr-20">
                  <v-icon>mdi-label</v-icon>
                  Make Offer
                </v-btn>

                <v-btn outlined color="primary"
                       :href="`https://testnet.mintbase.io/thing/${product.translation.description}`"
                       target="_blank" class="ml-20">
                  <v-icon>mdi-cart</v-icon>
                  Buy with near
                </v-btn>

<!--                <a v-if="product.translation.description"-->
<!--                   outlined color="primary"-->
<!--                   :href="`https://testnet.mintbase.io/thing/${product.translation.description}/auction?tokenId=23:art.mintspace2.testnet`"-->
<!--                   target="_blank">Make Offer</a>-->

<!--                <a v-if="product.translation.description"-->
<!--                   :href="`https://testnet.mintbase.io/thing/${product.translation.description}`"-->
<!--                   target="_blank">Buy with near</a>-->

                <!--                <sizes :product="product" v-if="product.subproducts.length"/>-->
                <!--                <div class="mt-4" v-else>-->
                <!--                  <near-buy-sub-product-btn :product="product"></near-buy-sub-product-btn>-->
                <!--                </div>-->

                <v-expansion-panels focusable
                                    v-model="panel"
                                    :readonly="readonly"
                                    multiple>

                  <v-expansion-panel v-if="properties">
                    <v-expansion-panel-header>Properties</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <properties-area :properties="properties"></properties-area>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel v-if="thing.length">
                    <v-expansion-panel-header>Details</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <details-area :thing="thing" v-if="thing.length > 0"></details-area>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

<!--                  <v-expansion-panel v-if="offers.length">-->
<!--                    <v-expansion-panel-header>Offers</v-expansion-panel-header>-->
<!--                    <v-expansion-panel-content>-->
<!--                      <offers-area :offers="offers" v-if="offers.length"></offers-area>-->
<!--                    </v-expansion-panel-content>-->
<!--                  </v-expansion-panel>-->

                </v-expansion-panels>

              </v-col>
              <v-col class="col-lg-12 col-12" v-if="product.translation.body">
                <about-area :text="product.translation.body"></about-area>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col class="col-12 mt-lg-8">
          <v-row>
            <v-col class="col-12 mt-lg-8" v-if="similar.length">
              <h3 class="additional-title">Similar books:</h3>
              <similar-slider :similars="similar"/>
            </v-col>
          </v-row>
        </v-col>

      </v-row>
    </v-container>

  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import contentApi from '@/api/contentApi'
import userApi from "~/api/userApi";
import SliderOneProduct from '@/components/front/sliders/SliderOneProduct.vue'
import similarSlider from '@/components/front/sliders/SimilarCarousel.vue'
import CartBtn from '~/components/front/cart/CartBtn.vue'
import Sizes from '@/components/front/productWidgets/Sizes.vue'
import Zoom from '@/components/front/productWidgets/Zoom.vue'
import NearBuyProductBtn from "~/components/front/near/NearBuyProductBtn"
import NearBuySubProductBtn from "~/components/front/near/NearBuySubProductBtn";
import PropertiesArea from "@/components/front/productWidgets/marketplace/PropertiesArea";
import OffersArea from "~/components/front/productWidgets/marketplace/OffersArea";
import AboutArea from "~/components/front/productWidgets/marketplace/AboutArea";
import DetailsArea from "~/components/front/productWidgets/marketplace/DetailsArea";
import gql from 'graphql-tag'

const THING_QUERY = gql`
  query THING_QUERY($id: String!) {
    thing (where: {id: {_eq: $id}}) {
       id
       storeId
    metadata {
      title
      description
      tags
      media
      category
      external_url
    }
    tokens {
      id
      minter
      ownerId
      list {
        contractId
        price
        contractId
        ownerId
      }
    }
  }
  }
`;

export default {
  components: {
    NearBuySubProductBtn,
    SliderOneProduct,
    similarSlider,
    Sizes,
    Zoom,
    CartBtn,
    NearBuyProductBtn,
    PropertiesArea,
    OffersArea,
    AboutArea,
    DetailsArea
  },
  async asyncData({app, params, store}) {
    const client = app.apolloProvider.defaultClient;
    let prod = null
    let similar = []
    let properties = []
    let offers = []
    let thingMB = [];

    await contentApi.getProduct({
      lang: store.state.lang.lang,
      alias: params.slugProduct,
      currency: store.state.currency.id
    }, data => {
      // console.log(data)
      prod = data.product
      similar = data.similars
      properties = data.properties
      offers = data.offers
    })

    // const id = 'eztziXSDJ0pdkIo7Zgk9X-YrisItu7GkC5BHS23iRl8:art.mintspace2.testnet';

    console.log(prod.translation.description, 'gere')

    if (prod.translation.description) {
      const id = prod.translation.description;

      const res = await client.query({
        query: THING_QUERY,
        variables: {id},
      })

      const {thing} = res.data;
      thingMB = thing
    }

    return {
      similar,
      product: prod,
      productImages: prod.images,
      properties: properties,
      offers: offers,
      thing: thingMB
    }
  },
  watch: {
    async currency() {
      await contentApi.getProduct({
        lang: this.language.lang,
        alias: this.product.alias,
        currency: this.currency.id
      }, data => {
        this.product = data.product
        this.similar = data.similar
        this.offers = data.offers
        this.properties = data.properties
        this.productImages = this.product.images
      })
    },
  },
  computed: mapGetters({
    categories: 'getCategories',
    language: 'getLanguage',
    currency: 'getCurrency',
    trans: 'getTranslations',
  }),
  data() {
    return {
      product: null,
      productImages: [],
      zoom: false,
      mainImage: null,
      panel: [0, 1, 2, 3],
      readonly: false
    }
  },
  async mounted() {
    this.$nuxt.$on('update-product-offers', data => {
      this.updateOffers();
    });
  },
  methods: {
    parsePrice(thing) {
      if (thing.length > 0) {
        if (thing[0].tokens.length > 0) {
          if (thing[0].tokens[0].list) {
            if (thing[0].tokens[0].list.price) {
              let price = thing[0].tokens[0].list.price.toString()
              let x = price.split('e')
              let y = x[1].split('+')

              y = y.filter(element => {
                return element !== '';
              });

              y = y[0] - 24
              x = x[0]

              const number = x * Math.pow(10, y)

              return parseFloat(number)
            }
          }
        }
      }

      return 0;
    },
    updateOffers() {
      const data = {
        productId: this.product.id,
        lang: this.language.lang,
        currency: this.currency.id
      };
      userApi.getOffers(data, async response => {
        this.offers = response.data
      })
    }
    ,
    openZoom(image) {
      this.mainImage = image
      this.zoom = true
    }
  }
}
</script>

<style lang="scss">
.buyOn__methods {
  .v-btn--icon.v-size--default {
    width: auto !important;
  }
}

.productOne__bloc {
  .v-application p {
    padding: 0;
  }
}

.oneProduct-content {
  max-width: 1500px;
}

.moreProducts {
  border: 2px solid $main-color;
  padding: 15px;
  margin-bottom: 20px;

  span {
    color: $main-color;
  }

  .v-btn {
    width: 100%
  }

  .row {
    align-items: center;
  }
}

.help {
  align-items: center;
  color: $main-color;
  font-size: 12px;
  margin-top: 20px;

  .col {
    padding: 0 10px;
  }

  span {
    padding-bottom: 15px;
  }

  .v-btn {
    display: flex;
    margin-bottom: 0 !important;
  }

  .v-icon {
    margin-right: 5px;
  }
}

.productOne {
  &__name {
    font-family: $font-titles;
    font-size: 30px;
    color: $olive-color;
    letter-spacing: 0;
    line-height: 17px;
    text-align: left;
    text-transform: uppercase;
    margin-top: 0px;
    line-height: 1.5;
  }

  &__price {
    margin-top: 10px;
    text-transform: uppercase;
    font-size: 18px;
    font-family: $font-roboto;
    font-weight: 400;
    color: $main-color;
  }

  &__discount {
    position: absolute;
    top: -40px;
    right: 0;
    width: 100px;
    height: 100px;
    // background-image: url("./static/discountIcon.png");
    background-size: 110%;
    background-position: center center;
    font-family: $font-text-bold;
    font-size: 25px;
    color: $red-color;
    padding-left: 20px;
    letter-spacing: 0.04px;
    line-height: 1.2;
    text-align: center;
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    padding-top: 20px;
  }

  &__by {
    color: $main-color;
    font-size: 12px;
  }

  &__exp {
    padding: 0;

    &::before {
      box-shadow: none;
    }

    div {
      padding: 0 !important;
    }
  }

  .v-expansion-panel,
  .v-expansion-panel__header {
    background-color: #FFF !important;
  }

  .v-expansion-panel-content__wrap {
    padding: 0 15px !important;
  }

  &__exp &__bloc-text {
    padding: 0;
  }

  &__exp-header {
    color: $olive-color;
    padding: 0;
    text-transform: uppercase;
  }

  &__bloc {
    padding-top: 10px;
    margin-bottom: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  &__bloc-text {
    font-family: $font-roboto;
    font-size: 13px;
    line-height: 1.7;
    text-align: left;
    color: $main-color;
    font-weight: 300;
    padding: 0 24px 0;

    a {
      text-decoration: underline;
    }
  }

  &__bloc-title {
    color: $olive-color;
    padding: 0;
    font-size: 0.9375rem;
    line-height: 1;
    min-height: 30px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
  }

  .v-btn.body {
    color: $main-color !important;
  }

  .v-btn {
    margin-bottom: 15px;

    .cart-icon {
      width: 15px;
      margin-left: 10px;
      margin-bottom: 6px;
    }
  }
}

.p-title {
  text-align: left;
  color: $main-color;
  font-family: $font-titles;
  font-size: 25px;
  letter-spacing: -0.11px;
  text-align: center;
  text-transform: uppercase;
  line-height: 1.3;
}

.p-subtitle {
  text-align: center;
  font-size: 20px;
  color: $olive-color;
  letter-spacing: -0.11px;
  font-family: $font-titles;
}

.prof {
  padding-bottom: 15px;

  &__iamge {
    position: relative;
  }

  &__indicator {
    position: absolute;
    top: 35px;
    left: 35px;
  }

  .v-card__actions {
    display: flex;
    justify-content: center;
  }

  .v-btn {
    border-radius: 9px !important;
  }
}

.v-input--selection-controls {
  margin-top: 5px;
}

.productOne .exp__point {
  color: $main-color;
  margin-bottom: 10px;
  position: relative;
  margin-left: 10px !important;

  &:after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: $main-color;
    opacity: .5;
    position: absolute;
    left: 0;
    top: 6px;
  }
}

.buyOn {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  &__header {
    color: $olive-color;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  img {
    width: auto;
    height: 50px;
  }

  .v-btn {
    width: auto;
    height: auto;
    margin-right: 10px;

    &:last-child {
      img {
        height: 40px;
      }
    }
  }

  span {
    width: 100% !important
  }
}

.ozon-icon img {
  height: 30px !important;
}

.guaranty {
  padding-bottom: 20px;
  padding-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  &__header {
    color: $olive-color;
    text-transform: uppercase;
  }

  &__content {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;

    span {
      font-size: 10px;
      color: $main-color;
      text-transform: uppercase;
    }
  }

  img {
    width: 60px
  }
}

.color {
  margin-top: 15px;
  margin-bottom: 40px;
}

@media (min-width: 1200px) {
  .additional-title {
    font-size: 30px;
  }
}

.exp__point {
  padding-left: 30px !important;
}

.productOne__bloc-text {
  padding: 0 0px !important;
}

.v-expansion-panel-header {
  max-width: 100% !important;
  background-color: #FFF !important;
  text-transform: uppercase;
}

.v-expansion-panel-header--active {
  background-color: transparent !important;
}

.v-expansion-panel-header:before {
  background-color: transparent !important;
}

.book-property-area {
  padding: 0 30px;
}
</style>
