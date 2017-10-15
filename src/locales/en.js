export default {
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    copy: 'COPY',
    question_mark: '? ',
    skynet: 'Skynet-Testnet',
    mainnet: 'Ignition-Mainnet',
    menu: {
      create: 'Generate new Wallet',
      restore_from_mnemonic: 'Restore From Mnemonic',
      restore_from_wif: 'Restore From WIF',
      view: 'View Wallet Info',
      transactions: 'View Wallet Txs',
      send: 'Send',
      request_payment: 'Request Payment',
      settings: 'Settings',
    },
    info: {
      address: 'Address',
      balance: 'Balance',
      unconfirmed_balance: 'Unconfirmed Balance',
      priv_key: 'Private Key',
    },
    notify: {
      success: 'Success',
      fail: 'Failed',
      copy: 'Copy',
      password: 'Password',
      is_required: 'is required',
      password_is_not_same_as_the_old_one: 'Password is not same as the old one',
      mnemonics_are_not_same_as_the_words_should_remember: 'The mnemoincs are not same as the words you should remember',
      mnemonics_can_not_restore: 'Those mnemonics can not restore a wallet, please check and try again',
      address_is_not_same_as_the_old_one: 'This address is not same as the old one',
      restore_wif_fail: 'Cannot restore a wallet from this WIF',
    }
  },
  mnemonic: {
    input_words: 'Please input words',
    label: 'M'
  },
  password: {
    enter: 'Please enter you password',
    password: 'password',
  },
  send: {
    send_tokens: 'Send tokens',
    enter_address: 'Please enter address again (Double check)',
    going_to_send: 'You are going to send ',
    to_address: 'to address ',
  },
  request_payment: {
    title: 'Request Payment',
  },
  create: {
    title: 'Generate new Wallet',
    remember: 'Please remember the following mnemonics',
    remembered: 'I have remembered all. Let\'s check',
  },
  restore: {
    title: 'Restore Wallet',
  },
  restore_wif: {
    title: 'Restore Wallet From WIF',
    priv_key: 'WIF',
  },
  view: {
    title: 'View Wallet Info',
  },
  view_tx: {
    title: 'View Wallet Txs',
    recent: 'Recent 10 txs',
    tx: 'Tx: ',
    mined_at: 'Mined at ',
    total_in: 'TOTAL IN: ',
    fee: 'FEE: ',
    total_out: 'TOTAL OUT: ',
  },
  config: {
    title: 'Settings',
    lan: 'Language',
    network: 'Network',
  }
}
