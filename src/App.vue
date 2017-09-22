<template>
  <v-app>
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <notify></notify>
    </main>
  </v-app>
</template>

<script>
import notify from './components/Notify'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    notify
  }
}
</script>
