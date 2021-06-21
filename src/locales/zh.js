export default {
    common: {
        confirm: '确认',
        cancel: '取消',
        search: '搜索',
        copy: '复制',
        next: '下一步',
        question_mark: '？',
        testnet: '测试网络',
        mainnet: '主网',
        menu: {
            create: '创建新钱包',
            create_from_mnemonic: '创建密语钱包',
            restore_from_mnemonic: '从密语恢复钱包',
            restore_from_wif: '从私钥恢复钱包',
            restore_from_mobile: '从手机钱包恢复',
            restore_from_key_file: '从加密文件恢复',
            restore_from_ledger: '使用Ledger',
            view: '查看钱包信息',
            dump_as_key_file: '备份为加密文件',
            transactions: '查看交易记录',
            safe_send: '安全转账',
            send: '转账',
            request_payment: '收款码',
            create_token: '创建Token',
            create_contract: '创建智能合约',
            send_to_contract: '向智能合约发送数据',
            call_contract: '调用智能合约',
            create_NFT: '创建NFT',
            delegation: '离线挖矿',
            settings: '设置'
        },
        info: {
            address: '地址',
            balance: '余额',
            unconfirmed_balance: '未确认余额',
            priv_key: '私钥',
            staker_address: '矿工地址',
            fee: '费用',
            gas_limit: 'Gas Limit',
            gas_price: 'Gas Price',
            tx_fee: '手续费'
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
            the_key_file_is_not_a_valid_format: '加密文件格式不对',
            restore_key_file_fail: '可能是加密文件的解密密码不对，从此加密文件不能恢复钱包，请再次确认',
            connect_ledger_fail: '连接Ledger失败，请按上面的操作重做一次。如果还是失败，请把Ledger拔下来后重试',
            token_contract_address_is_not_exists: 'Token合约地址不存在，请确认后再试'
        },
        mode: {
            normal: '正常模式',
            offline: '离线模式'
        }
    },
    mnemonic: {
        input_words: '请输入密语',
        label: '密语'
    },
    password: {
        enter: '请输入你的密码',
        password: '密码'
    },
    file_reader: {
        upload: '上传'
    },
    file_creator: {
        download: '请点击此的按钮下载文件，如果没有启动下载，请在按钮上右键并选择"链接另存为..."'
    },
    ledger: {
        comm_fail: '与ledger通信失败，请重新插入ledger'
    },
    derive_path: {
        title: '请选择生成路径',
        default: '默认路径',
        add_custom: '新增自定义路径',
        edit_custom: '编辑自定义路径',
        del_custom: '确定删除这个路径吗?',
        path_name: '路径名',
        path: '路径',
        prev_10: '前10个地址',
        next_10: '后10个地址'
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
        info3_offline: '请在联网电脑上继续操作'
    },
    send: {
        send_tokens: '转账',
        enter_address: '请再次输入地址（二次检查）',
        going_to_send: '你确定要发送',
        to_address: '到地址',
        token_address: 'Token合约地址'
    },
    request_payment: {
        title: '收款码'
    },
    create_token: {
        title: '创建Token',
        name: 'Token名字',
        symbol: 'Token符号',
        decimal: '小数位数(QTUM推荐8位)',
        total_supply: '总量(单位: 1token)',
        confirm: '确定发布此Token吗?'
    },
    create_contract: {
        title: '创建智能合约',
        confirm: '确定发布此智能合约吗?',
        compiler: '编译器'
    },
    send_to_contract: {
        title: '向智能合约发送数据',
        confirm: '确定发送吗?'
    },
    call_contract: {
        title: '调用智能合约',
        result: '执行结果'
    },
    create: {
        title: '创建新钱包'
    },
    create_mnemonic: {
        title: '创建新钱包',
        remember: '请记住如下助记词',
        remembered: '我已经都记住了'
    },
    restore: {
        title: '恢复钱包',
        mnemonic_warning: '输入的助记词可能不是标准助记词词组。如果是使用本钱包通过助记词创建的地址，那么请取消本对话框后重新确认您输入的助记词（不含空格，大写字母等等）。如果您确认输入无误那么请继续'
    },
    restore_wif: {
        title: '恢复钱包',
        priv_key: '私钥'
    },
    restore_mobile: {
        title: '从手机钱包恢复'
    },
    restore_key_file: {
        title: '从加密文件恢复',
        password_title: '请输入您的加密文件解密密码'
    },
    restore_ledger: {
        title: '从Ledger恢复',
        usage: '请确保您的固件和软件都是最新的版本。连接您的LedgerWallet，进入Qtum APP，然后点击下面的连接按钮尝试连接。',
        download: '没有Qtum APP? 请按照这个安装 https://www.ledgerwallet.com/apps/manager',
        connect: '连接'
    },
    view: {
        title: '查看钱包信息'
    },
    view_tx: {
        title: '查看钱包交易',
        recent: '最近10笔交易',
        tx: '交易：',
        mined_at: 'Mined at ',
        total_in: '总计输入：',
        fee: '手续费：',
        total_out: '总计输出：'
    },
    dump_as_key_file: {
        title: '备份为加密文件',
        password_title: '请输入密码进行文件加密',
        warning: '请记住此时您用来加密文件的密码，此密码没有另一个地方有备份，也不能被找回，如果此密码丢失的话，这次备份的加密文件不可能通过其它办法恢复成您的钱包'
    },
    config: {
        title: '设置',
        lan: '语言',
        network: '网络选择',
        mode: '模式'
    },
    warning: {
        title: '警告',
        list: [
            '如果您访问了一个钓鱼网站或者丢失了您的备份，本站无法为您恢复资金。请确保备份您的私钥或者助记词。',
            '本站不存储您的私钥或者助记词。',
            '您作为用户，完全为您自己的资金安全负责。',
            '请确保使用最新的防病毒软件和操作系统。',
            '请私下保存您的私钥或助记词，不要告诉任何人。',
            '如果使用了从助记词恢复地址的方式，请保证助记词和密码的绝对正确。输入任意的助记词和密码都会生成地址，如果有细微的不同都可能会导致生成跟原来不同的地址。'
        ]
    },
    delegation: {
        title: '离线挖矿',
        add: '添加代理',
        remove: '移除代理',
        contract_success: '合约发送成功。',
        delegated: '地址已代理。',
        refresh_success: '刷新成功',
        address: '地址：{address}',
        super_staker: '代理地址：{superStaker}',
        processing: '合约正在处理。'
    },
    nft: {
        title: 'NFT',
        send: '发送',
        create_title: '创建NFT',
        create_name: 'NFT名称',
        create_symbol: 'NFT符号',
        create_desc: 'NFT描述',
        create_supply: 'NFT总量(MAX 10)',
        send_nft: '转移NFT',
        close_confirm: '关闭',
        send_confirm: '确认',
        send_address: '地址',
        send_amount: '数量'
    }
}
