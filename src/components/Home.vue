<template>
  <v-tabs dark fixed centered>
    <v-toolbar class="cyan" dark>
      <v-toolbar-title class="display-2">
        <i class="qtum-icon qtum-icon-logo"></i>Qtum
      </v-toolbar-title>
    </v-toolbar>
    <v-tabs-bar class="cyan">
      <v-tabs-slider class="yellow"></v-tabs-slider>
      <template v-if="wallet == false">
      <v-tabs-item href="create">
        Create
      </v-tabs-item>
      <v-tabs-item href="restore">
        Restore
      </v-tabs-item>
      </template>
      <template v-else>
      <v-tabs-item href="view">
        View
      </v-tabs-item>
      </template>
    </v-tabs-bar>
    <v-tabs-items>
      <template v-if="wallet == false">
      <v-tabs-content id="create">
        <create-wallet v-on:wallet="setWallet"></create-wallet>
      </v-tabs-content>
      <v-tabs-content id="restore">
        <restore-wallet></restore-wallet>
      </v-tabs-content>
      </template>
      <template v-else>
      <v-tabs-content id="view">
        <view-wallet></view-wallet>
      </v-tabs-content>
      </template>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import CreateWallet from './wallet/Create'
import RestoreWallet from './wallet/Restore'
import ViewWallet from './wallet/View'

export default {
  data () {
    return {
      wallet: false
    }
  },
  components: {
    CreateWallet,
    RestoreWallet,
    ViewWallet,
  },
  methods: {
    setWallet: function(wallet) {
      this.wallet = wallet
    }
  }
}
</script>

<style lang="css">
  @font-face {
      font-family: qtum-icons;
      src: url('../assets/fonts/qtum-icons.eot');
      src: url('../assets/fonts/qtum-icons.eot?#iefix') format('embedded-opentype'),
           url('../assets/fonts/qtum-icons.woff') format('woff'),
           url('../assets/fonts/qtum-icons.ttf') format('truetype');
  }
  .qtum-icon {
    font-family: 'qtum-icons' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    width: auto;
    display: inline-block;
    text-align: center;
  }

  .qtum-icon-logo::before {
    content: "\e906";
  }
</style>
