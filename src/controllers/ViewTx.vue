<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('view_tx.title') }}</span>
    </v-card-title>
    <v-card-text>
      <p>{{ $t('view_tx.recent') }}</p>
      <div v-for="(tx, id) in txList.txs" :key="id">
        <v-layout style="border-bottom: 1px dashed">
          <v-flex xs10>
            {{ $t('view_tx.tx') }}
            <v-btn small light :href="node.getTxExplorerUrl(tx.txid)" target="_blank">
              {{tx.txid}}
            </v-btn>
          </v-flex>
          <v-flex xs2>
            {{ $t('view_tx.mined_at') }}{{new Date(tx.time * 1000).toString()}}
          </v-flex>
        </v-layout>
        <v-layout style="border-bottom: 1px dashed">
          <v-flex xs3>
            <p v-for="(vtx, vid) in tx.vin" :key="vid" :class="vtx.addr === wallet.info.address ? 'red--text' : ''" style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>
              {{vtx.addr}}
            </p>
          </v-flex>
          <v-flex xs1 text-xs-right>
            <p v-for="(vtx, vid) in tx.vin" :key="vid" :class="vtx.addr === wallet.info.address ? 'red--text' : ''">
              {{vtx.value}}
            </p>
          </v-flex>
          <v-flex xs1>
            <p v-for="(vtx, vid) in tx.vin" :key="vid" :class="vtx.addr === wallet.info.address ? 'red--text' : ''">
              &nbsp;QTUM
            </p>
          </v-flex>
          <v-flex xs1>
            =&gt;
          </v-flex>
          <v-flex xs3>
            <p v-for="(vtx, vid) in tx.vout" :key="vid" :class="vtx.scriptPubKey.addresses && vtx.scriptPubKey.addresses[0] === wallet.info.address ? 'green--text' : ''" style='overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>
              <template v-if="vtx.scriptPubKey.addresses">
                {{vtx.scriptPubKey.addresses.join(' ')}}
              </template>
            </p>
          </v-flex>
          <v-flex xs2 text-xs-right>
            <p v-for="(vtx, vid) in tx.vout" :key="vid" :class="vtx.scriptPubKey.addresses && vtx.scriptPubKey.addresses[0] === wallet.info.address ? 'green--text' : ''">
              <template v-if="vtx.scriptPubKey.addresses">
                {{vtx.value}}
              </template>
            </p>
          </v-flex>
          <v-flex xs1>
            <p v-for="(vtx, vid) in tx.vout" :key="vid" :class="vtx.scriptPubKey.addresses && vtx.scriptPubKey.addresses[0] === wallet.info.address ? 'green--text' : ''">
              <template v-if="vtx.scriptPubKey.addresses">
                QTUM
              </template>
            </p>
          </v-flex>
        </v-layout>
        <v-layout style="border-bottom: 1px solid">
          <v-flex xs4>
            <v-chip label outline class="white--text">
              {{ $t('view_tx.total_in') }}{{tx.valueIn}}
            </v-chip>
          </v-flex>
          <v-flex xs4>
            <v-chip label outline class="white--text">
              {{ $t('view_tx.fee') }}{{tx.fees}}
            </v-chip>
          </v-flex>
          <v-flex xs4>
            <v-chip label outline class="white--text">
              {{ $t('view_tx.total_out') }}{{tx.valueOut}}
            </v-chip>
          </v-flex>
        </v-layout>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import webWallet from 'libs/web-wallet'
import server from 'libs/server'

export default {
  data() {
    return {
      wallet: webWallet.getWallet(),
      node: server.currentNode()
    }
  },
  props: ['view'],
  watch: {
    view: function() {
      this.wallet.setTxList()
    }
  },
  computed: {
    txList: function() {
      return this.wallet.txList
    },
  }
}
</script>
