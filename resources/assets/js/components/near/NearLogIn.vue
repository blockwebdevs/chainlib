<template>
  <a href="#">
    <img src="/near-protocol-near-logo.png" alt="" style="width: 23px !important; margin-right: 10px">
    <span @click="signIn">Log In</span>
  </a>
</template>

<script>
export default {
  name: "NearLogIn",
  methods: {
    signIn() {
      this.$walletConnection.requestSignIn(
          {contractId: this.$nearConfig.contractName, methodNames: [this.$contract.addMessage.name]},
          'Chain Lib NEAR',
          null, //optional URL to redirect to if the sign in was successful
          null,//optional URL to redirect to if the sign in was NOT successful
      )
    },
  }
}
</script>

<style scoped>

</style>