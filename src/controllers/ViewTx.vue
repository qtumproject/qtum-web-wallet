<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("view_tx.title") }}</span>
    </v-card-title>
    <v-card-text>
      <p>{{ $t("view_tx.recent") }}</p>
      <div v-for="(tx, id) in txList" :key="id">
        <v-layout style="border-bottom: 1px dashed">
          <v-flex xs10>
            {{ $t("view_tx.tx") }}
            <v-btn
              small
              light
              :href="node.getTxExplorerUrl(tx.id)"
              target="_blank"
            >
              {{ tx.id }}
            </v-btn>
          </v-flex>
          <v-flex xs2>
            {{ $t("view_tx.mined_at")
            }}{{ new Date(tx.timestamp * 1000).toString() }}
          </v-flex>
        </v-layout>
        <v-layout style="border-bottom: 1px dashed">
          <v-flex xs3>
            <p
              v-for="(vtx, vid) in tx.inputs"
              :key="vid"
              :class="vtx.address === wallet.info.address ? 'red--text' : ''"
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ vtx.address }}
            </p>
          </v-flex>
          <v-flex xs1 text-xs-right>
            <p
              v-for="(vtx, vid) in tx.inputs"
              :key="vid"
              :class="vtx.address === wallet.info.address ? 'red--text' : ''"
            >
              {{ Wallet.changeUnitFromSatTo1(vtx.value) }}
            </p>
          </v-flex>
          <v-flex xs1>
            <p
              v-for="(vtx, vid) in tx.inputs"
              :key="vid"
              :class="vtx.address === wallet.info.address ? 'red--text' : ''"
            >
              &nbsp;QTUM
            </p>
          </v-flex>
          <v-flex xs1> =&gt; </v-flex>
          <v-flex xs3>
            <p
              v-for="(vtx, vid) in tx.outputs"
              :key="vid"
              :class="vtx.address === wallet.info.address ? 'green--text' : ''"
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              <template v-if="vtx.address">
                {{ vtx.address }}
              </template>
            </p>
          </v-flex>
          <v-flex xs2 text-xs-right>
            <p
              v-for="(vtx, vid) in tx.outputs"
              :key="vid"
              :class="vtx.address === wallet.info.address ? 'green--text' : ''"
            >
              <template v-if="vtx.address">
                {{ Wallet.changeUnitFromSatTo1(vtx.value) }}
              </template>
            </p>
          </v-flex>
          <v-flex xs1>
            <p
              v-for="(vtx, vid) in tx.outputs"
              :key="vid"
              :class="vtx.address === wallet.info.address ? 'green--text' : ''"
            >
              <template v-if="vtx.address"> QTUM </template>
            </p>
          </v-flex>
        </v-layout>
        <v-layout style="border-bottom: 1px solid">
          <v-flex xs4>
            <v-chip label outline class="white--text">
              {{ $t("view_tx.total_in")
              }}{{ Wallet.changeUnitFromSatTo1(tx.inputValue) }}
            </v-chip>
          </v-flex>
          <v-flex xs4>
            <v-chip label outline class="white--text">
              {{ $t("view_tx.fee") }}{{ Wallet.changeUnitFromSatTo1(tx.fees) }}
            </v-chip>
          </v-flex>
          <v-flex xs4>
            <v-chip label outline class="white--text">
              {{ $t("view_tx.total_out")
              }}{{ Wallet.changeUnitFromSatTo1(tx.outputValue) }}
            </v-chip>
          </v-flex>
        </v-layout>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import webWallet from '@/libs/web-wallet'
import Wallet from '@/libs/wallet'
import server from '@/libs/server'

export default {
  data() {
    return {
      wallet: webWallet.getWallet(),
      node: server.currentNode(),
      Wallet
    }
  },
  props: ['view'],
  watch: {
    view: function () {
      this.wallet.setTxList()
    }
  },
  computed: {
    txList: function () {
      return this.wallet.txList
    }
  },
  mounted() {
    this.wallet.update()
  }
}
</script>
