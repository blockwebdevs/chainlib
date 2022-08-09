<template>
  <div class="banner-search-wrapper">
    <input type="text" class="search-input">
    <button>
      <v-icon dark>mdi-magnify</v-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: "Search"
}
</script>

<style lang="scss">
.banner-search {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 380px;
}

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
    border: 1px solid #363636;
    border-left: none;
  }
}

@media (max-width: 1200px) {
  .banner-search-wrapper {
    width: 90%;
  }
}
</style>