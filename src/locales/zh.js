export default {
  common: {
    confirm: '确认',
    cancel: '取消',
    copy: '复制',
    question_mark: '？',
    testnet: '测试网络',
    mainnet: '主网',
    menu: {
      create: '创建新钱包',
      restore_from_mnemonic: '从密语恢复钱包',
      restore_from_wif: '从私钥恢复钱包',
      view: '查看钱包信息',
      transactions: '查看交易记录',
      send: '转账',
      request_payment: '收款码',
      settings: '设置',
    },
    info: {
      address: '地址',
      balance: '余额',
      unconfirmed_balance: '未确认余额',
      priv_key: '私钥',
    },
    notify: {
      success: '成功',
      fail: '失败',
      copy: '复制',
      password: '密码',
      is_required: '是必须的',
      password_is_not_same_as_the_old_one: '两次输入的密码不一样',
      mnemonics_are_not_same_as_the_words_should_remember: '这组密语跟应该记住的密语不一样',
      mnemonics_can_not_restore: '密语不能恢复钱包，请检查输入',
      address_is_not_same_as_the_old_one: '两次输入的地址不一样',
      restore_wif_fail: '从此密钥不能恢复钱包，请再次确认',
    }
  },
  mnemonic: {
    input_words: '请输入密语',
    label: '密语'
  },
  password: {
    enter: '请输入你的密码',
    password: '密码',
  },
  send: {
    send_tokens: '转账',
    enter_address: '请再次输入地址（二次检查）',
    going_to_send: '你确定要发送',
    to_address: '到地址',
  },
  request_payment: {
    title: '收款码',
  },
  create: {
    title: '创建新钱包',
    remember: '请记住如下助记词',
    remembered: '我已经都记住了',
  },
  restore: {
    title: '恢复钱包',
  },
  restore_wif: {
    title: '恢复钱包',
    priv_key: '私钥',
  },
  view: {
    title: '查看钱包信息',
  },
  view_tx: {
    title: '查看钱包交易',
    recent: '最近10笔交易',
    tx: '交易：',
    mined_at: 'Mined at ',
    total_in: '总计输入：',
    fee: '手续费：',
    total_out: '总计输出：',
  },
  config: {
    title: '设置',
    lan: '语言',
    network: '网络选择',
  }
}
