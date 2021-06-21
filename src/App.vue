<template>
  <v-app dark>
    <v-navigation-drawer permanent clipped app>
      <v-list>
        <template v-for="(item, i) in menu">
          <v-divider
            dark
            v-if="item.divider"
            class="my-4"
            :key="i"
            v-show="!notShow[item.name]"
          ></v-divider>
          <v-list-tile
            :key="i"
            v-else
            @click="changeView(item.name)"
            active-class="grey darken-4"
            v-model="isCurrent[item.name]"
            v-show="!notShow[item.name]"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ $t("common.menu." + item.name) }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :class="headerClass" app fixed clipped-left>
      <span class="title">
        <i class="qtum-icon qtum-icon-logo"></i>
        <span class="text">QTUM</span>
        <span @click="changeView('settings')">
          --{{ $t("common." + network) }}
        </span>
        <v-btn flat @click="changeView('settings')" v-if="mode !== 'normal'">
          {{ $t("common.mode." + mode) }}
        </v-btn>
      </span>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid fill-height justify-center>
          <v-layout row wrap>
            <v-flex xs10 offset-xs1>
              <create-wallet
                :view="isCurrent['create']"
                @created="setWallet"
                v-show="isCurrent['create']"
              ></create-wallet>
              <create-mnemonic
                :view="isCurrent['create_from_mnemonic']"
                @created="setWallet"
                v-show="isCurrent['create_from_mnemonic']"
              ></create-mnemonic>
              <restore-wallet
                @restored="setWallet"
                v-show="isCurrent['restore_from_mnemonic']"
              ></restore-wallet>
              <restore-wif
                @restored="setWallet"
                v-show="isCurrent['restore_from_wif']"
              ></restore-wif>
              <restore-mobile
                @restored="setWallet"
                v-show="isCurrent['restore_from_mobile']"
              ></restore-mobile>
              <restore-key-file
                @restored="setWallet"
                v-show="isCurrent['restore_from_key_file']"
              ></restore-key-file>
              <restore-ledger
                @restored="setWallet"
                v-if="isCurrent['restore_from_ledger']"
              ></restore-ledger>
              <view-wallet
                :view="isCurrent['view']"
                v-if="isCurrent['view']"
              ></view-wallet>
              <view-tx
                :view="isCurrent['transactions']"
                v-if="isCurrent['transactions']"
              ></view-tx>
              <safe-send
                @send="setWallet"
                v-if="isCurrent['safe_send']"
              ></safe-send>
              <send @send="setWallet" v-if="isCurrent['send']"></send>
              <request-payment
                v-if="isCurrent['request_payment']"
              ></request-payment>
              <dump-key-file
                v-if="isCurrent['dump_as_key_file']"
              ></dump-key-file>
              <create-token v-if="isCurrent['create_token']"></create-token>
              <create-contract
                v-if="isCurrent['create_contract']"
              ></create-contract>
              <send-to-contract
                v-if="isCurrent['send_to_contract']"
              ></send-to-contract>
              <call-contract v-if="isCurrent['call_contract']"></call-contract>
              <create-nft v-if="isCurrent['create_NFT']"></create-nft>
              <delegation
                :view="isCurrent['delegation']"
                v-if="isCurrent['delegation']"
              ></delegation>
              <config v-if="isCurrent['settings']"></config>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </main>
    <notify></notify>
    <warning></warning>
  </v-app>
</template>

<script>
import Vue from 'vue'
import createLog from 'localstorage-logger'

//Components
import Notify from '@/components/Notify'
import Warning from '@/components/Warning'
import CreateWallet from '@/controllers/Create'
import CreateMnemonic from '@/controllers/CreateMnemonic'
import RestoreWallet from '@/controllers/Restore'
import RestoreWif from '@/controllers/RestoreWif'
import RestoreMobile from '@/controllers/RestoreMobile'
import RestoreKeyFile from '@/controllers/RestoreKeyFile'
import RestoreLedger from '@/controllers/RestoreLedger'
import ViewWallet from '@/controllers/View'
import ViewTx from '@/controllers/ViewTx'
import SafeSend from '@/controllers/SafeSend'
import Send from '@/controllers/Send'
import RequestPayment from '@/controllers/RequestPayment'
import DumpKeyFile from '@/controllers/DumpKeyFile'
import CreateToken from '@/controllers/CreateToken'
import CreateContract from '@/controllers/CreateContract'
import SendToContract from '@/controllers/SendToContract.vue'
import CallContract from '@/controllers/CallContract.vue'
import CreateNft from '@/controllers/CreateNFT.vue'
import Config from '@/controllers/Config'
import Delegation from '@/controllers/Delegation'

import config from '@/libs/config'
import webWallet from '@/libs/web-wallet'
import i18n from '@/libs/i18n'
import track from '@/libs/track'

import qtumInfo from '@/libs/nodes/qtumInfo'

const log = createLog({
  maxLogSizeInBytes: 500 * 1024 // 500KB
})

export default {
  name: 'app',
  i18n,
  data() {
    return {
      wallet: false,
      current: 'create',
      network: config.getNetwork(),
      mode: config.getMode(),
      log: log,
      menu: [
        { icon: 'add', name: 'create' },
        { icon: 'assignment', name: 'create_from_mnemonic' },
        { icon: 'sms', name: 'restore_from_mnemonic' },
        { icon: 'vpn_key', name: 'restore_from_wif' },
        { icon: 'phonelink_lock', name: 'restore_from_mobile' },
        { icon: 'cloud_upload', name: 'restore_from_key_file' },
        { icon: 'flip_to_front', name: 'restore_from_ledger' },
        { divider: true, name: 'stake' },
        { icon: 'gavel', name: 'delegation' },
        { divider: true, name: 'wallet' },
        { icon: 'account_balance_wallet', name: 'view' },
        { icon: 'list', name: 'transactions' },
        { icon: 'security', name: 'safe_send' },
        { icon: 'repeat', name: 'send' },
        { icon: 'undo', name: 'request_payment' },
        { icon: 'cloud_download', name: 'dump_as_key_file' },
        { divider: true, name: 'contract' },
        { icon: 'copyright', name: 'create_token' },
        { icon: 'create', name: 'create_contract' },
        { icon: 'publish', name: 'send_to_contract' },
        { icon: 'play_circle_filled', name: 'call_contract' },
        { icon: 'fingerprint', name: 'create_NFT' },
        { divider: true, name: 'disc' },
        { icon: 'settings', name: 'settings' }
      ],
      notifyList: {},
      delegationShow: false
    }
  },
  computed: {
    isCurrent() {
      return { [this.current]: true }
    },
    notShow() {
      return {
        restore_from_ledger: this.network !== 'mainnet',
        view: this.mode === 'offline' || !this.wallet,
        transactions: this.mode === 'offline' || !this.wallet,
        wallet: this.mode === 'offline' && !this.wallet,
        safe_send: this.mode === 'offline' && !this.wallet,
        send: this.mode === 'offline' || !this.wallet,
        request_payment: !this.wallet,
        dump_as_key_file: !this.wallet || !this.wallet.getHasPrivKey(),
        contract: this.mode === 'offline' || !this.wallet,
        create_token: this.mode === 'offline' || !this.wallet,
        create_contract: this.mode === 'offline' || !this.wallet,
        send_to_contract: this.mode === 'offline' || !this.wallet,
        call_contract: this.mode === 'offline' || !this.wallet,
        create_NFT: this.mode === 'offline' || !this.wallet,
        stake: this.mode === 'offline' || !this.wallet,
        delegation:
          this.mode === 'offline' || !this.wallet || !this.delegationShow
      }
    },
    headerClass() {
      return this.mode === 'normal' ? 'cyan' : 'orange'
    }
  },
  watch: {
    async network(newVal) {
      this.delegationShow = false
      await this.onlineDelegation(newVal)
    }
  },
  components: {
    Notify,
    Warning,
    CreateWallet,
    CreateMnemonic,
    RestoreWallet,
    RestoreWif,
    RestoreMobile,
    RestoreKeyFile,
    RestoreLedger,
    ViewWallet,
    ViewTx,
    SafeSend,
    Send,
    RequestPayment,
    DumpKeyFile,
    CreateToken,
    CreateContract,
    SendToContract,
    CallContract,
    Config,
    Delegation,
    CreateNft
  },
  methods: {
    setWallet() {
      this.wallet = webWallet.getWallet()
      this.wallet.init()
      if (this.wallet) {
        if (this.mode === 'offline') {
          this.current = 'request_payment'
        } else {
          this.current = 'view'
        }
      }
    },
    changeView(name) {
      this.current = name
      track.trackAction('change', 'page', name)
    },
    error(msg, isHtml = false, ttl = 10) {
      this.addNotify(msg, 'error', isHtml, ttl)
    },
    success(msg, isHtml = false, ttl = 10) {
      this.addNotify(msg, 'success', isHtml, ttl)
    },
    addNotify(msg, type, isHtml = false, ttl = 10) {
      const notifyId = [msg, type].join('_')
      const notify = {
        msg: msg.split(' ').reduce((msg, current) => {
          let tmsg = this.$t('common.notify.' + current)
          tmsg = tmsg === 'common.notify.' + current ? ' ' + current : tmsg
          return msg + tmsg
        }, ''),
        type,
        show: true,
        isHtml
      }
      if (this.notifyList[notifyId] && this.notifyList[notifyId].timer) {
        clearTimeout(this.notifyList[notifyId].timer)
      }
      Vue.set(this.notifyList, notifyId, notify)
      if (ttl > 0) {
        this.notifyList[notifyId].timer = setTimeout(() => {
          Vue.delete(this.notifyList, notifyId)
        }, ttl * 1000)
      }
    },
    async onlineDelegation(network) {
      // 判断代理挖矿功能是否上线
      if (localStorage.getItem(`${network}_delegation_online`)) {
        this.delegationShow = true
      } else {
        let height = 0
        switch (network) {
          case 'testnet':
            height = 625000
            break
          case 'mainnet':
            height = 680000
            break
        }
        // 请求高度
        const res = await qtumInfo.getQtumInfo()
        if (res.height > height) {
          localStorage.setItem(`${network}_delegation_online`, true)
          this.delegationShow = true
        }
      }
    }
  },
  mounted() {
    track.track('lan', config.getLan())
    this.onlineDelegation(this.network)
  }
}
</script>
