<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("delegation.title") }}</span>
    </v-card-title>
    <v-card-text>
      <DelegationHeadAction :wallet="wallet" @notify="notify" />
      <DelegationInfo
        v-show="
          wallet &&
            wallet.info.delegateStatus !== 'none' &&
            wallet.info.delegateStatus !== 'delDelegation'
        "
        :wallet="wallet"
        @notify="notify"
      />
      <!-- 信息提示 -->
      <v-snackbar v-model="snackbarShow" top right :color="tip.type" clearable>
        <section>
          {{ tip.msg }}
        </section>
        <v-btn icon small @click="snackbarShow = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-card-text>
  </v-card>
</template>

<script>
import webWallet from '@/libs/web-wallet'

import DelegationInfo from '@/components/Delegation/Info'
import DelegationHeadAction from '@/components/Delegation/HeadAction'

export default {
  data() {
    return {
      wallet: webWallet.getWallet(),
      snackbarShow: false,
      tip: {
        type: 'error',
        msg: ''
      }
    }
  },
  props: ['view'],
  watch: {
    view: async function(newVal) {
      if (newVal) {
        this.wallet = webWallet.getWallet()
        this.wallet.setInfo()
      }
    }
  },
  components: {
    DelegationInfo,
    DelegationHeadAction
  },
  methods: {
    notify(message, type) {
      this.snackbarShow = true
      this.tip.msg = message
      this.tip.type = type
    }
  }
}
</script>
