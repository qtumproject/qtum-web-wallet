<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('create_contract.title') }}</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Byte Code"
          v-model="code"
          multiLine
          required
          ></v-text-field>
        <a href="https://ethereum.github.io/browser-solidity/" target="_blank" style="float: right;">{{ $t('create_contract.compiler') }}</a>
        <v-text-field
          label="Gas Price (1e-8 QTUM/gas)"
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
import server from 'libs/server'

export default {
  data () {
    return {
      //code: '',
      code: '6060604052341561000f57600080fd5b60405160208061015083398101604052808051906020019091905050806000806101000a81548160ff021916908360ff1602179055505060fc806100546000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c04a87d114604e578063d46300fd146071575b600080fd5b3415605857600080fd5b606f600480803560ff16906020019091905050609d565b005b3415607b57600080fd5b608160ba565b604051808260ff1660ff16815260200191505060405180910390f35b806000806101000a81548160ff021916908360ff16021790555050565b60008060009054906101000a900460ff169050905600a165627a7a72305820342095fb49b882685d05119811a1d1f144c7afa09926673212f3686623146aea00290000000000000000000000000000000000000000000000000000000000000014',
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
      wallet.generateCreateContractTx(this.code, this.gasLimit, this.gasPrice, this.fee, rawTx => {
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
