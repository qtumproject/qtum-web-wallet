<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("nft.create_title") }}</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <uploader :options="options">
          <uploader-unsupport></uploader-unsupport>
          <uploader-btn class="nft-img__upload" :single="false" :attrs="attrs">
            <div v-if="!isUpload">
              <v-icon class="nft-img__upload-add">add</v-icon>
            </div>
            <img
              v-if="isUpload"
              :src="uploadUrl"
              class="nft-img__img"
              alt="img"
            />
          </uploader-btn>
        </uploader>
        <v-text-field
          :label="$t('nft.create_name')"
          v-model.trim="name"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          :label="$t('nft.create_desc')"
          v-model.trim="desc"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          :label="$t('nft.create_supply')"
          v-model="totalSupply"
          :rules="[rules.required, rules.totalSupply]"
          required
        ></v-text-field>
        <v-text-field
          label="Gas Price (1e-8 QTUM/gas)"
          v-model.trim="gasPrice"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          label="Gas Limit"
          v-model.trim="gasLimit"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          label="Fee"
          v-model.trim="fee"
          :rules="[rules.required]"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="success" dark @click="handleSend" :disabled="notValid">{{
        $t("common.confirm")
      }}</v-btn>
    </v-card-actions>
    <v-dialog v-model="confirmSendDialog" persistent max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{ $t("create_token.confirm") }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-textarea
                  label="Raw Tx"
                  v-model="rawTx"
                  disabled
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { nftService } from "@/libs/nft";
import webWallet from "@/libs/web-wallet";
import server from "@/libs/server";

export default {
  data() {
    return {
      name: "",
      desc: "",
      totalSupply: 1,
      gasPrice: "40",
      gasLimit: "2500000",
      fee: "0.01",
      rawTx: "loading...",
      confirmSendDialog: false,
      notValid: false,
      isUpload: false,
      uploadUrl: "",
      wallet: webWallet.getWallet(),
      options: {
        target: "https://api.qtumwallet.org/picture/upload",
        testChunks: false,
        singleFile: true,
        processResponse: (res) => {
          this.handleFileComplete(res);
        },
      },
      attrs: {
        accept: "image/*",
      },
      rules: {
        required: (value) => !!value || "Required.",
        totalSupply: (value) => {
          const isValid = value <= 10 && value > 0 && value % 1 === 0;
          return isValid || "max value 10 and min value 1, must Integer";
        },
      },
    };
  },

  methods: {
    async handleSend() {
      try {
        const {
          info: { address },
        } = this.wallet;
        if (
          address &&
          this.name &&
          this.desc &&
          10 >= this.totalSupply > 0 &&
          this.totalSupply % 1 === 0
        ) {
          const res = await nftService.createNFT(
            address,
            this.name,
            this.uploadUrl,
            this.desc,
            this.totalSupply,
            this.gasPrice,
            this.gasLimit,
            this.fee
          );
          const txViewUrl = server.currentNode().getTxExplorerUrl(res.txId);
          if (txViewUrl) {
            this.$root.success(
              `Successful send. You can view wallet into <a href="${txViewUrl}">${txViewUrl}</a>`,
              true,
              0
            );
          } else {
            this.$root.error(`Send Failed : tx is fail`, true, 0);
          }
        }
      } catch (error) {
        this.$root.error(`Send Failed : ${error.message}`, true, 0);
      }
    },

    handleFileComplete(res) {
      const url = JSON.parse(res).url;
      this.uploadUrl = url;
      this.isUpload = true;
    },
  },
};
</script>

<style lang="less" scoped>
.nft-img {
  &__upload {
    border: 2px dashed rgb(204, 204, 204);
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    &-add {
      font-size: 34px;
    }
  }

  &__img {
    width: 140px;
    height: 140px;
  }
}
</style>

