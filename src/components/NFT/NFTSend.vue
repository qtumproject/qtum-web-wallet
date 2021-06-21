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
                  v-model.trim="to"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  type="number"
                  :label="$t('nft.send_amount')"
                  v-model.trim="sendCount"
                  :rules="[rules.required, rules.counter]"
                ></v-text-field>
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
          const isValid = value <= 10 && value > 0 && value % 1 === 0
          return isValid || 'max value 10 and min value 1, must Integer'
        }
      }
    }
  },

  methods: {
    handleClose() {
      this.$emit('close')
    },
    async handleConfirmSend() {
      this.wallet = webWallet.getWallet()
      const {
        info: { address }
      } = this.wallet
      if (
        address &&
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
}
</style>

