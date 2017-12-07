<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('create_contract.title') }}</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Contract Address"
          v-model="contractAddress"
          required
        ></v-text-field>
        <v-text-field
          label="Encoded Data"
          v-model="encodedData"
          required
        ></v-text-field>
        <v-text-field
          label="Gas Price"
          v-model="gasPrice"
          required
        ></v-text-field>
        <v-text-field
          label="Gas Limit"
          v-model="gasLimit"
          required
        ></v-text-field>
        <v-text-field
          label="Fee"
          v-model="fee"
          required
          ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="success" dark @click="send" :disabled="notValid">{{ $t('common.confirm') }}</v-btn>
    </v-card-actions>
    <v-dialog v-model="confirmSendDialog" persistent max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{ $t('create_contract.confirm') }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Raw Tx" v-model="rawTx" multi-line disabled></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click="confirmSend" v-show="canSend && !sending">{{ $t('common.confirm') }}</v-btn>
          <v-btn class="red--text darken-1" flat @click.native="confirmSendDialog = false" :v-show="!sending">{{ $t('common.cancel') }}</v-btn>
          <v-progress-circular indeterminate :size="50" v-show="sending" class="primary--text"></v-progress-circular>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import webWallet from 'libs/web-wallet'

export default {
  data () {
    return {
      contractAddress: '127714c70005b0e1c5a5e1f2769b64818a5d73c7',
      encodedData: 'c04a87d10000000000000000000000000000000000000000000000000000000000000005',
      gasPrice: '40',
      gasLimit: '25000',
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
      let gasPriceCheck = /^\d+\.?\d*$/.test(this.gasPrice) && this.gasPrice > 0
      let gasLimitCheck = /^\d+\.?\d*$/.test(this.gasLimit) && this.gasLimit > 0
      let feeCheck = /^\d+\.?\d*$/.test(this.fee) && this.fee > 0.0001
      return !(gasPriceCheck && gasLimitCheck && feeCheck)
    }
  },
  methods: {
    send() {
      this.confirmSendDialog = true
      let wallet = webWallet.getWallet()
      wallet.generateSendToContractTx(this.contractAddress, this.encodedData, this.gasLimit, this.gasPrice, this.fee, rawTx => {
        this.rawTx = rawTx
        this.canSend = true
      })
    },

    confirmSend() {
      let wallet = webWallet.getWallet()
      this.sending = true
      wallet.sendRawTx(this.rawTx, txId => {
        this.confirmSendDialog = false
        this.sending = false
        this.$root.success('Successful send. You can view at ' + server.currentNode().getTxExplorerUrl(txId))
        this.$emit('send')
      })
    }
  }
}
</script>
