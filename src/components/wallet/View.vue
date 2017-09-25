<template>
  <v-card class="pb-5" style="text-align: center">
    <h3 class="pa-5">View Wallet Info</h3>
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Address</v-list-tile-title>
          <v-list-tile-sub-title>{{wallet.info.address}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Balance</v-list-tile-title>
          <v-list-tile-sub-title>{{wallet.info.balance}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Unconfirmed Balance</v-list-tile-title>
          <v-list-tile-sub-title>{{wallet.info.unconfirmedBalance}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import webWallet from '../../web-wallet'

export default {
  data() {
    return {
      wallet: webWallet.getWallet()
    }
  },
}
</script>
