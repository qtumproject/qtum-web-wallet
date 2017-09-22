<template>
  <div>
    <p>Please input the words you remembered before</p>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs2 v-for="i in 12" :key="i">
            <v-text-field :label="'Mnemonic'+i" type="text" v-model="mnemonic[i-1]"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-btn large success dark @click="inputMnemonicWords" :disabled="notFinishInput">Confirm</v-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mnemonic: [],
    }
  },
  computed: {
    notFinishInput: function() {
      var finishCount = 0
      for (var i = 0; i < this.mnemonic.length; i++) {
        if(this.mnemonic[i]) finishCount++
      }
      return finishCount != 12
    }
  },
  methods: {
    inputMnemonicWords: function() {
      this.$emit('mnemonic', this.mnemonic)
    }
  }
}
</script>
