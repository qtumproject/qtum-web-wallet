<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('password.enter') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field :label="$t('password.password')" type="password" v-model="password" ref="passwordInput" @keydown.enter="confirmPassword"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click="confirmPassword">{{ $t('common.confirm') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      password: ''
    }
  },
  props: ['open', 'validate'],
  computed: {
    dialog() {
      return this.open
    }
  },
  methods: {
    confirmPassword() {
      let password = this.password
      this.$emit('password', password)
      this.password = ''
      return true
    }
  },
  watch: {
    open(open) {
      if (open) {
        Vue.nextTick(()=>this.$refs.passwordInput.focus())
      }
    }
  }
}
</script>
