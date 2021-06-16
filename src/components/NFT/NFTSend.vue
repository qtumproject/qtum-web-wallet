<template>
  <v-layout row justify-center>
    <v-dialog v-model="isOpen" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">转移NFT</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="地址"
                  v-model.trim="to"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  type="number"
                  label="数量"
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
          <v-btn color="blue darken-1" flat @click="handleClose()">关闭</v-btn>
          <v-btn color="blue darken-1" flat @click="handleConfirmSend()"
            >确认</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { nftService } from "@/libs/nft";
import webWallet from "@/libs/web-wallet";

export default {
  props: {
    isOpen: Boolean,
    count: Number,
    tokenId: String,
  },
  data() {
    return {
      gasPrice: "40",
      gasLimit: "2500000",
      fee: "0.01",
      to: "",
      sendCount: 0,
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) =>
          (value > 0 && value <= this.count) || `count max ${this.count}`,
      },
    };
  },

  methods: {
    handleClose() {
      this.$emit("close");
    },
    async handleConfirmSend() {
      console.log(this.tokenId);
      const wallet = webWallet.getWallet();
      const {
        info: { address },
      } = wallet;
      await nftService.safeTransferFrom(
        address,
        this.to,
        this.tokenId,
        this.sendCount
      );
      this.$emit("close");
    },
  },
};
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

