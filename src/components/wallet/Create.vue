<template>
  <v-card collum align-center justify-center style="text-align: center" class="pb-5" v-if="!created">
    <h3 class="display-1 pa-5">Create New Wallet</h3>
    <v-btn large error dark @click="createWallet">Create New Wallet</v-btn>
  </v-card>
  <v-card collum align-center justify-center class="pa-5" v-else>
    <p>Please remember the following words.</p>
    <div class="words">
      <span class="mr-3" v-for="word in words">{{word}}</span>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      created: false,
      words: [
        'copper',
        'explain',
        'ill-fated',
        'truck',
        'neat',
        'unite',
        'branch',
        'educated',
        'tenuous',
        'hum',
        'decisive',
        'notice',
      ],
    }
  },
  methods: {
    createWallet() {
      //@todo
      this.created = true
    }
  }
}
</script>
