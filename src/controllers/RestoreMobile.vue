<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("restore_mobile.title") }}</span>
    </v-card-title>
    <v-card-text>
      <mnemonic @mnemonic="restore" v-show="this.restored === false"></mnemonic>
      <v-data-table
        :headers="headers"
        :items="walletList"
        no-data-text="Loading"
        v-if="this.restored"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.wallet.getAddress() }}</td>
          <td class="text-xs-right">{{ props.item.wallet.info.balance }}</td>
          <td class="text-xs-right">
            <v-btn @click="choose(props.item.path)" color="success">
              Choose
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import mnemonic from '@/components/Mnemonic'
import webWallet from '@/libs/web-wallet'
import track from '@/libs/track'

export default {
  data() {
    return {
      walletList: [],
      restored: false,
      headers: [
        { text: 'Address', value: 'address', align: 'left', sortable: false },
        { text: 'Balance', value: 'balance', sortable: false },
        { text: '', value: '', sortable: false }
      ]
    }
  },
  components: {
    mnemonic
  },
  methods: {
    restore(mnemonic) {
      this.restored = true
      setTimeout(() => {
        this.walletList = webWallet.restoreFromMobile(mnemonic)
      }, 10)
      track.trackStep('restore_from_mobile', 1, 2)
    },
    choose(path) {
      webWallet.chooseMobileWallet(this.walletList, path)
      track.trackDone('restore_from_mobile')
      this.$emit('restored')
    }
  }
}
</script>
