<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('delegation.title') }}</span>
    </v-card-title>
    <v-card-text>
      <DelegationHeadAction
        :wallet="wallet"
      />
      <DelegationInfo
        v-if="wallet.info.superStaker"
        :wallet="wallet"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import webWallet from 'libs/web-wallet'

import DelegationInfo from 'components/Delegation/Info'
import DelegationHeadAction from 'components/Delegation/HeadAction'

export default {
  data() {
    return {
      wallet: webWallet.getWallet()
    }
  },
  props: [
    'view'
  ],
  watch: {
    view: async function (newVal) {
      if (newVal) {
        this.wallet = webWallet.getWallet()
        this.wallet.setInfo()
      }
    }
  },
  components: {
    DelegationInfo, DelegationHeadAction
  }
}
</script>
