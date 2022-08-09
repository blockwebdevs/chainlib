<template>
  <div class="h-content">

    <v-img src="/Main-banner.jpeg" class="banner-search">
      <search/>
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
import Search from "@/components/front/partials/Search";

export default {
  components: {HomeBannerCarousel, HomeCarouselSets, HomeCarouselProducts, Search},
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
.h-section__title {
  color: #ED6D5E;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 30px;
}
</style>