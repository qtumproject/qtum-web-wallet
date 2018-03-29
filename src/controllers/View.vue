<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('view.title') }}</span>
    </v-card-title>
    <v-card-text>
      <v-layout v-for="(item, i) in infoLabel" :key="i">
        <v-flex xs3>
          <v-subheader>
            {{ $t('common.info.' + item.label) }}
          </v-subheader>
        </v-flex>
        <v-flex xs7>
          <v-text-field
            v-model="info[item.name]"
            disabled
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn small class="mt-3" color="cyan" v-clipboard:copy="info[item.name]" v-clipboard:success="onCopySucc" v-clipboard:error="onCopyError" v-if="item.copy">
            {{ $t('common.copy') }}
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout v-if="privKey !== null">
        <v-flex xs3>
          <v-subheader>
            {{ $t('common.info.priv_key') }}
          </v-subheader>
        </v-flex>
        <v-flex xs7>
          <v-text-field
            v-model="privKey"
            disabled
            :append-icon="showPriv ? 'visibility_off' : 'visibility'"
            :append-icon-cb="() => (showPriv = !showPriv)"
            :type="showPriv ? 'text' : 'password'"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn small class="mt-3" color="cyan" v-show="showPriv" v-clipboard:copy="privKey" v-clipboard:success="onCopySucc" v-clipboard:error="onCopyError">
            {{ $t('common.copy') }}
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout v-if="wallet.info.qrc20.length > 0">
        <v-flex xs3>
          <v-subheader>
            QRC20
          </v-subheader>
        </v-flex>
        <v-flex xs7>
          <v-card flat tile :color="'grey darken-'+(i%2+1)" style="border-bottom: 2px solid #000;padding: 15px 10px;" v-for="(token, i) in wallet.info.qrc20" :key="i">
            <v-layout>
              <v-flex xs5>{{ token.contract.name }}</v-flex>
              <v-flex xs7>{{ token.amount / Math.pow(10, token.contract.decimals) }} {{ token.contract.symbol }}</v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import webWallet from 'libs/web-wallet'

export default {
  data() {
    return {
      infoLabel: [
        { label: 'address', name: 'address', copy: true },
        { label: 'balance', name: 'balance' },
        { label: 'unconfirmed_balance', name: 'unconfirmedBalance' },
      ],
      wallet: webWallet.getWallet(),
      showPriv: false,
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
    privKey: function() {
      return this.wallet.getPrivKey()
    }
  },
  methods: {
    onCopySucc: function() {
      this.$root.success('copy success')
    },
    onCopyError: function() {
      this.$root.error('copy fail')
    }
  }
}
</script>
