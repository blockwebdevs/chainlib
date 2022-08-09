<template>
  <footer class="footer pt-15">
    <v-container>
      <v-row>
        <v-col class="col-12">
          <v-row>
            <v-col class="col-lg-6 col-12">
              <nuxt-link to="/" class="footer__logo">
                <v-img src="/logo.png" alt="logo" width="150"/>
              </nuxt-link>
              <p class="my-3">
                ChainLib - digital space created for authors that provides a "shelf space" and visibility to their
                readers,
                with copyright protection ensured by blockchain technology
              </p>
            </v-col>
            <v-col class="col-lg-3 col-12">
              <div class="footer__subtitle">
                Books Catalog:
              </div>
              <div class="footer__list">
                <nuxt-link :to="`/${language.lang}/categories/${category.alias}`" v-for="(category, key) in categories">
                  {{ category.translation.name }}
                </nuxt-link>
              </div>
            </v-col>
            <v-col class="col-lg-3 col-12">
              <div class="footer__subtitle">
                About:
              </div>
              <div class="footer__list">
                <nuxt-link :to="`/${language.lang}/about`">
                  {{ $trans('PagesNames', 'pageAbout') }}
                </nuxt-link>
                <nuxt-link :to="`/${language.lang}/faq`">
                  FAQ
                </nuxt-link>
                <nuxt-link :to="`/${language.lang}/propose-book`">
                  Submit a Book Proposal
                </nuxt-link>
                <nuxt-link :to="`/${language.lang}/contacts`">
                  {{ $trans('PagesNames', 'pageNameContacts') }}
                </nuxt-link>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="col-12">
          <div class="footer__payments d-flex align-center justify-space-between">
            <div class="footer__payments-img">
              <v-img width="60" src="https://back.soledy.com/images/mc_symbol.svg"/>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-instagram',
    ],
    serviceArray: [],
  }),
  watch: {
    services() {
      this.serviceArray = []
      this.splitToChunks(this.services, 2)
    }
  },
  computed: mapGetters({
    pages: 'getPages',
    language: 'getLanguage',
    trans: 'getTranslations',
    services: 'getServices',
    categories: 'getCategories',
  }),
  mounted() {
    this.splitToChunks(this.services, 2)
  },
  methods: {
    splitToChunks(array, parts) {
      const services = []
      array.forEach(service => services.push(service))
      for (let i = parts; i > 0; i--) {
        this.serviceArray.push(services.splice(0, Math.ceil(services.length / i)))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background: #363636;
  padding-bottom: 60px;

  .v-expansion-panel {
    box-shadow: none !important;
    background: $bcg-header !important;
    font-family: $font-roboto;

    &:before {
      box-shadow: none;
    }
  }

  .v-expansion-panel-header {
    font-size: 20px !important;
    color: $main-color;
    padding-left: 0;
    padding-right: 0;
  }

  .v-expansion-panel-content__wrap {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  a {
    font-size: 18px;
    color: #FFF;
    display: block;
    line-height: 1.8;
    font-weight: 300;
    font-family: $font-roboto, sans-serif;
  }

  p {
    font-family: $font-roboto, sans-serif;
    font-size: 18px;
    color: #FFF;
    letter-spacing: 0;
    line-height: 1.5;
    margin-bottom: 10px;
    font-weight: 300;
  }

  &__desktop {
    display: none;
  }
}

@media (max-width: 1200px) {
  .footer {
    padding: 15px !important;
  }
  .footer__logo {
    .v-image {
      width: 80% !important;
    }
  }
}

.footer-social-link {
  display: inline-block !important;
}
.footer__subtitle {
  font-family: $font-roboto, sans-serif;
  font-size: 20px;
  color: #e9642d;
  letter-spacing: 0;
  line-height: 20px;
  font-weight: 400;
  margin-bottom: 20px;
}
a {
  font-family: $font-roboto;
  text-transform: capitalize;
}
</style>
