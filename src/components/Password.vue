<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t(headline) }}</span>
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
  props: ['open', 'validate', 'notEmpty', 'title'],
  computed: {
    dialog() {
      return this.open
    },
    headline() {
      return this.title? this.title : 'password.enter'
    }
  },
  methods: {
    confirmPassword() {
      const password = this.password
      if (this.notEmpty && this.password === '') {
        this.$root.error('password is_required')
        return false
      }
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
