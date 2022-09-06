<template>
  <div class="a-slider">
    <VueSlickCarousel ref="homeCarousel" v-bind="settings">
      <div class="a-slider__item" v-for="(similar, i) in similars" :key="i">
        <nuxt-link :to="`/ro/categories/${similar.category.alias}/${similar.alias}`" class="a-slider__item-inner">
          <div class="a-slider__image">
            <v-img :src="`https://back.chainlib.xyz/images/products/sm/${similar.main_image.src}`"></v-img>
          </div>
        </nuxt-link>
        <nuxt-link :to="`/ro/categories/${similar.category.alias}/${similar.alias}`" class="h-slider__item-inner">
          <div class="product-description">
            <h3>{{ similar.translation.name }}</h3>
            <p v-if="similar.translation.body">
              {{ similar.translation.body.substring(0, 145) + "..." }}
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
  name: 'SimilarCarousel',
  components: {VueSlickCarousel, ArrowLeft},
  props: ['similars'],
  data() {
    return {
      settings: {
        dots: false,
        slidesToScroll: 1,
        slidesToShow: 3,
        arrows: false,
        infinite: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }
    }
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

<style lang="scss">
.a-slider {
  .product-description {
    background-color: #686868;
    color: #FFF;
    padding: 20px;
  }
  &__item {
    position: relative;
    display: block;
    padding: 25px 16px;

    &__inner {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background-color: #686868;
      color: #FFF;
      padding: 25px;
    }
  }

  &__image {
    img {
      width: 100%;
    }
  }
}

.a-slider {
  position: relative;

  .custom-arrow {
    position: absolute;
    z-index: 2;
    top: -34px;
    opacity: .5;

    &:hover {
      opacity: 1;
    }
  }

  .prev-slide {
    right: 45px;
  }

  .next-slide {
    right: 5px;
    transform: rotate(180deg);
  }
}

.h-section__title {
  color: #ED6D5E;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 30px;
}
</style>
