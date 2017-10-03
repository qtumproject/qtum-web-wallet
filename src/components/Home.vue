<template>
  <v-tabs dark fixed centered v-model="tab">
    <v-toolbar class="cyan" dark>
      <v-toolbar-title class="display-2">
        <i class="qtum-icon qtum-icon-logo"></i>Qtum
      </v-toolbar-title>
      <template v-if="wallet">
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-list dark>
            <v-list-tile style="float:left">
              <v-list-tile-content>
                <v-list-tile-title>Address</v-list-tile-title>
                <v-list-tile-sub-title>{{wallet.info.address}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile style="float:left">
              <v-list-tile-content>
                <v-list-tile-title>Balance</v-list-tile-title>
                <v-list-tile-sub-title>{{wallet.info.balance}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile style="float:left">
              <v-list-tile-content>
                <v-list-tile-title>Unconfirmed Balance</v-list-tile-title>
                <v-list-tile-sub-title>{{wallet.info.unconfirmedBalance}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar-items>
      </template>
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
        <v-tabs-item href="send">
          Send
        </v-tabs-item>
      </template>
    </v-tabs-bar>
    <v-tabs-items>
      <template v-if="wallet == false">
        <v-tabs-content id="create">
          <create-wallet @created="setWallet"></create-wallet>
        </v-tabs-content>
        <v-tabs-content id="restore">
          <restore-wallet @restored="setWallet"></restore-wallet>
        </v-tabs-content>
      </template>
      <template v-else>
        <v-tabs-content id="view">
          <view-wallet></view-wallet>
        </v-tabs-content>
        <v-tabs-content id="send">
          <send @send="setWallet"></send>
        </v-tabs-content>
      </template>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import CreateWallet from './wallet/Create'
import RestoreWallet from './wallet/Restore'
import ViewWallet from './wallet/View'
import Send from './Send'
import webWallet from '../web-wallet'

window.wallet = webWallet

export default {
  data () {
    return {
      wallet: false,
      tab: 'create'
    }
  },
  components: {
    CreateWallet,
    RestoreWallet,
    ViewWallet,
    Send,
  },
  methods: {
    setWallet() {
      this.wallet = webWallet.getWallet()
      this.tab = 'view'
    }
  }
}
</script>
