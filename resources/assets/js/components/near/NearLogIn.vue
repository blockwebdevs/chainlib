<template>
  <div>

    <div v-if="!$currentUser">
      <a href="#" class="item-area">
        <img src="/near-protocol-near-logo.png" alt="" style="width: 19px !important; margin-right: 8px">
        <span @click="signIn">Log In</span>
      </a>
    </div>

    <div v-else>
      <a class="item-area">
        <img src="/near-protocol-near-logo.png" alt="" style="width: 19px !important; margin-right: 8px">
        <span class="near-name">{{ $currentUser.accountId }}</span>
      </a>
      <a href="#" class="item-area"><span @click="signOut">Log Out</span></a>
    </div>

  </div>
</template>

<script>
export default {
  name: "NearLogIn",
  methods: {
    signOut() {
      this.$walletConnection.signOut();
      window.location.replace(window.location.origin + window.location.pathname);
    },
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

<style>
.item-area {
  padding: 5px;
}

.item-area:hover {
  border-radius: 2px;
  background: rgb(241, 143, 123) !important;
}

.item-area:hover > span {
  color: #FFF !important;
}

header a, header span {
  font-size: 14px !important;
}

.near-name {
  text-transform: lowercase !important;
}
</style>