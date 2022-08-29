<template>
  <div class="about-area">
    <h3 class="about-title">Description:</h3>
    <p class="productOne__bloc-text" v-html="text.substring(0, 800)+'...'" v-if="!showMore"></p>
    <div class="text-center">
      <v-btn outlined color="primary" v-if="!showMore && text.length >= 800" @click="showMore = true">show more</v-btn>
    </div>
    <p class="productOne__bloc-text" v-html="text" v-if="showMore"></p>
    <div class="text-center">
      <v-btn outlined color="primary" v-if="showMore" @click="showMore = false">show less</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutArea",
  props: ['text'],
  data: function () {
    return {
      showMore: false
    }
  }
}
</script>

<style scoped lang="scss">
.about-title {
  font-family: $font-titles;
  font-size: 20px;
  color: $olive-color;
  letter-spacing: 0;
  line-height: 17px;
  text-align: left;
  text-transform: uppercase;
  margin-top: 30px;
  line-height: 1.5;
}
</style>