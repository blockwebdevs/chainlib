<template>
  <div class="details-area">
    <span class="details-area-item">
      <p class="details-area-item-name">Store</p>
      <p class="details-area-item-value">
        {{ thing[0].storeId }}
      </p>
    </span>

    <span class="details-area-item">
      <p class="details-area-item-name">Minter</p>
      <p class="details-area-item-value">
        {{ thing[0].tokens[0].minter }}
      </p>
    </span>

    <span class="details-area-item">
      <p class="details-area-item-name">Owner</p>
      <p class="details-area-item-value">
         {{ thing[0].tokens[0].ownerId }}
      </p>
    </span>

    <span class="details-area-item">
      <p class="details-area-item-name">Storage Gateway</p>
      <p class="details-area-item-value">
        https://arweave.net
      </p>
    </span>

    <span class="details-area-item" v-if="thing[0].tokens[0].list">
      <p class="details-area-item-name">Contract</p>
      <p class="details-area-item-value">
          {{ thing[0].tokens[0].list.contractId }}
      </p>
    </span>

    <span class="details-area-item">
      <p class="details-area-item-name">Thing ID</p>
      <p class="details-area-item-value">
        <small>{{ thing[0].id }}</small>
      </p>
    </span>

  </div>
</template>

<script>
export default {
  name: "DetailsArea",
  props: ['thing'],
  mounted() {
    console.log(this.thing)
  }
}
</script>

<style scoped>

</style>