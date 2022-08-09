<template>
  <div class="about">

    <v-container>
      <div class="about-headings">
        <h1>CHAINLIB STORY</h1>
        <h3>DIGITAL "SHELF SPACE" FOR AUTHORS WITH COPYRIGHT PROTECTION ENSURED BY BLOCKCHAIN TECHNOLOGY</h3>
      </div>

      <v-row>
        <v-col class="col-md-6">
          <v-img src="/About-section-1-image-1.jpeg" alt=""></v-img>
        </v-col>
        <v-col class="col-md-6">
          <v-img src="/About-section-1-image-2.jpeg" alt=""></v-img>
        </v-col>

        <v-col class="col-md-12">
          <h2>ABOUT THIS PROJECT</h2>
          <p class="text-center">There are 2 big problems that authors face everywhere. The first problem is copyright
            protection. Since the
            law on authorship differs from country to country, a book written and registered in one country can be
            easily reprinted under another name in another country - and have every right to do so. The second problem
            is facing unknown authors from small countries. Usually, the publishing houses refuse to publish their
            works. This is why and how the ChainLib came to life - digital "shelf space" for authors all over the world
            with copyright protection ensured by blockchain technology
          </p>
          <h2>CHAINLIB AUTHORS</h2>
        </v-col>

        <v-col class="col-md-5">
          <img src="/About-section-2-authors--image-1.png" height="620px">
        </v-col>
        <v-col class="col-md-7">
          <img src="/About-section-2-authors--image-2.png" height="620px">
        </v-col>

        <v-col class="col-md-12">
          <h2>EXAMPLES OF WORKS ON CHAINLIB</h2>
        </v-col>

        <v-col class="col-md-3">
          <v-img src="/About-section-3-works-image-1.jpeg"></v-img>
        </v-col>
        <v-col class="col-md-3">
          <v-img src="/About-section-3-works-image-2.jpeg"></v-img>
        </v-col>
        <v-col class="col-md-3">
          <v-img src="/About-section-3-works-image-3.jpeg"></v-img>
        </v-col>
        <v-col class="col-md-3">
          <v-img src="/About-section-3-works-image-4.jpeg"></v-img>
        </v-col>
        <v-col class="col-md-3">
          <v-img src="/About-section-3-works-image-5.jpeg"></v-img>
        </v-col>
        <v-col class="col-md-3">
          <v-img src="/About-section-3-works-image-6.jpeg"></v-img>
        </v-col>
        <v-col class="col-md-3">
          <v-img src="/About-section-3-works-image-7.jpeg"></v-img>
        </v-col>
        <v-col class="col-md-3">
          <v-img src="/About-section-3-works-image-8.jpeg"></v-img>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  layout: "default",
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        }
      ]
    }
  },
  data: () => ({
    title: '',
    description: '',
  }),
  computed: mapGetters({
    trans: 'getTranslations'
  }),
  mounted() {
    this.title = this.$trans('PageNames', 'aboutSeoTitle')
    this.description = this.$trans('PageNames', 'aboutSeoDesc')
  }
}
</script>

<style lang="scss">
.about {
  .about-headings {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;

    h3 {
      margin: 20px 0;
    }
  }

  h2 {
    text-align: center;
    font-size: 36px;
    color: #363636;
    margin: 20px 0;
  }
}
</style>
