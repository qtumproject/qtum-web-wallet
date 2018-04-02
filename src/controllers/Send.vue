<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('send.send_tokens') }}</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Address"
          v-model="address"
          required
          ></v-text-field>
        <v-layout>
          <v-flex xs9>
            <v-text-field
              label="Amount"
              v-model="amount"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-select
              :items="tokens"
              v-model="symbol"
              single-line
              bottom
            ></v-select>
          </v-flex>
        </v-layout>
        <v-text-field
          v-if="symbol != 'QTUM'"
          label="Gas Price (1e-8 QTUM/gas)"
          v-model="gasPrice"
        ></v-text-field>
        <v-text-field
          v-if="symbol != 'QTUM'"
          label="Gas Limit"
          v-model="gasLimit"
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
            <v-chip label>{{this.amount}}{{this.symbol}}</v-chip>
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
import webWallet from 'libs/web-wallet'
import qrc20 from 'libs/qrc20'
import server from 'libs/server'

export default {
  data () {
    return {
      address: '',
      amount: '',
      symbol: 'QTUM',
      gasPrice: '40',
      gasLimit: '2500000',
      fee: '0.01',
      confirmAddressDialog: false,
      repeatAddress: '',
      confirmSendDialog: false,
      rawTx: 'loading...',
      canSend: false,
      sending: false
    }
  },
  computed: {
    tokens: function() {
      let tokenList = [{text: 'QTUM', value: 'QTUM'}]
      let wallet = webWallet.getWallet()
      if (!wallet.extend.ledger) {
        // todo ledger later support token
        qrc20.getTokenList().forEach((token) => {tokenList[tokenList.length] = {text: token.symbol, value: token.symbol}})
      }
      return tokenList
    },
    notValid: function() {
      //@todo valid the address
      let amountCheck = /^\d+\.?\d*$/.test(this.amount) && this.amount > 0
      let feeCheck = /^\d+\.?\d*$/.test(this.fee) && this.fee > 0.0001
      return !(amountCheck && feeCheck)
    }
  },
  methods: {
    send() {
      this.confirmAddressDialog = true
      this.canSend = false
    },

    async confirmAddress() {
      if(this.address != this.repeatAddress) {
        this.$root.error('address_is_not_same_as_the_old_one')
        return false
      }
      this.confirmAddressDialog = false
      this.confirmSendDialog = true
      let wallet = webWallet.getWallet()
      if (this.symbol == 'QTUM') {
        if (wallet.extend.ledger) {
          this.rawTx = 'Please confirm tx on your ledger...'
        }
        try {
          this.rawTx = await wallet.generateTxAsync(this.address, this.amount, this.fee)
          this.canSend = true
        } catch (e) {
          alert(e.message || e)
          this.confirmSendDialog = false
          return false
        }
      }
      else if (qrc20.checkSymbol(this.symbol)) {
        let token = qrc20.getTokenBySymbol(this.symbol)
        let encodedData = qrc20.encodeSendData(token, this.address, this.amount)
        wallet.generateSendToContractTx(token.address, encodedData, this.gasLimit, this.gasPrice, this.fee, rawTx => {
          this.rawTx = rawTx
          this.canSend = true
        })
      }
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
