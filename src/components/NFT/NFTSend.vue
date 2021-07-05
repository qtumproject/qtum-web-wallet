<template>
  <v-layout row justify-center>
    <v-dialog v-model="isOpen" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t("nft.send_nft") }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  :label="$t('nft.send_address')"
                  :rules="[rules.required]"
                  v-model.trim="to"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs10>
                <div class="nft-send__amount-wrapper">
                  <input type="number" :placeholder="$t('nft.send_amount')" v-model.number="sendCount" @input="handleInputAmount" class="nft-send__amount" />
                </div>
              </v-flex>
              <v-flex xs2 class="nft-send__count" error-messages="countMessage">
                <span>{{ count }}</span>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Gas Price"
                  v-model.trim="gasPrice"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Gas Limit"
                  v-model.trim="gasLimit"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="fee"
                  v-model.trim="fee"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="handleClose()">{{
            $t("nft.close_confirm")
          }}</v-btn>
          <v-btn color="blue darken-1" flat @click="handleConfirmSend()">{{
            $t("nft.send_confirm")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { nftService } from '@/libs/nft'
import webWallet from '@/libs/web-wallet'
import server from '@/libs/server'

export default {
  props: {
    isOpen: Boolean,
    count: Number,
    tokenId: String
  },
  data() {
    return {
      gasPrice: '40',
      gasLimit: '2500000',
      fee: '0.01',
      to: '',
      sendCount: 1,
      wallet: webWallet.getWallet(),
      rules: {
        required: (value) => !!value || 'Required.',
        counter: (value) => {
          const isValid = value <= this.count && value > 0 && value % 1 === 0
          return isValid || `max value ${this.count} and min value 1, must Integer`
        }
      }
    }
  },

  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleInputAmount(e) {
      const val = parseInt(e.target.value)
      const oldVal = this.sendCount
      if (val < 1) {
        this.sendCount = 1
        return false
      }
      if (!val) {
        this.sendCount = oldVal
        return false
      }
      if (val > this.count) {
        this.sendCount = 9
        this.$emit('input', this.sendCount)
        return false
      }
      this.sendCount = val
    },
    async handleConfirmSend() {
      this.wallet = webWallet.getWallet()
      const {
        info: { address }
      } = this.wallet
      if (
        address &&
        this.wallet.validateAddress(address) &&
        this.to &&
        this.tokenId !== '' &&
        this.count >= this.sendCount > 0 &&
        this.count % 1 === 0
      ) {
        try {
          const res = await nftService.safeTransferFrom(
            address,
            this.to,
            this.tokenId,
            this.sendCount
          )
          const txViewUrl = server.currentNode().getTxExplorerUrl(res.txId)
          if (txViewUrl) {
            this.$root.success(
              `Successful send. You can view wallet into <a href="${txViewUrl}">${txViewUrl}</a>`,
              true,
              0
            )
            this.$emit('close')
          } else {
            this.$root.error('Send Failed : tx is fail', true, 0)
          }
        } catch (error) {
          this.$root.error(`Send Failed : ${error.message}`, true, 0)
        }
      } else {
        this.$root.error('Send Failed : check params is error', true, 0)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.nft-send {
  &__count {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__amount {
    &-wrapper {
      width: 100%;
      height: 48px;
      box-sizing: border-box;
      display: flex;
      align-items: flex-start;

    }
    width: 100%;
    height: 32px;
    border: none;
    outline: none;
    vertical-align: top;
    border-bottom: thin solid hsla(0, 0%, 100%, .7);
    transition: all .3s cubic-bezier(.25, .8, .5, 1);

    &:focus {
      color: #1976d2;
      border-bottom: thin solid #1976d2;
      &::placeholder {
        color: #1976d2;
        font-size: 16px;
      }
    }
    &::placeholder {
      color: hsla(0,0%,100%,.7);
      font-size: 16px;
    }
  }
}
</style>

