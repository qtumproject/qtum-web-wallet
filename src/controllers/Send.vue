<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("send.send_tokens") }}</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Address"
          v-model.trim="address"
          required
        ></v-text-field>
        <v-layout>
          <v-flex xs9>
            <v-text-field
              label="Amount"
              v-model.trim="amount"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-select :items="tokens" v-model="symbol" bottom>
              <template slot="item" slot-scope="data">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ data.item.text
                    }}{{ data.item.name ? "(" + data.item.name + ")" : "" }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{ data.item.address }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </v-select>
          </v-flex>
        </v-layout>
        <v-text-field
          v-if="symbol !== 'QTUM'"
          label="Gas Price (1e-8 QTUM/gas)"
          v-model="gasPrice"
        ></v-text-field>
        <v-text-field
          v-if="symbol !== 'QTUM'"
          label="Gas Limit"
          v-model="gasLimit"
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
                  label="Address"
                  v-model.trim="repeatAddress"
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
            >{{ $t("common.cancel") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmSendDialog" persistent max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{ $t("send.going_to_send") }}
            <v-chip label>{{ this.amount }}{{ this.symbol }}</v-chip>
            {{ $t("send.to_address") }}
            <v-chip label>{{ this.address }}</v-chip>
            {{ $t("common.question_mark") }}
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
          >
            {{ $t("common.confirm") }}
          </v-btn>
          <v-btn
            class="red--text darken-1"
            flat
            @click.native="confirmSendDialog = false"
            :v-show="!sending"
          >
            {{ $t("common.cancel") }}
          </v-btn>
          <v-progress-circular
            indeterminate
            :size="50"
            v-show="sending"
            class="primary--text"
          ></v-progress-circular>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addTokenDialog" persistent max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">
            Token
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  :label="$t('send.token_address')"
                  v-model.trim="addTokenAddress"
                  :disabled="addTokenStep === 2"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Name"
                  v-model.trim="addTokenName"
                  disabled
                  v-if="addTokenStep === 2"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Symbol"
                  v-model.trim="addTokenSymbol"
                  disabled
                  v-if="addTokenStep === 2"
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
            @click="searchAddToken"
            :loading="addTokenLoading"
            v-if="addTokenStep === 1"
          >
            {{ $t("common.search") }}
          </v-btn>
          <v-btn
            class="blue--text darken-1"
            flat
            @click="confirmAddToken"
            v-if="addTokenStep === 2"
          >
            {{ $t("common.confirm") }}
          </v-btn>
          <v-btn
            class="red--text darken-1"
            flat
            @click.native="addTokenDialog = false"
          >
            {{ $t("common.cancel") }}
          </v-btn>
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
import qrc20 from '@/libs/qrc20'
import server from '@/libs/server'
import track from '@/libs/track'

export default {
  data() {
    return {
      address: '',
      amount: '',
      symbol: 'QTUM',
      tokens: [],
      addTokenStep: 1,
      addTokenDialog: false,
      addTokenLoading: false,
      addTokenName: '',
      addTokenSymbol: '',
      addTokenAddress: '',
      addTokenDecimals: 8,
      gasPrice: '40',
      gasLimit: '250000',
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
    notValid: function() {
      //@todo valid the address
      const amountCheck = /^\d+\.?\d*$/.test(this.amount) && this.amount > 0
      const feeCheck = /^\d+\.?\d*$/.test(this.fee) && this.fee > 0.0001
      return !(amountCheck && feeCheck)
    }
  },
  methods: {
    send() {
      this.confirmAddressDialog = true
      this.canSend = false
    },

    async confirmAddress() {
      if (this.address !== this.repeatAddress) {
        this.$root.error('address_is_not_same_as_the_old_one')
        return false
      }
      this.confirmAddressDialog = false
      this.confirmSendDialog = true
      const wallet = webWallet.getWallet()
      try {
        if (this.symbol == 'QTUM') {
          if (wallet.extend.ledger) {
            this.rawTx = 'Please confirm tx on your ledger...'
          }
          this.rawTx = await wallet.generateTx(
            this.address,
            this.amount,
            this.fee
          )
        } else if (qrc20.checkSymbol(this.symbol)) {
          if (wallet.extend.ledger) {
            this.rawTx = 'Please confirm tx on your ledger...'
          }
          const token = qrc20.getTokenBySymbol(this.symbol)
          const encodedData = qrc20.encodeSendData(
            token,
            this.address,
            this.amount
          )
          this.rawTx = await wallet.generateSendToContractTx(
            token.address,
            encodedData,
            this.gasLimit,
            this.gasPrice,
            this.fee
          )
        }
        this.canSend = true
        track.trackAction('preview', 'send', this.symbol)
      } catch (e) {
        alert(e.message || e)
        this.$root.log.error(
          'send_generate_tx_error',
          e.stack || e.toString() || e
        )
        track.trackException(
          `send: send_generate_tx_error: ${e.stack || e.toString() || e}`
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
        track.trackAction('done', 'send', this.symbol)
        this.$emit('send')
      } catch (e) {
        alert(e.message || e)
        this.$root.log.error(
          'send_post_raw_tx_error',
          e.response || e.stack || e.toString() || e
        )
        track.trackException(
          `send: send_post_raw_tx_error: ${e.response ||
            e.stack ||
            e.toString() ||
            e}`
        )
        this.confirmSendDialog = false
      }
    },

    async searchAddToken() {
      this.addTokenLoading = true
      try {
        const tokenInfo = await qrc20.fetchTokenInfo(this.addTokenAddress)
        this.addTokenName = tokenInfo.name
        this.addTokenSymbol = tokenInfo.symbol
        this.addTokenDecimals = tokenInfo.decimals
        track.trackAction(
          'addToken',
          'send',
          `${this.addTokenAddress}, ${tokenInfo.name}`
        )
      } catch (e) {
        this.addTokenLoading = false
        if (
          (e.response && e.response.status === 404) ||
          e.message === 'this contract is not a qrc20 token'
        ) {
          this.$root.error('token_contract_address_is_not_exists')
          this.$root.log.error(
            'token_contract_address_is_not_exists',
            this.addTokenAddress
          )
        } else {
          alert(e.message || e)
          this.addTokenDialog = false
        }
        return false
      }
      this.addTokenLoading = false
      this.addTokenStep = 2
    },

    confirmAddToken() {
      qrc20.addCustomToken(
        this.addTokenAddress,
        this.addTokenName,
        this.addTokenSymbol,
        this.addTokenDecimals
      )
      this.initTokens()
      this.symbol = this.addTokenSymbol
      this.addTokenStep = 1
      this.addTokenDialog = false
      this.addTokenAddress = ''
    },

    initTokens() {
      const tokenList = [{ text: 'QTUM', value: 'QTUM' }]
      qrc20.getTokenList().forEach(token => {
        tokenList[tokenList.length] = {
          text: token.symbol,
          value: token.symbol,
          name: token.name,
          address: token.address
        }
      })
      tokenList[tokenList.length] = { text: 'More...', value: 'more' }
      this.tokens = tokenList
    }
  },
  mounted() {
    this.initTokens()
  },
  watch: {
    symbol(to, from) {
      if (from === 'more') return true
      if (to === 'more') {
        this.$nextTick(() => {
          this.symbol = from
          this.addTokenDialog = true
        })
      }
    }
  }
}
</script>
