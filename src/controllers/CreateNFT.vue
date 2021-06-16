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
            <div v-if="!isUpload">select img</div>
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
          v-model.trim="totalSupply"
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
      totalSupply: 0,
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
        target: "https://qtumwallet.org/api/upload",
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
        totalSupply: (value) =>
          (value <= 10 && value > 0) || "max value 10 and min value 1",
      },
    };
  },

  methods: {
    async handleSend() {
      try {
        const { info: {
          address
        } } = this.wallet;
        const res = await nftService.createNFT(address, this.name, this.uploadUrl, this.desc, this.totalSupply);
        const txViewUrl = server.currentNode().getTxExplorerUrl(res.txId);
        this.$root.success(
          `Successful send. You can view wallet into <a href="${txViewUrl} ${txViewUrl}`,
          true,
          0
        );
      } catch (error) {
        this.$root.error(`Send Failed : ${error.message}`, true, 0);
      }
    },

    handleFileComplete(res) {
      const url = JSON.parse(res).data.url;
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
  }

  &__img {
    width: 140px;
    height: 140px;
  }
}
</style>

