<template>
  <v-app dark>
    <v-navigation-drawer permanent clipped app>
      <v-list>
        <template v-for="(item, i) in items">
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
      </span>
    </v-toolbar>
    <main>
      <v-container fluid fill-height justify-center>
        <v-layout row wrap>
          <v-flex xs10 offset-xs1>
        <create-wallet :view="isCurrent['create']" @created="setWallet" v-show="isCurrent['create']"></create-wallet>
        <restore-wallet :view="isCurrent['create']" @restored="setWallet" v-show="isCurrent['restore_from_mnemonic']"></restore-wallet>
        <view-wallet :view="isCurrent['create']" v-if="isCurrent['transactions']"></view-wallet>
        <send :view="isCurrent['create']" @send="setWallet" v-if="isCurrent['send']"></send>
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
import Send from './components/wallet/Send'
import webWallet from './web-wallet'

export default {
  name: 'app',
  data() {
    return {
      wallet: false,
      current: 'create',

      items: [
        { icon: 'add', name: 'create' },
        { icon: 'sms', name: 'restore_from_mnemonic' },
        //@todo { icon: 'create', name: 'restore_from_wif' },
        { divider: true, name: 'wallet' },
        { icon: 'list', name: 'transactions' },
        { icon: 'repeat', name: 'send' },
        //@todo { divider: true, name: 'disc' },
        //@todo { icon: 'settings', name: 'settings' },
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
    Send,
  },
  methods: {
    setWallet() {
      this.wallet = webWallet.getWallet()
      this.current = 'transactions'
    },
    changeView(name) {
      this.current = name
    }
  }
}
</script>
