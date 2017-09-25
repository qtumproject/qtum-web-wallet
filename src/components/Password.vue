<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">Please enter your Password</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Password" type="password" v-model="password"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click="confirmPassword">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      passwordTest: false
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
  }
}
</script>
