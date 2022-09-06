<template>
  <div class="h-slider">
    <VueSlickCarousel ref="homeCarousel"
                      :infinite="false"
                      :variableWidth="true"
                      :arrows="false"
                      :settings="localSettings">
      <div class="h-slider__item" v-for="(product, i) in products" :key="i" v-if="product.main_image">
        <nuxt-link :to="`/ro/categories/${category.alias}/${product.alias}`" class="h-slider__item-inner">
          <div class="h-slider__image">
            <img :src="`https://back.chainlib.xyz/images/products/sm/${product.main_image.src}`">
          </div>
        </nuxt-link>
        <nuxt-link :to="`/ro/categories/${category.alias}/${product.alias}`" class="h-slider__item-inner">
          <div class="product-description">
            <h3>{{product.translation.name}}</h3>
            <p v-if="product.translation.body">
              {{product.translation.body.substring(0,125)+"..."}}
            </p>
          </div>
        </nuxt-link>

      </div>
    </VueSlickCarousel>
    <div class="custom-arrow next-slide" @click="nextSlide">
      <v-btn icon color="primary">
        <arrow-left/>
      </v-btn>
    </div>
    <div class="custom-arrow prev-slide" @click="prevSlide">
      <v-btn icon color="primary">
        <arrow-left/>
      </v-btn>
    </div>
  </div>
</template>

<script>

import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import VueSlickCarousel from 'vue-slick-carousel'
import ArrowLeft from '@/components/front/sliders/ArrowLeft.vue'

export default {
  name: 'HomeCarousel',
  props: ['products', 'category'],
  components: {
    VueSlickCarousel,
    ArrowLeft
  },
  data() {
    return {
      hover: true,
      localSettings: {
        dots: false,
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: false,
        infinite: true
      }
    }
  },
  mounted() {
    console.log(this.products)
  },
  methods: {
    nextSlide() {
      this.$refs.homeCarousel.next()
    },
    prevSlide() {
      this.$refs.homeCarousel.prev()
    }
  }
}
</script>

<style lang="scss" scoped>
.h-slider {
  .product-description{
    h3{
      margin-bottom: 20px;
      color: #e96535;
    }
  }
  &__item {
    position: relative;
    display: block;
    padding: 25px 16px;

    &-inner {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background-color: #686868;
      color: #FFF;
      padding: 25px;
    }

    .v-btn {
      background: $bcg-butt;
      margin-bottom: 20%;
    }
  }

  &__actions {
    position: absolute;
    z-index: 1;
  }

  &__image {
    img {
      width: 100%;
    }
  }

  .next-slide {
    transform: rotate(180deg);
  }
}

@media (min-width: 1200px) {
  .h-slider {
    &__actions {
      display: none;
    }
  }
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>
