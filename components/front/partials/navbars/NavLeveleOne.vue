<template>
  <v-list>
    <v-list-item>
      <v-list-item-icon @click="closeDrawer">
        <v-icon color="primary">mdi-close</v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-dialog
            v-model="changeLanguage"
            width="400">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-title class="d-flex align-center userSettings" v-bind="attrs" v-on="on">
              <span class="d-flex align-center">
                {{ currency.abbr }} /
                {{ language.lang }} /
                <img class="ml-1"
                     :src="`https://back.soledynft.shop/images/flags/24x24/${country.flag}`">
              </span>
              <v-spacer></v-spacer>
              |
              <v-spacer></v-spacer>
              <span>{{ $trans('TehButtons', 'change') }}</span>
            </v-list-item-title>
          </template>
          <language-modal @closeLanguageModal="changeLanguage = false"/>
        </v-dialog>
      </v-list-item-content>
    </v-list-item>
    <v-list-item @click="openDrawerTwoCatalog">
      <v-list-item-content>
        <v-list-item-title>
          Books Catalog
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon color="primary">mdi-chevron-right</v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-list-item to="/ro/about" nuxt>
      <v-list-item-content>
        <v-list-item-title>
          About
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item nuxt :to="`/${language.lang}/faq`">
      <v-list-item-content>
        <v-list-item-title>
          FAQ
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item nuxt :to="`/${language.lang}/propose-book`">
      <v-list-item-content>
        <v-list-item-title>
          Submit a Book Proposal
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item nuxt :to="`/${language.lang}/contacts`">
      <v-list-item-content>
        <v-list-item-title>
          Contacts
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>

      <v-list-item-content>
                <NearAuth :title="'Sign In'"/>
      </v-list-item-content>

    </v-list-item>
  </v-list>
</template>

<script>

import {mapGetters} from 'vuex'
import LanguageModal from '@/components/front/forms/LanguageModal'
import AuthModal from '@/components/front/forms/AuthenticationForm'
import NearAuth from "@/components/front/near/NearAuth";

export default {
  components: {
    LanguageModal,
    AuthModal,
    NearAuth
  },
  data() {
    return {
      clipped: false,
      fixed: false,
      changeLanguage: false,
      authModal: false,
    }
  },
  computed: mapGetters({
    language: 'getLanguage',
    currency: 'getCurrency',
    country: 'getCountry',
    trans: 'getTranslations',
  }),
  methods: {
    closeDrawer() {
      this.$emit('closeDrawer')
    },
    openDrawerTwoCatalog() {
      this.$emit('openDrawerTwoCatalog')
    },
    openDrawerTwoCollections() {
      this.$emit('openDrawerTwoCollections')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list-item {
  &__title {
    text-transform: uppercase;
  }
}

.userSettings {
  max-width: 250px;
}
</style>
