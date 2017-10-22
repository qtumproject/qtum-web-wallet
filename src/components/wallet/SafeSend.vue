<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('safe_send.title') }}</span>
    </v-card-title>
    <v-card-text>
      <v-alert color="info" value="true">{{ $t('safe_send.info') }}</v-alert>
      <v-stepper non-linear vertical>
        <v-stepper-step step="1" editable>Fetch UTXO (At online computer)</v-stepper-step>
        <v-stepper-content step="1">
          <v-text-field label="From Address" v-model="fromAddress" required></v-text-field>
          <v-btn color="success" @click="fetchUtxo">{{ $t('common.confirm') }}</v-btn>
          <v-text-field v-model="fetchedUtxo" multiline></v-text-field>
        </v-stepper-content>
        <v-stepper-step step="2" editable>Generate Tx (At offline computer)</v-stepper-step>
        <v-stepper-content step="2">
          <v-text-field label="To Address" v-model="fromAddress" required></v-text-field>
        </v-stepper-content>
        <v-stepper-step step="3" editable>Broadcast Tx (At online computer)</v-stepper-step>
        <v-stepper-content step="3">
          <v-text-field label="Send" v-model="fromAddress" required></v-text-field>
        </v-stepper-content>
      </v-stepper>
    </v-card-text>
    <v-dialog v-model="confirmAddressDialog" persistent max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('send.enter_address') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Address" v-model="repeatAddress"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click="confirmAddress">{{ $t('common.confirm') }}</v-btn>
          <v-btn class="red--text darken-1" flat @click.native="confirmAddressDialog = false">{{ $t('common.cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmSendDialog" persistent max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{ $t('send.going_to_send') }}
            <v-chip label>{{this.amount}}QTUM</v-chip>
            {{ $t('send.to_address') }}
            <v-chip label>{{this.address}}</v-chip>
            {{ $t('common.question_mark') }}
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
import wallet from 'wallet'
import server from 'server'

export default {
  data() {
    return {
      fromAddress: '',
      fetchedUtxo: false,
      address: '',
      amount: '',
      fee: '',
      confirmAddressDialog: false,
      repeatAddress: '',
      confirmSendDialog: false,
      rawTx: 'loading...',
      canSend: false,
      sending: false
    }
  },
  computed: {
    notValid: function() {
      //@todo valid the address
      let amountCheck = /^\d+\.?\d*$/.test(this.amount) && this.amount > 0
      let feeCheck = /^\d+\.?\d*$/.test(this.fee) && this.fee > 0.0001
      return !(amountCheck && feeCheck)
    }
  },
  methods: {
    fetchUtxo: function() {
      server.currentNode().getUtxList(this.fromAddress, (data) => {
        this.fetchedUtxo = btoa(JSON.stringify(data))
      })
    },

    send: function() {
      this.confirmAddressDialog = true
      this.canSend = false
    },

    confirmAddress: function() {
      if (this.address != this.repeatAddress) {
        notify.error('address_is_not_same_as_the_old_one')
        return false
      }
      this.confirmAddressDialog = false
      this.confirmSendDialog = true
      let wallet = webWallet.getWallet()
      wallet.generateTx(this.address, this.amount, this.fee, rawTx => {
        this.rawTx = rawTx
        this.canSend = true
      })
    },

    confirmSend: function() {
      let wallet = webWallet.getWallet()
      this.sending = true
      wallet.sendRawTx(this.rawTx, txId => {
        this.confirmSendDialog = false
        this.sending = false
        notify.success('Successful send. You can view at ' + server.currentNode().getTxExplorerUrl(txId))
        this.$emit('send')
      })
    }
  }
}
</script>
