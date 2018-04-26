<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('restore_key_file.title') }}</span>
    </v-card-title>
    <v-card-text>
      <file-reader color="green" @upload="parseKeyFile"></file-reader>
      <password :open="passwordRequired" notEmpty="true" title="restore_key_file.password_title" @password="inputed"></password>
    </v-card-text>
  </v-card>
</template>

<script>
import fileReader from 'components/FileReader'
import password from 'components/Password'
import webWallet from 'libs/web-wallet'
import keyfile from 'libs/keyfile'

export default {
  data() {
    return {
      passwordRequired: false,
      content: '',
    }
  },
  components: {
    fileReader,
    password,
  },
  methods: {
    parseKeyFile(upload) {
      let content = keyfile.parse(upload.content)
      if (content) {
        this.passwordRequired = true
        this.content = content
      }
      else {
        this.$root.error('the_key_file_is_not_a_valid_format')
      }
    },
    inputed(password) {
      this.passwordRequired = false
      try {
        webWallet.restoreFromWif(keyfile.decode(this.content, password))
      }
      catch (e) {
        this.$root.error('restore_key_file_fail')
        this.$root.log.error('restore_key_file_restore_wif_error', e.stack || e.toString() || e)
        return false
      }
      this.$emit('restored')
    }
  }
}
</script>
