<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("send_to_contract.title") }}</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Contract Address"
          v-model.trim="contractAddress"
          required
        ></v-text-field>
        <v-text-field
          label="ABI"
          v-model.trim="abi"
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
            {{ $t("send_to_contract.confirm") }}
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
import abi from 'ethjs-abi'

export default {
  data() {
    return {
      contractAddress: '',
      abi: '',
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
      const inputs = this.parsedAbi[this.method].info.inputs
      if (inputs.length > 0) {
        return inputs
      }
      return null
    },
    notValid: function() {
      //@todo valid the address
      const gasPriceCheck =
        /^\d+\.?\d*$/.test(this.gasPrice) && this.gasPrice > 0
      const gasLimitCheck =
        /^\d+\.?\d*$/.test(this.gasLimit) && this.gasLimit > 0
      const feeCheck = /^\d+\.?\d*$/.test(this.fee) && this.fee > 0.0001
      return !(
        gasPriceCheck &&
        gasLimitCheck &&
        feeCheck &&
        this.method !== null
      )
    }
  },
  watch: {
    method: function() {
      this.inputParams = []
    }
  },
  methods: {
    decodeAbi() {
      try {
        const abiJson = JSON.parse(this.abi)
        this.parsedAbi = []
        for (let i = 0; i < abiJson.length; i++) {
          // 过滤 constructor & event
          if (abiJson[i].type === 'constructor' || abiJson[i].type === 'event')
            continue
          this.parsedAbi.push({
            text: abiJson[i]['name'],
            value: i,
            info: abiJson[i]
          })
        }
      } catch (e) {
        this.$root.log.error(
          'send_to_contract_decode_abi_error',
          e.stack || e.toString() || e
        )
        return true
      }
    },
    async send() {
      try {
        const encodedData = abi
          .encodeMethod(this.parsedAbi[this.method].info, this.inputParams)
          .substr(2)
        this.confirmSendDialog = true
        try {
          this.rawTx = await webWallet
            .getWallet()
            .generateSendToContractTx(
              this.contractAddress,
              encodedData,
              this.gasLimit,
              this.gasPrice,
              this.fee
            )
        } catch (e) {
          this.$root.log.error(
            'send_to_generate_tx_error',
            e.stack || e.toString() || e
          )
          alert(e.message || e)
          this.confirmSendDialog = false
          return false
        }
        this.canSend = true
      } catch (e) {
        this.$root.error('Params error')
        this.$root.log.error(
          'send_to_contract_encode_abi_error',
          e.stack || e.toString() || e
        )
        this.confirmSendDialog = false
        return false
      }
    },

    async confirmSend() {
      this.sending = true
      try {
        const res = await webWallet.getWallet().sendRawTx(this.rawTx)
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
          'send_to_contract_post_raw_tx_error',
          e.response || e.stack || e.toString() || e
        )
        this.confirmSendDialog = false
      }
    }
  }
}
</script>
