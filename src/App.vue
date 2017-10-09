<template>
  <v-app dark>
    <v-navigation-drawer permanent clipped app>
      <v-list>
        <template v-for="(item, i) in menu">
          <v-divider dark v-if="item.divider" class="my-4" :key="i" v-show="!notShow[item.name]"></v-divider>
          <v-list-tile :key="i" v-else @click="changeView(item.name)" active-class="grey darken-4" v-model="isCurrent[item.name]" v-show="!notShow[item.name]">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ $t('common.menu.' + item.name) }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="cyan" app absolute clipped-left>
      <span class="title">
        <i class="qtum-icon qtum-icon-logo"></i>
        <span class="text">QTUM</span>
        <v-btn flat @click="changeView('settings')">
          ( {{ $t('common.' + network) }} )
        </v-btn>
      </span>
    </v-toolbar>
    <main>
      <v-container fluid fill-height justify-center>
        <v-layout row wrap>
          <v-flex xs10 offset-xs1>
            <create-wallet :view="isCurrent['create']" @created="setWallet" v-show="isCurrent['create']"></create-wallet>
            <restore-wallet @restored="setWallet" v-show="isCurrent['restore_from_mnemonic']"></restore-wallet>
            <view-wallet :view="isCurrent['view']" v-if="isCurrent['view']"></view-wallet>
            <view-tx :view="isCurrent['transactions']" v-if="isCurrent['transactions']"></view-tx>
            <send @send="setWallet" v-if="isCurrent['send']"></send>
            <config v-if="isCurrent['settings']"></config>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
    <notify></notify>
  </v-app>
</template>

<script>
import notify from './components/Notify'
import CreateWallet from './components/wallet/Create'
import RestoreWallet from './components/wallet/Restore'
import ViewWallet from './components/wallet/View'
import ViewTx from './components/wallet/ViewTx'
import Send from './components/wallet/Send'
import Config from './components/Config'
import config from './config'
import webWallet from './web-wallet'

export default {
  name: 'app',
  data() {
    return {
      wallet: false,
      current: 'create',
      network: config.getNetwork(),
      menu: [
        { icon: 'add', name: 'create' },
        { icon: 'sms', name: 'restore_from_mnemonic' },
        //@todo { icon: 'create', name: 'restore_from_wif' },
        { divider: true, name: 'wallet' },
        { icon: 'account_balance_wallet', name: 'view' },
        { icon: 'list', name: 'transactions' },
        { icon: 'repeat', name: 'send' },
        { divider: true, name: 'disc' },
        { icon: 'settings', name: 'settings' },
      ],
    }
  },
  computed: {
    isCurrent() {
      return { [this.current]: true }
    },

    notShow() {
      return {
        wallet: this.wallet == false,
        view: this.wallet == false,
        transactions: this.wallet == false,
        send: this.wallet == false,
      }
    }
  },
  components: {
    notify,
    CreateWallet,
    RestoreWallet,
    ViewWallet,
    ViewTx,
    Send,
    Config,
  },
  methods: {
    setWallet() {
      this.wallet = webWallet.getWallet()
      this.current = 'view'
    },
    changeView(name) {
      this.current = name
    }
  }
}
</script>
