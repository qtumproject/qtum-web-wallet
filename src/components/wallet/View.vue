<template>
  <v-card class="pb-5" style="text-align: center">
    <h3 class="pa-5">{{ $t('view.title') }}</h3>
    <v-container style="text-align:left">
      <h5 class="pa-1">{{ $t('view.recent') }}</h5>
      <div v-for="(tx, id) in txList.txs" :key="id">
        <v-layout style="border-bottom: 1px dashed">
          <v-flex xs10>
            {{ $t('view.tx') }}
            <v-chip label>
              {{tx.txid}}
            </v-chip>
          </v-flex>
          <v-flex xs2>
            {{ $t('view.mined_at') }}{{new Date(tx.time * 1000).toString()}}
          </v-flex>
        </v-layout>
        <v-layout style="border-bottom: 1px dashed">
          <v-flex xs3>
            <p v-for="(vtx, vid) in tx.vin" :key="vid" :class="vtx.addr == wallet.info.address ? 'red--text' : ''">
              {{vtx.addr}}
            </p>
          </v-flex>
          <v-flex xs1 text-xs-right>
            <p v-for="(vtx, vid) in tx.vin" :key="vid" :class="vtx.addr == wallet.info.address ? 'red--text' : ''">
              {{vtx.value}}
            </p>
          </v-flex>
          <v-flex xs1>
            <p v-for="(vtx, vid) in tx.vin" :key="vid" :class="vtx.addr == wallet.info.address ? 'red--text' : ''">
              &nbsp;QTUM
            </p>
          </v-flex>
          <v-flex xs1>
            =&gt;
          </v-flex>
          <v-flex xs3>
            <p v-for="(vtx, vid) in tx.vout" :key="vid" :class="vtx.scriptPubKey.addresses[0] == wallet.info.address ? 'green--text' : ''">
              {{vtx.scriptPubKey.addresses.join(' ')}}
            </p>
          </v-flex>
          <v-flex xs2 text-xs-right>
            <p v-for="(vtx, vid) in tx.vout" :key="vid" :class="vtx.scriptPubKey.addresses[0] == wallet.info.address ? 'green--text' : ''">
              {{vtx.value}}
            </p>
          </v-flex>
          <v-flex xs1>
            <p v-for="(vtx, vid) in tx.vout" :key="vid" :class="vtx.scriptPubKey.addresses[0] == wallet.info.address ? 'green--text' : ''">
              &nbsp;QTUM
            </p>
          </v-flex>
        </v-layout>
        <v-layout style="border-bottom: 1px solid">
          <v-flex xs4>
            <v-chip label outline>
              {{ $t('view.total_in') }}{{tx.valueIn}}
            </v-chip>
          </v-flex>
          <v-flex xs4>
            <v-chip label outline>
              {{ $t('view.fee') }}{{tx.fees}}
            </v-chip>
          </v-flex>
          <v-flex xs4>
            <v-chip label outline>
              {{ $t('view.total_out') }}{{tx.valueOut}}
            </v-chip>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import webWallet from '../../web-wallet'

export default {
  data() {
    return {
      wallet: webWallet.getWallet(),
    }
  },
  computed: {
    txList: function() {
      return this.wallet.txList
    },
  }
}
</script>
