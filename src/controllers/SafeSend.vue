<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("safe_send.title") }}</span>
    </v-card-title>
    <v-card-text>
      <v-alert color="info" value="true">{{ $t("safe_send.info") }}</v-alert>
      <v-stepper non-linear vertical v-model="step">
        <v-stepper-step step="1" editable
          >Generate Base Info (At online computer)</v-stepper-step
        >
        <v-stepper-content step="1">
          <template v-if="mode === 'offline'">
            <v-alert color="info" value="true">{{
              $t("safe_send.info1_offline")
            }}</v-alert>
            <v-btn color="success" @click.native="step = 2">{{
              $t("common.next")
            }}</v-btn>
          </template>
          <template v-else>
            <v-alert color="info" value="true">{{
              $t("safe_send.info1_online")
            }}</v-alert>
            <v-text-field
              label="From Address"
              v-model.trim="fromAddress"
              required
            ></v-text-field>
            <v-text-field
              label="To Address"
              v-model.trim="toAddress"
              required
            ></v-text-field>
            <v-text-field
              label="Amount"
              v-model.trim="amount"
              required
            ></v-text-field>
            <v-text-field
              label="Fee"
              v-model.trim="fee"
              required
            ></v-text-field>
            <v-btn
              color="success"
              @click.native="confirmAddressDialog = true"
              :disabled="notValid"
            >
              {{ $t("common.confirm") }}
            </v-btn>
          </template>
        </v-stepper-content>

        <v-stepper-step step="2" editable
          >Generate Tx (At offline computer)</v-stepper-step
        >
        <v-stepper-content step="2">
          <template v-if="mode === 'offline'">
            <v-alert color="info" value="true">{{
              $t("safe_send.info2_offline")
            }}</v-alert>
            <template v-if="!fileParsed">
              <file-reader @upload="handleFile" color="info"></file-reader>
            </template>
            <template v-if="fileParsed">
              <v-layout>
                <v-flex xs3>
                  <v-subheader>{{ $t("safe_send.from_address") }}</v-subheader>
                </v-flex>
                <v-flex xs7>
                  <v-text-field v-model="fromAddress" disabled></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs3>
                  <v-subheader>{{ $t("safe_send.to_address") }}</v-subheader>
                </v-flex>
                <v-flex xs7>
                  <v-text-field v-model="toAddress" disabled></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs3>
                  <v-subheader>{{ $t("safe_send.amount") }}</v-subheader>
                </v-flex>
                <v-flex xs7>
                  <v-text-field v-model="amount" disabled></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs3>
                  <v-subheader>{{ $t("safe_send.fee") }}</v-subheader>
                </v-flex>
                <v-flex xs7>
                  <v-text-field v-model="fee" disabled></v-text-field>
                </v-flex>
              </v-layout>
              <v-btn
                color="success"
                @click.native="confirmAddressDialog = true"
                >{{ $t("common.confirm") }}</v-btn
              >
            </template>
          </template>
          <template v-else>
            <v-alert color="info" value="true">{{
              $t("safe_send.info2_online")
            }}</v-alert>
            <v-btn color="success" @click.native="step = 3">{{
              $t("common.next")
            }}</v-btn>
          </template>
        </v-stepper-content>

        <v-stepper-step step="3" editable
          >Broadcast Tx (At online computer)</v-stepper-step
        >
        <v-stepper-content step="3">
          <template v-if="mode === 'offline'">
            <v-alert color="info" value="true">{{
              $t("safe_send.info3_offline")
            }}</v-alert>
          </template>
          <template v-else>
            <v-alert color="info" value="true">{{
              $t("safe_send.info3_online")
            }}</v-alert>
            <template v-if="!fileParsed">
              <file-reader @upload="handleFile" color="info"></file-reader>
            </template>
            <template v-if="fileParsed">
              <v-layout>
                <v-flex xs3>
                  <v-subheader>{{ $t("safe_send.from_address") }}</v-subheader>
                </v-flex>
                <v-flex xs7>
                  <v-text-field v-model="fromAddress" disabled></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs3>
                  <v-subheader>{{ $t("safe_send.to_address") }}</v-subheader>
                </v-flex>
                <v-flex xs7>
                  <v-text-field v-model="toAddress" disabled></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs3>
                  <v-subheader>{{ $t("safe_send.amount") }}</v-subheader>
                </v-flex>
                <v-flex xs7>
                  <v-text-field v-model="amount" disabled></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs3>
                  <v-subheader>{{ $t("safe_send.fee") }}</v-subheader>
                </v-flex>
                <v-flex xs7>
                  <v-text-field v-model="fee" disabled></v-text-field>
                </v-flex>
              </v-layout>
              <v-btn
                color="success"
                @click.native="confirmAddressDialog = true"
                >{{ $t("common.confirm") }}</v-btn
              >
            </template>
          </template>
        </v-stepper-content>
      </v-stepper>
    </v-card-text>
    <v-dialog v-model="confirmAddressDialog" persistent max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t("send.enter_address") }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="To Address"
                  v-model.trim="repeatToAddress"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click="confirmAddress">{{
            $t("common.confirm")
          }}</v-btn>
          <v-btn
            class="red--text darken-1"
            flat
            @click.native="confirmAddressDialog = false"
            >{{ $t("common.cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmSendDialog" persistent max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{ $t("send.going_to_send") }}
            <v-chip label>{{ this.amount }}QTUM</v-chip>
            {{ $t("send.to_address") }}
            <v-chip label>{{ this.toAddress }}</v-chip>
            {{ $t("common.question_mark") }}
          </span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click="confirmSend">{{
            $t("common.confirm")
          }}</v-btn>
          <v-btn
            class="red--text darken-1"
            flat
            @click.native="confirmSendDialog = false"
            >{{ $t("common.cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import fileSaver from 'file-saver'
import webWallet from '@/libs/web-wallet'
import wallet from '@/libs/wallet'
import server from '@/libs/server'
import config from '@/libs/config'

import FileReader from '@/components/FileReader'

export default {
  data() {
    return {
      mode: config.getMode(),
      step: 1,
      fromAddress: '',
      toAddress: '',
      amount: '',
      fee: '',
      utxo: [],
      confirmAddressDialog: false,
      repeatToAddress: '',
      confirmSendDialog: false,
      fileParsed: false,
      rawTx: 'loading...',
      canSend: false,
      sending: false
    }
  },
  computed: {
    notValid: function() {
      //@todo valid the address
      const amountCheck = /^\d+\.?\d*$/.test(this.amount) && this.amount > 0
      const feeCheck = /^\d+\.?\d*$/.test(this.fee) && this.fee > 0.0001
      return !(amountCheck && feeCheck && this.fromAddress && this.toAddress)
    }
  },
  components: {
    FileReader
  },
  methods: {
    async createInfoFile() {
      this.step = 2
      this.confirmSendDialog = false
      const utxoList = await server.currentNode().getUtxoList(this.fromAddress)
      const saveInfo = JSON.stringify({
        from: this.fromAddress,
        to: this.toAddress,
        amount: this.amount,
        fee: this.fee,
        utxo: utxoList
      })
      const blob = new Blob([saveInfo], {
        type: 'text/plain;charset=utf-8'
      })
      fileSaver.saveAs(
        blob,
        this.fromAddress + '_' + new Date().getTime() + '.raw'
      )
    },

    async createTxFile() {
      this.step = 3
      this.confirmSendDialog = false
      const offLineWallet = webWallet.getWallet()
      const rawTx = await wallet.generateTx(
        offLineWallet,
        this.toAddress,
        this.amount,
        this.fee,
        this.utxo
      )
      const saveInfo = JSON.stringify({
        from: this.fromAddress,
        to: this.toAddress,
        amount: this.amount,
        fee: this.fee,
        rawTx
      })
      fileSaver.saveAs(
        new Blob([saveInfo], {
          type: 'text/plain;charset=utf-8'
        }),
        this.fromAddress + '_' + new Date().getTime() + '.tx'
      )
    },

    handleFile(file) {
      try {
        const info = JSON.parse(file.content)
        this.fromAddress = info.from
        this.toAddress = info.to
        this.amount = info.amount
        this.fee = info.fee
        if (this.mode === 'offline') {
          this.utxo = info.utxo
          const offLineWallet = webWallet.getWallet()
          if (offLineWallet.getAddress() !== this.fromAddress) {
            this.$root.error('from_address_is_not_same_as_the_wallet')
            return false
          }
        } else {
          if (!info.rawTx) {
            this.$root.error('file parse fail')
            return false
          }
          this.rawTx = info.rawTx
        }
        this.fileParsed = true
      } catch (e) {
        this.$root.error('file parse fail')
        this.$root.log.error(
          'safe_send_file_parse_error',
          e.stack || e.toString() || e
        )
        return false
      }
    },

    confirmAddress() {
      if (this.toAddress !== this.repeatToAddress) {
        this.$root.error('address_is_not_same_as_the_old_one')
        return false
      }
      this.confirmAddressDialog = false
      this.confirmSendDialog = true
    },

    async confirmSend() {
      if (this.step === 1) {
        await this.createInfoFile()
      } else if (this.step === 2) {
        await this.createTxFile()
      } else if (this.step === 3) {
        try {
          const res = await wallet.sendRawTx(this.rawTx)
          this.confirmSendDialog = false
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
        } catch (e) {
          alert(e.message || e)
          this.$root.log.error(
            'safe_send_post_raw_tx_error',
            e.response || e.stack || e.toString() || e
          )
          this.confirmSendDialog = false
        }
      }
    }
  }
}
</script>
