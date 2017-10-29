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
    <v-toolbar :class="headerClass" app fixed clipped-left>
      <span class="title">
        <i class="qtum-icon qtum-icon-logo"></i>
        <span class="text">QTUM</span>
        <span @click="changeView('settings')">
          --{{ $t('common.' + network) }}
        </span>
        <v-btn flat @click="changeView('settings')" v-if="mode != 'normal'">
          {{ $t('common.mode.' + mode) }}
        </v-btn>
      </span>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid fill-height justify-center>
          <v-layout row wrap>
            <v-flex xs10 offset-xs1>
              <create-wallet :view="isCurrent['create']" @created="setWallet" v-show="isCurrent['create']"></create-wallet>
              <restore-wallet @restored="setWallet" v-show="isCurrent['restore_from_mnemonic']"></restore-wallet>
              <restore-wif @restored="setWallet" v-show="isCurrent['restore_from_wif']"></restore-wif>
              <view-wallet :view="isCurrent['view']" v-if="isCurrent['view']"></view-wallet>
              <view-tx :view="isCurrent['transactions']" v-if="isCurrent['transactions']"></view-tx>
              <safe-send @send="setWallet" v-if="isCurrent['safe_send']"></safe-send>
              <send @send="setWallet" v-if="isCurrent['send']"></send>
              <request-payment v-if="isCurrent['request_payment']"></request-payment>
              <config v-if="isCurrent['settings']"></config>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </main>
    <notify></notify>
  </v-app>
</template>

<script>
import Vue from 'vue'

//Components
import Notify from 'components/Notify'
import CreateWallet from 'components/wallet/Create'
import RestoreWallet from 'components/wallet/Restore'
import RestoreWif from 'components/wallet/RestoreWif'
import ViewWallet from 'components/wallet/View'
import ViewTx from 'components/wallet/ViewTx'
import SafeSend from 'components/wallet/SafeSend'
import Send from 'components/wallet/Send'
import RequestPayment from 'components/wallet/RequestPayment'
import Config from 'components/Config'

import config from 'config'
import webWallet from 'web-wallet'
import i18n from 'i18n'

export default {
  name: 'app',
  i18n,
  data() {
    return {
      wallet: false,
      current: 'create',
      network: config.getNetwork(),
      mode: config.getMode(),
      menu: [
        { icon: 'add', name: 'create' },
        { icon: 'sms', name: 'restore_from_mnemonic' },
        { icon: 'create', name: 'restore_from_wif' },
        { divider: true, name: 'wallet' },
        { icon: 'account_balance_wallet', name: 'view' },
        { icon: 'list', name: 'transactions' },
        { icon: 'security', name: 'safe_send' },
        { icon: 'repeat', name: 'send' },
        { icon: 'undo', name: 'request_payment' },
        { divider: true, name: 'disc' },
        { icon: 'settings', name: 'settings' },
      ],
      notifyList: {}
    }
  },
  computed: {
    isCurrent() {
      return { [this.current]: true }
    },
    notShow() {
      return {
        view: this.mode == 'offline' || this.wallet == false,
        transactions: this.mode == 'offline' || this.wallet == false,
        wallet: this.mode == 'offline' && this.wallet == false,
        safe_send: this.mode == 'offline' && this.wallet == false,
        send: this.mode == 'offline' || this.wallet == false,
        request_payment: this.wallet == false,
      }
    },
    headerClass() {
      return this.mode == 'normal' ? 'cyan' : 'orange'
    }
  },
  components: {
    Notify,
    CreateWallet,
    RestoreWallet,
    RestoreWif,
    ViewWallet,
    ViewTx,
    SafeSend,
    Send,
    RequestPayment,
    Config,
  },
  methods: {
    setWallet() {
      this.wallet = webWallet.getWallet()
      if (this.wallet) {
        if (this.mode == 'offline') {
          this.current = 'request_payment'
        }
        else {
          this.current = 'view'
        }
      }
    },
    changeView(name) {
      this.current = name
    },
    error(msg) {
      this.addNotify(msg, 'error')
    },
    success(msg) {
      this.addNotify(msg, 'success')
    },
    addNotify(msg, type) {
      let notifyId = [msg, type].join('_')
      let notify = {msg, type}
      if (this.notifyList[notifyId]) {
        clearTimeout(this.notifyList[notifyId].timer)
      }
      Vue.set(this.notifyList, notifyId, notify)
      this.notifyList[notifyId].timer = setTimeout(() => {Vue.delete(this.notifyList, notifyId)}, 10000)
    }
  }
}
</script>
