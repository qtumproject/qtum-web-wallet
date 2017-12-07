export default {
  common: {
    confirm: '确认',
    cancel: '取消',
    copy: '复制',
    next: '下一步',
    question_mark: '？',
    testnet: '测试网络',
    mainnet: '主网',
    menu: {
      create: '创建新钱包',
      restore_from_mnemonic: '从密语恢复钱包',
      restore_from_wif: '从私钥恢复钱包',
      restore_from_mobile: '从手机钱包恢复',
      view: '查看钱包信息',
      transactions: '查看交易记录',
      safe_send: '安全转账',
      send: '转账',
      request_payment: '收款码',
      create_contract: '创建智能合约',
      send_to_contract: '向智能合约发送数据',
      call_contract: '调用智能合约',
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
      parse: '解析',
      file: '文件',
      password_is_not_same_as_the_old_one: '两次输入的密码不一样',
      mnemonics_are_not_same_as_the_words_should_remember: '这组密语跟应该记住的密语不一样',
      mnemonics_can_not_restore: '密语不能恢复钱包，请检查输入',
      address_is_not_same_as_the_old_one: '两次输入的地址不一样',
      from_address_is_not_same_as_the_wallet: '发送地址跟钱包地址不一样',
      restore_wif_fail: '从此密钥不能恢复钱包，请再次确认',
    },
    mode: {
      normal: '正常模式',
      offline: '离线模式',
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
  file_reader: {
    upload: '上传',
  },
  safe_send: {
    title: '安全转账',
    from_address: '源地址',
    to_address: '目的地址',
    amount: '金额',
    fee: '手续费',
    info: '欢迎使用安全转账模式，您需要两台电脑（一台联网，一台不联网）和一个移动存储设备来完成一次安全转账操作。如果您完全遵循下面的操作指导，那么您将不会有泄露私钥的风险。对于不联网的电脑，请在"设置"-"模式"里面设置为"离线模式"，然后恢复您的钱包',
    info1_online: '请填写下列参数，确认后请保存生成的文件，并把文件拷贝到不联网的电脑上，并在那台电脑上进行第二步操作',
    info1_offline: '请在联网电脑上完成第一步操作，然后把生成的文件设备拷贝过来，然后进行第二步操作',
    info2_online: '请在不联网电脑上完成此步操作，然后把生成的文件拷贝过来，然后进行第三步操作',
    info2_offline: '请上传拷贝过来的文件，完成签名后，把生成的文件再拷贝回联网电脑，然后进行第三步操作',
    info3_online: '请上传拷贝过来的文件，验证后将完成转账操作',
    info3_offline: '请在联网电脑上继续操作',
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
  create_contract: {
    title: '创建智能合约',
    confirm: '确定发布此智能合约吗?',
    compiler: '编译器',
  },
  send_to_contract: {
    title: '向智能合约发送数据',
    confirm: '确定发送吗?',
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
  restore_mobile: {
    title: '从手机钱包恢复',
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
    mode: '模式',
  }
}
