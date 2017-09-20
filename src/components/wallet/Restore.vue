<template>
  <v-card class="pa-3" v-if="!restored">
    <v-card-text class="display-1 pb-3">Restore Wallet</v-card-text>
    <v-layout justify-start class="pl-3 pr-3">
      <v-flex xs6>
        <p class="title">Paste/Type Your Words</p>
        <v-text-field v-model="wordsContent" multi-line placeholder="Enter your words..."></v-text-field>
      </v-flex>
      <v-flex xs6 v-if="words.length">
        <p class="title">Restore Your Wallet</p>
        <v-btn large error dark @click="restoreWallet">Restore</v-btn>
      </v-flex>
    </v-layout>
  </v-card>
  <v-card v-else class="pa-3">
    <p class="title">Your Wallet Info</p>
    <v-text-field
      disabled
      label="Your Address"
      value="QYvsYLuFRatr2zeBpwpNnfQJTHJLRzNN94"
    ></v-text-field>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      restored: false,
      wordsContent: ''
    }
  },
  computed: {
    words() {
      return this.wordsContent.split(' ').filter(word=>word.trim()!='')
    }
  },
  methods: {
    restoreWallet() {
      //@todo
      this.restored = true
    }
  }
}
</script>
