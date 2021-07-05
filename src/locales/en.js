export default {
    common: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        search: 'Search',
        copy: 'COPY',
        next: 'NEXT',
        question_mark: '? ',
        testnet: 'Testnet',
        mainnet: 'Fastlane-Mainnet',
        menu: {
            create: 'Generate new Wallet',
            create_from_mnemonic: 'Create From Mnemonic',
            restore_from_mnemonic: 'Restore From Mnemonic',
            restore_from_wif: 'Restore From WIF',
            restore_from_mobile: 'Restore From Mobile Wallet',
            restore_from_key_file: 'Restore From Key File',
            restore_from_ledger: 'Restore From Ledger',
            view: 'View Wallet Info',
            dump_as_key_file: 'Dump As Key File',
            transactions: 'View Wallet Txs',
            safe_send: 'Safe Send',
            send: 'Send',
            request_payment: 'Request Payment',
            create_token: 'Create Token',
            create_contract: 'Create Contract',
            send_to_contract: 'Send To Contract',
            call_contract: 'Call Contract',
            create_NFT: 'Create NFT',
            delegation: 'Offline Staking',
            settings: 'Settings'
        },
        info: {
            address: 'Address',
            balance: 'Balance',
            unconfirmed_balance: 'Unconfirmed Balance',
            priv_key: 'Private Key',
            staker_address: 'Staker Address',
            fee: 'Staker Fee',
            gas_limit: 'Gas Limit',
            gas_price: 'Gas Price',
            tx_fee: 'Fee'
        },
        notify: {
            success: 'Success',
            fail: 'Failed',
            copy: 'Copy',
            password: 'Password',
            is_required: 'is required',
            parse: 'Parse',
            file: 'File',
            password_is_not_same_as_the_old_one: 'Password is not same as the old one',
            mnemonics_are_not_same_as_the_words_should_remember: 'The mnemoincs are not same as the words you should remember',
            mnemonics_can_not_restore: 'Those mnemonics can not restore a wallet, please check and try again',
            address_is_not_same_as_the_old_one: 'This address is not same as the old one',
            from_address_is_not_same_as_the_wallet: 'The from address is not same as the wallet address',
            restore_wif_fail: 'Cannot restore a wallet from this WIF',
            the_key_file_is_not_a_valid_format: 'The key file is not a valid format',
            restore_key_file_fail: 'Restore from key file failed. Maybe the password is not correct',
            connect_ledger_fail: 'Fail to connect Ledger. Please re-plugin your ledger and try again',
            token_contract_address_is_not_exists: 'Token contract address is not exists, please confirm and try again'
        },
        mode: {
            normal: 'Normal',
            offline: 'Offline'
        }
    },
    mnemonic: {
        input_words: 'Please input words',
        label: 'M'
    },
    password: {
        enter: 'Please enter you password',
        password: 'password'
    },
    file_reader: {
        upload: 'Upload'
    },
    file_creator: {
        download: 'Please click this button to start downloading file, if the downloading not start, you can right-click the button and choose "save the link as ..."'
    },
    ledger: {
        comm_fail: 'Fail to connect Ledger. Please re-plugin your ledger and try again'
    },
    derive_path: {
        title: 'Please choose a derive path',
        default: 'Default path',
        add_custom: 'Add custom derive path',
        edit_custom: 'Edit custom derive path',
        del_custom: 'Do you confirm to delete this path?',
        path_name: 'Path name',
        path: 'Path',
        prev_10: 'Prev 10 Address',
        next_10: 'Next 10 Address'
    },
    safe_send: {
        title: 'Safe Send',
        from_address: 'From Address',
        to_address: 'To Address',
        amount: 'Amount',
        fee: 'Fee',
        info: 'You need two computers(one online and one offline) and a removeable storage device to finish a safe-send. If you follow the tips below, you will not take risk of leak your private key. For the offline computer, please in "Settings"-"Mode" choose "offline", and then restore your wallet.',
        info1_online: 'Please finish the form, then save the file and copy to the offline computer. And the finish step 2 on the offline computer',
        info1_offline: 'Please finish step 1 on the online computer and copy the file from online computer and then go to step 2',
        info2_online: 'Please finish this step on offline computer, and copy the file from offline computer and then go to step 3',
        info2_offline: 'Please upload the file copy from online computer, and finish the signature, and then save the file and copy back to online computer',
        info3_online: 'Please upload the file from the offline computer, and then finish the safe-send',
        info3_offline: 'Please finish this step on the online computer'
    },
    send: {
        send_tokens: 'Send tokens',
        enter_address: 'Please enter address again (Double check)',
        going_to_send: 'You are going to send ',
        to_address: 'to address ',
        token_address: 'Token Contract Address'
    },
    request_payment: {
        title: 'Request Payment'
    },
    create_token: {
        title: 'Create Token',
        name: 'Token Name',
        symbol: 'Token Symbol',
        decimal: 'Decimals (It\'s recommended to set decimals to 8 in QTUM)',
        total_supply: 'Total Supply (UNIT: 1 Token)',
        confirm: 'Do you confirm to create this Token?'
    },
    create_contract: {
        title: 'Create Contract',
        confirm: 'Do you confirm to publish this contract?',
        compiler: 'Compiler'
    },
    send_to_contract: {
        title: 'Send To Contract',
        confirm: 'Do you confirm?'
    },
    call_contract: {
        title: 'Call Contract',
        result: 'Result'
    },
    create: {
        title: 'Generate new Wallet'
    },
    create_mnemonic: {
        title: 'Generate new Wallet',
        remember: 'Please remember the following mnemonics',
        remembered: 'I have remembered all. Let\'s check'
    },
    restore: {
        title: 'Restore Wallet',
        mnemonic_warning: 'The input words are not bip39 mnemonics. If your address is generated by this wallet, please cancel this dialog and then check your words(no space, no capital letter etc.). If you have double checked your words, you can continue.'
    },
    restore_wif: {
        title: 'Restore Wallet From WIF',
        priv_key: 'WIF'
    },
    restore_mobile: {
        title: 'Restore From Mobile Wallet'
    },
    restore_key_file: {
        title: 'Restore From The Key File',
        password_title: 'Please input you password to decrypt the wallet'
    },
    restore_ledger: {
        title: 'Restore From Ledger',
        usage: 'Please ensure your firmware and app are the newest version. Plugin your Ledger, open Qtum APP, and then click the "CONNECT" button below try to connect.',
        download: 'No Qtum APP? Please install it follow this https://www.ledgerwallet.com/apps/manager',
        connect: 'CONNECT'
    },
    view: {
        title: 'View Wallet Info'
    },
    view_tx: {
        title: 'View Wallet Txs',
        recent: 'Recent 10 txs',
        tx: 'Tx: ',
        mined_at: 'Mined at ',
        total_in: 'TOTAL IN: ',
        fee: 'FEE: ',
        total_out: 'TOTAL OUT: '
    },
    dump_as_key_file: {
        title: 'Dump as a key file',
        password_title: 'Please input a password to encrypt you wallet',
        warning: 'Please remember this password, if you lose this password, this backup file cannot be decrypted any more'
    },
    config: {
        title: 'Settings',
        lan: 'Language',
        network: 'Network',
        mode: 'Mode'
    },
    warning: {
        title: 'Warning',
        list: [
            'We cannot recover your funds if you visit a phishing site or lose your backup. Please make sure to keep backups of your private keys/seed words.',
            'We do not store your private keys and/or seed words on this web wallet.',
            'You as a user, are entirely responsible for your funds and your own security.',
            'Please make sure to keep an updated antivirus and operating system.',
            'Please keep your private keys PRIVATE, do not give them to anyone.',
            'If you use Restore from Mnemonic, the seed words and password must be exactly right or the wallet will create a new address. When using Restore from Mnemonic, confirm you have the correct address.'
        ]
    },
    delegation: {
        title: 'Offline Staking',
        add: 'Add Delegation',
        remove: 'Remove Delegation',
        contract_success: 'Contract send successfully.',
        delegated: 'Address has been delegated.',
        refresh_success: 'Refresh successfully',
        address: 'Address: {address}',
        super_staker: 'Super Staker: {superStaker}',
        processing: 'The contract is being processed.'
    },
    nft: {
        title: 'NFT',
        send: 'send',
        create_title: 'CREATE NFT',
        create_name: 'NFT Name',
        create_symbol: 'NFT Symbol',
        create_desc: 'NFT Desc',
        create_supply: 'NFT amount(MAX 10)',
        send_nft: 'send NFT',
        close_confirm: 'close',
        send_confirm: 'confirm',
        send_address: 'address',
        send_amount: 'amount'
    }
}
