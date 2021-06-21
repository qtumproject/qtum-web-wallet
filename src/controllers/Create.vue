<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("create.title") }}</span>
    </v-card-title>
    <v-card-text v-if="step === 2">
      <v-alert color="error" value="true">{{
        $t("dump_as_key_file.warning")
      }}</v-alert>
      <file-creator
        v-if="fileStr"
        color="green"
        :href="fileStr"
        @click="dumpDone"
      ></file-creator>
      <password
        :open="passwordRequired"
        notEmpty="true"
        title="dump_as_key_file.password_title"
        @password="setPassword"
      ></password>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" dark @click="createWallet" v-if="step === 1">{{
        $t("create.title")
      }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import password from '@/components/Password'
import webWallet from '@/libs/web-wallet'
import fileCreator from '@/components/FileCreator'
import keyfile from '@/libs/keyfile'
import track from '@/libs/track'

export default {
  data() {
    return {
      step: 1,
      passwordRequired: false,
      fileStr: false
    }
  },
  props: ['view'],
  watch: {
    view: function() {
      this.step = 1
    }
  },
  components: {
    password,
    fileCreator
  },
  methods: {
    setPassword(password) {
      const wallet = webWallet.restoreFromMnemonic(
        webWallet.generateMnemonic(),
        Date.now()
      )
      this.fileStr =
        'data:text/plain,' +
        keyfile.build(keyfile.encode(wallet.getPrivKey(), password))
      this.passwordRequired = false
    },
    createWallet() {
      this.step = 2
      this.passwordRequired = true
      track.trackStep('create', 1, 2)
    },
    dumpDone() {
      track.trackDone('create')
      setTimeout(() => {
        this.$emit('created')
      }, 1000)
    }
  }
}
</script>
