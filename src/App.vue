<template>
  <v-app>
<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-bottom-nav :value="true" class="transparent">
      <v-btn flat class="teal--text" value="index" to="/">
        <span>Wallet</span>
        <v-icon>account_balance_wallet</v-icon>
      </v-btn>
      <v-btn flat class="teal--text" value="favorites">
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn flat class="teal--text" value="nearby">
        <span>Nearby</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>
