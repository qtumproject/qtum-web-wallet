<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('send_to_contract.title') }}</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Contract Address"
          v-model="contractAddress"
          required
        ></v-text-field>
        <v-text-field
          label="ABI"
          v-model="abi"
          required
          multiLine
          @input="decodeAbi"
        ></v-text-field>
        <v-select
          v-if="parsedAbi"
          :items="parsedAbi"
          label="Method"
          v-model="method"
          single-line
          bottom
        ></v-select>
        <template v-if="params">
          <v-text-field
            v-for="(param, index) in params"
            :label="param.name"
            :key="index"
            v-model="inputParams[index]"
          ></v-text-field>
        </template>
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
            {{ $t('send_to_contract.confirm') }}
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
import abi from 'ethjs-abi'
import server from 'libs/server'

export default {
  data () {
    return {
      contractAddress: '127714c70005b0e1c5a5e1f2769b64818a5d73c7',
      //encodedData: 'c04a87d10000000000000000000000000000000000000000000000000000000000000005',
      abi: '[{"constant":false,"inputs":[{"name":"_x","type":"uint8"}],"name":"setA","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getA","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
      parsedAbi: null,
      method: null,
      inputParams: [],
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
    params: function() {
      if (this.method === null) {
        return null
      }
      let inputs = this.parsedAbi[this.method].info.inputs
      if (inputs.length > 0) {
        return inputs
      }
      return null
    },
    notValid: function() {
      //@todo valid the address
      let gasPriceCheck = /^\d+\.?\d*$/.test(this.gasPrice) && this.gasPrice > 0
      let gasLimitCheck = /^\d+\.?\d*$/.test(this.gasLimit) && this.gasLimit > 0
      let feeCheck = /^\d+\.?\d*$/.test(this.fee) && this.fee > 0.0001
      return !(gasPriceCheck && gasLimitCheck && feeCheck && this.method !== null)
    }
  },
  watch: {
    method: function() {
      this.inputParams = []
    }
  },
  methods: {
    decodeAbi() {
      let abiJson = {}
      try {
        abiJson = JSON.parse(this.abi)
      }
      catch (e) {
        return true
      }
      this.parsedAbi = []
      for (let i = 0; i < abiJson.length; i++) {
        this.parsedAbi[i] = {text: abiJson[i]['name'], value: i, info: abiJson[i]}
      }
    },
    send() {
      let encodedData = ''
      try {
        encodedData = abi.encodeMethod(this.parsedAbi[this.method].info, this.inputParams).substr(2)
      }
      catch (e) {
        this.$root.error('Params error')
        return false
      }
      this.confirmSendDialog = true
      let wallet = webWallet.getWallet()
      wallet.generateSendToContractTx(this.contractAddress, encodedData, this.gasLimit, this.gasPrice, this.fee, rawTx => {
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
