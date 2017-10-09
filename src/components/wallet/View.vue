<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('view.title') }}</span>
    </v-card-title>
    <v-card-text>
      <v-layout v-for="(key, i) in infoLabel" :key="i">
        <v-flex xs6>
          <v-subheader>
            {{ $t('common.info.' + key.label) }}
          </v-subheader>
        </v-flex>
        <v-flex xs6>
          <v-chip label>
            {{ info[key.name] }}
          </v-chip>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import webWallet from '../../web-wallet'

export default {
  data() {
    return {
      infoLabel: [
        {label: 'address', name: 'address'},
        {label: 'balance', name: 'balance'},
        {label: 'unconfirmed_balance', name: 'unconfirmedBalance'},
      ],
      wallet: webWallet.getWallet(),
    }
  },
  props: ['view'],
  watch: {
    view: function() {
      this.wallet.setInfo()
    }
  },
  computed: {
    info: function() {
      return this.wallet.info
    },
  }
}
</script>
