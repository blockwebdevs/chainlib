<template>
  <div class="h-content">

    <v-img src="/Main-banner.jpeg" class="banner-search">
      <div class="banner-search-wrapper">
        <input type="text" class="search-input">
        <button></button>
      </div>
    </v-img>

    <div class="h-sections">

      <section class="h-section" v-for="(item, index) in items" :key="index">

        <h3 class="h-section__title">
          {{ item.view.translation.name }}
        </h3>

        <home-carousel-products :products="item.view.products" :category="item.view"/>

        <div class="h-section__button">
          <v-btn nuxt :to="`/${language.lang}/categories/${item.view.alias}`" outlined color="primary">
            View books
          </v-btn>
        </div>

      </section>

    </div>

  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import HomeCarouselSets from '@/components/front/sliders/HomeCarouselSets.vue'
import HomeCarouselProducts from '@/components/front/sliders/HomeCarouselProducts.vue'
import HomeBannerCarousel from '@/components/front/sliders/HomeBannerCarousel.vue'

export default {
  components: {HomeBannerCarousel, HomeCarouselSets, HomeCarouselProducts},
  computed: mapGetters({
    categories: 'getCategories',
    collections: 'getCollections',
    language: 'getLanguage'
  }),
  data() {
    return {
      items: null
    }
  },
  mounted() {
    const items = []
    this.categories.forEach((category, i) => {
      if (category.on_home === 1) {
        items.push({type: 'category', view: category})
      }
    })
    this.items = items
  }
}
</script>

<style lang="scss">
.banner-search {
  display: flex;
  align-items: center;
  justify-content: center;
  .banner-search-wrapper {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    input {
      border: 1px solid #363636;
      background-color: #FFF;
      display: block;
      border-radius: 5px;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      text-transform: uppercase;
      outline: none;
      width: 100%;
      height: 50px;
      padding: 10px;
    }
    button {
      width: 80px;
      height: 50px;
      background: #ED6D5E url() no-repeat 50%;
      border-bottom-right-radius: 9px;
      border-top-right-radius: 9px;
      padding: 0;
      bottom: 0;
    }
  }
}
.h-section__title {
  color: #ED6D5E;
}
</style>