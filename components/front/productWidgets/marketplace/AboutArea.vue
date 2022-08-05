<template>
  <div class="about-area">
    <h3 class="about-title">Description:</h3>
    <p class="productOne__bloc-text" v-html="text"></p>
<!--    <p class="productOne__bloc-text" v-html="brandText"></p>-->
  </div>
</template>

<script>
export default {
  name: "AboutArea",
  props: ['text', 'brandText']
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