<template>
  <div>
    <p>{{ $t('mnemonic.input_words') }}</p>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs2 v-for="i in 12" :key="i">
            <v-text-field :label="$t('mnemonic.label')+i" type="text" v-model="mnemonic[i-1]"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn success dark @click="inputMnemonicWords" :disabled="notFinishInput">{{ $t('common.confirm') }}</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mnemonic: [],
    }
  },
  computed: {
    notFinishInput: function() {
      return this.mnemonic.filter((word) => !!word).length != 12
    }
  },
  methods: {
    inputMnemonicWords: function() {
      this.$emit('mnemonic', this.mnemonic)
    }
  }
}
</script>
