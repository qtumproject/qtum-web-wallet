<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("request_payment.title") }}</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Address"
          v-model="address"
          required
          disabled
          @input="drawQrCode"
        ></v-text-field>
        <v-text-field
          label="Amount"
          v-model.trim="amount"
          required
          @input="drawQrCode"
        ></v-text-field>
        <v-text-field
          label="Message"
          v-model="message"
          required
          @input="drawQrCode"
        ></v-text-field>
        <p class="text-xs-center">
          <img :src="qr" />
        </p>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import webWallet from '@/libs/web-wallet'
import qrcode from 'qrcode'

export default {
  data() {
    return {
      address: webWallet.getWallet().getAddress(),
      amount: '0.0',
      message: '',
      qr: ''
    }
  },
  methods: {
    drawQrCode() {
      qrcode.toDataURL(
        `qtum:${this.address}?amount=${this.amount}&message=${this.message}`,
        (err, url) => {
          this.qr = url
        }
      )
    }
  },
  mounted: function() {
    this.drawQrCode()
  }
}
</script>
