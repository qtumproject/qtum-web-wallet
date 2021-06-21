<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("create_token.title") }}</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          :label="$t('create_token.name')"
          v-model.trim="name"
          required
        ></v-text-field>
        <v-text-field
          :label="$t('create_token.symbol')"
          v-model.trim="symbol"
          required
        ></v-text-field>
        <v-text-field
          :label="$t('create_token.decimal')"
          v-model.trim="decimal"
          required
        ></v-text-field>
        <v-text-field
          :label="$t('create_token.total_supply')"
          v-model.trim="totalSupply"
          required
        ></v-text-field>
        <v-text-field
          label="Gas Price (1e-8 QTUM/gas)"
          v-model.trim="gasPrice"
          required
        ></v-text-field>
        <v-text-field
          label="Gas Limit"
          v-model.trim="gasLimit"
          required
        ></v-text-field>
        <v-text-field label="Fee" v-model.trim="fee" required></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="success" dark @click="send" :disabled="notValid">{{
        $t("common.confirm")
      }}</v-btn>
    </v-card-actions>
    <v-dialog v-model="confirmSendDialog" persistent max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{ $t("create_token.confirm") }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Raw Tx"
                  v-model="rawTx"
                  multi-line
                  disabled
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="blue--text darken-1"
            flat
            @click="confirmSend"
            v-show="canSend && !sending"
            >{{ $t("common.confirm") }}</v-btn
          >
          <v-btn
            class="red--text darken-1"
            flat
            @click.native="confirmSendDialog = false"
            :v-show="!sending"
            >{{ $t("common.cancel") }}</v-btn
          >
          <v-progress-circular
            indeterminate
            :size="50"
            v-show="sending"
            class="primary--text"
          ></v-progress-circular>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import webWallet from '@/libs/web-wallet'
import server from '@/libs/server'

export default {
  data() {
    return {
      name: '',
      symbol: '',
      decimal: '8',
      totalSupply: '',
      gasPrice: '40',
      gasLimit: '2500000',
      fee: '0.01',
      confirmSendDialog: false,
      rawTx: 'loading...',
      canSend: false,
      sending: false
    }
  },
  computed: {
    notValid: function() {
      //@todo valid the address
      const decimalCheck =
        /^(0|[1-9][0-9]*)$/.test(this.decimal) && this.decimal < 256
      const totalSupplyCheck = !isNaN(this.totalSupply)
      const gasPriceCheck =
        /^\d+\.?\d*$/.test(this.gasPrice) && this.gasPrice > 0
      const gasLimitCheck =
        /^\d+\.?\d*$/.test(this.gasLimit) && this.gasLimit > 0
      const feeCheck = /^\d+\.?\d*$/.test(this.fee) && this.fee > 0.0001
      return !(
        decimalCheck &&
        totalSupplyCheck &&
        gasPriceCheck &&
        gasLimitCheck &&
        feeCheck
      )
    }
  },
  methods: {
    async send() {
      this.confirmSendDialog = true
      const wallet = webWallet.getWallet()
      try {
        this.rawTx = await wallet.generateCreateTokenTx(
          this.name,
          this.symbol,
          this.decimal,
          this.totalSupply,
          this.gasLimit,
          this.gasPrice,
          this.fee
        )
        this.canSend = true
      } catch (e) {
        alert(e.message || e)
        this.$root.log.error(
          'create_contract_token_error',
          e.stack || e.toString() || e
        )
        this.confirmSendDialog = false
        return false
      }
    },

    async confirmSend() {
      const wallet = webWallet.getWallet()
      this.sending = true
      try {
        const res = await wallet.sendRawTx(this.rawTx)
        this.confirmSendDialog = false
        this.sending = false
        if (res.txId) {
          const txViewUrl = server.currentNode().getTxExplorerUrl(res.txId)
          this.$root.success(
            `Successful send. You can view at <a href="${txViewUrl}" target="_blank">${txViewUrl}</a>`,
            true,
            0
          )
        } else {
          this.$root.error(`Send Failed : ${res.message}`, true, 0)
        }
        this.$emit('send')
      } catch (e) {
        alert(e.message || e)
        this.$root.log.error(
          'create_contract_post_raw_tx_error',
          e.response || e.stack || e.toString() || e
        )
        this.confirmSendDialog = false
      }
    }
  }
}
</script>
