<template>
  <div class="properties-area">

    <div class="properties-area-item" v-for="(property, key) in properties" :key="key" v-if="property">
      <p class="properties-area-item-name">{{ key }}</p>
      <p class="properties-area-item-value">{{ property }}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "PropertiesArea",
  props: ['properties']
}
</script>

<style scoped>

</style>