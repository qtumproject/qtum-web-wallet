<template>
  <v-tabs dark fixed centered>
    <v-toolbar class="cyan" dark>
      <v-toolbar-title class="display-2">Wallet</v-toolbar-title>
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
        <v-card flat>
          <v-card-text>create</v-card-text>
          <wallet></wallet>
        </v-card>
      </v-tabs-content>
      <v-tabs-content id="restore">
        <v-card flat>
          <v-card-text>restore</v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import Wallet from './CreateWallet'
export default {
  name: 'hello',
  data () {
    return {
    }
  },
  components: {Wallet}
}
</script>
