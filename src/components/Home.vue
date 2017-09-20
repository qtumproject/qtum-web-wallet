<template>
  <v-tabs dark fixed centered>
    <v-toolbar class="cyan" dark>
      <v-toolbar-title class="display-2">
        <i class="qtum-icon qtum-icon-logo"></i>Qtum
      </v-toolbar-title>
    </v-toolbar>
    <v-tabs-bar class="cyan">
      <v-tabs-slider class="yellow"></v-tabs-slider>
      <v-tabs-item href="create">
        Create
      </v-tabs-item>
      <v-tabs-item href="restore">
        Restore
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content id="create">
        <create-wallet></create-wallet>
      </v-tabs-content>
      <v-tabs-content id="restore">
        <restore-wallet></restore-wallet>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import CreateWallet from './wallet/Create'
import RestoreWallet from './wallet/Restore'

export default {
  data () {
    return {
    }
  },
  components: {
    CreateWallet,
    RestoreWallet,
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
