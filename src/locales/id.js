export default {
    common: {
        confirm: 'Konfirmasi',
        cancel: 'Batal',
        search: 'Cari',
        copy: 'SALIN',
        next: 'BERIKUTNYA',
        question_mark: '? ',
        testnet: 'Testnet',
        mainnet: 'Fastlane-Mainnet',
        menu: {
            create: 'Hasilkan Dompet baru',
            create_from_mnemonic: 'Buat Dari Mnemonik',
            restore_from_mnemonic: 'Pulihkan Dari Mnemonik',
            restore_from_wif: 'Pulihkan Dari WIF',
            restore_from_mobile: 'Pulihkan Dari Dompet Seluler',
            restore_from_key_file: 'Pulihkan Dari File Kunci',
            restore_from_ledger: 'Pulihkan Dari Ledger',
            view: 'Lihat Info Dompet',
            dump_as_key_file: 'Buang Sebagai File Kunci',
            transactions: 'Lihat Dompet Txs',
            safe_send: 'Kirim Dengan Aman',
            send: 'Kirim',
            request_payment: 'Minta pembayaran',
            create_token: 'Buat Token',
            create_contract: 'Buat Kontrak',
            send_to_contract: 'Kirim Ke Kontrak',
            call_contract: 'Panggil Kontrak',
            create_NFT: 'Buat NFT',
            delegation: 'Staking Luring',
            settings: 'Pengaturan'
        },
        info: {
            address: 'Alamat',
            balance: 'Saldo',
            unconfirmed_balance: 'Saldo Belum Dikonfirmasi',
            priv_key: 'Kunci Pribadi',
            staker_address: 'Alamat Staker',
            fee: 'Biaya Staking',
            gas_limit: 'Batas Gas',
            gas_price: 'Harga Gas',
            tx_fee: 'Biaya'
        },
        notify: {
            success: 'Sukses',
            fail: 'Gagal',
            copy: 'Salin',
            password: 'Kata sandi',
            is_required: 'Dibutuhkan',
            parse: 'Mengurai',
            file: 'File',
            mnemonics_are_not_same_as_the_words_should_remember: 'Mnemoincnya tidak sama dengan kata-kata yang harus Anda ingat',
            mnemonics_can_not_restore: 'Mnemonik tersebut tidak dapat memulihkan dompet, silakan periksa dan coba lagi',
            from_address_is_not_same_as_the_wallet: 'Alamat asal tidak sama dengan alamat dompet',
            restore_wif_fail: 'Tidak dapat memulihkan dompet dari WIF ini',
            the_key_file_is_not_a_valid_format: 'File kunci bukan format yang valid',
            restore_key_file_fail: 'Pemulihan dari file kunci gagal. ',
            connect_ledger_fail: 'Gagal menghubungkan Ledger. ',
            token_contract_address_is_not_exists: 'Alamat kontrak token tidak ada, harap konfirmasi dan coba lagi',
            password_is_not_same_as_the_old_other: 'Kata sandi tidak sama dengan yang lama',
            address_is_not_same_as_the_old_other: 'Alamat ini tidak sama dengan alamat lama'
        },
        mode: {
            normal: 'Normal',
            offline: 'Daring'
        }
    },
    mnemonic: {
        input_words: 'Silahkan masukan kata',
        label: 'M'
    },
    password: {
        enter: 'Silahkan ketikan kata sandi Anda',
        password: 'Kata Sandi'
    },
    file_reader: {
        upload: 'Unggah'
    },
    file_creator: {
        download: 'Silakan klik tombol ini untuk mulai mengunduh file, jika pengunduhan belum dimulai, Anda dapat mengklik kanan tombol tersebut dan memilih "simpan tautan sebagai ..."'
    },
    ledger: {
        comm_fail: 'Gagal menghubungkan Ledger. Silakan pasang kembali Ledger Anda dan coba lagi'
    },
    derive_path: {
        title: 'Silakan pilih path turunan',
        default: 'Path bawaan',
        add_custom: 'Tambahkan path turunan khusus',
        edit_custom: 'Edit path turunan khusus',
        del_custom: 'Apakah Anda mengonfirmasi untuk menghapus path ini?',
        path_name: 'Nama path',
        path: 'path',
        prev_10: 'Sebelumnya 10 Alamat',
        next_10: '10 Alamat Berikutnya'
    },
    safe_send: {
        title: 'Kirim Aman',
        from_address: 'Dari Alamat',
        to_address: 'Ke Alamat',
        amount: 'Jumlah',
        fee: 'Biaya',
        info: 'Anda memerlukan dua komputer (satu online dan satu offline) dan perangkat penyimpanan yang dapat dilepas untuk menyelesaikan pengiriman aman. Jika Anda mengikuti tips di bawah ini, Anda tidak akan mengambil risiko kebocoran kunci pribadi Anda. Untuk komputer offline, silakan di "Pengaturan"-"Mode" pilih "offline", lalu pulihkan dompet Anda.',
        info1_online: 'Silakan lengkapi formulirnya, lalu simpan file dan salin ke komputer offline. Dan langkah finish ke 2 di komputer offline',
        info1_offline: 'Silakan selesaikan langkah 1 di komputer online dan salin file dari komputer online lalu lanjutkan ke langkah 2',
        info2_online: 'Silakan selesaikan langkah ini di komputer offline, dan salin file dari komputer offline lalu lanjutkan ke langkah 3',
        info2_offline: 'Silakan unggah salinan file dari komputer online, dan selesaikan tanda tangan, lalu simpan file dan salin kembali ke komputer online',
        info3_online: 'Silakan unggah file dari komputer offline, lalu selesaikan pengiriman aman',
        info3_offline: 'Silakan selesaikan langkah ini di komputer online'
    },
    send: {
        send_tokens: 'Kirim token',
        enter_address: 'Silakan masukkan alamat lagi (Periksa ulang)',
        going_to_send: 'Anda akan mengirim ',
        to_address: 'ke Alamat ',
        token_address: 'Alamat Kontrak Token'
    },
    request_payment: {
        title: 'Minta Pembayaran'
    },
    create_token: {
        title: 'Buat Token',
        name: 'Nama Token',
        symbol: 'Simbol Token',
        decimal: 'Desimal (Disarankan untuk menyetel desimal ke 8 di QTUM)',
        total_supply: 'Total Pasokan (UNIT: 1 Token)',
        confirm: 'Apakah Anda mengonfirmasi untuk membuat Token ini?'
    },
    create_contract: {
        title: 'Buat Kontrak',
        confirm: 'Apakah Anda mengonfirmasi untuk mempublikasikan kontrak ini?',
        compiler: 'Kompiler'
    },
    send_to_contract: {
        title: 'Kirim Ke Kontrak',
        confirm: 'Apakah Anda mengonfirmasi?'
    },
    call_contract: {
        title: 'Panggil Kontrak',
        result: 'Hasil'
    },
    create: {
        title: 'Hasilkan Dompet baru'
    },
    create_mnemonic: {
        title: 'Hasilkan Dompet baru',
        remember: 'Harap ingat mnemonik berikut',
        remembered: 'Saya sudah ingat semuanya. Mari kita periksa'
    },
    restore: {
        title: 'Pulihkan Dompet',
        mnemonic_warning: 'Kata-kata masukan bukan mnemonik bip39. Jika alamat Anda dihasilkan oleh dompet ini, harap batalkan dialog ini dan periksa kata-kata Anda (tanpa spasi, tanpa huruf kapital, dll.). Jika Anda sudah memeriksa ulang kata-kata Anda, Anda dapat melanjutkan.'
    },
    restore_wif: {
        title: 'Pulihkan melalui WIF',
        priv_key: 'WIF'
    },
    restore_mobile: {
        title: 'Pulihkan dari Dompet Seluler'
    },
    restore_key_file: {
        title: 'Pulihkan Dari File Kunci',
        password_title: 'Silakan masukkan kata sandi Anda untuk mendekripsi dompet'
    },
    restore_ledger: {
        title: 'Pulihkan Dari Ledger',
        usage: 'Harap pastikan firmware dan aplikasi Anda adalah versi terbaru. Plugin Ledger Anda, buka Qtum APP, lalu klik tombol "HUBUNGKAN" di bawah, coba sambungkan.',
        download: 'Tidak ada aplikasi Qtum? Silakan instal, ikuti ini https://www.ledgerwallet.com/apps/manager',
        connect: 'HUBUNGKAN'
    },
    view: {
        title: 'Lihat Info Dompet'
    },
    view_tx: {
        title: 'Lihat Dompet Txs',
        recent: 'Recent 10 txs',
        tx: 'Tx: ',
        mined_at: 'Ditambang di ',
        total_in: 'JUMLAH MASUK: ',
        fee: 'BIAYA: ',
        total_out: 'JUMLAH KELUAR: '
    },
    dump_as_key_file: {
        title: 'Buang sebagai file kunci',
        password_title: 'Silakan masukkan kata sandi untuk mengenkripsi dompet Anda',
        warning: 'Harap ingat kata sandi ini, jika Anda kehilangan kata sandi ini, file cadangan ini tidak dapat didekripsi lagi'
    },
    config: {
        title: 'Pengaturan',
        lan: 'Bahasa',
        network: 'Jaringan',
        mode: 'Mode'
    },
    warning: {
        title: 'Peringatan',
        list: [
            'Kami tidak dapat memulihkan dana Anda jika Anda mengunjungi situs phishing atau kehilangan cadangan Anda. Harap pastikan untuk menyimpan cadangan kunci pribadi/kata-kata awal Anda.',
            'Kami tidak menyimpan kunci pribadi dan/atau seed word Anda di dompet web ini.',
            'Anda sebagai pengguna, bertanggung jawab penuh atas dana dan keamanan Anda sendiri.',
            'Pastikan untuk selalu memperbarui antivirus dan sistem operasi.',
            'Harap simpan kunci pribadi Anda PRIBADI, jangan berikan kepada siapa pun.',
            'Jika Anda menggunakan Pemulihan dari Mnemonic, kata-kata awal dan kata sandi harus tepat atau dompet akan membuat alamat baru. Saat menggunakan Pulihkan dari Mnemonic, pastikan Anda memiliki alamat yang benar.'
        ]
    },
    delegation: {
        title: 'Staking Luring',
        add: 'Tambah Delegasi',
        remove: 'Hapus Delegasi',
        contract_success: 'Pengiriman kontrak berhasil.',
        delegated: 'Alamat telah didelegasikan.',
        refresh_success: 'Penyegaran berhasil',
        address: 'Alamat: {address}',
        super_staker: 'Super Staker: {superStaker}',
        processing: 'Kontrak sedang diproses.'
    },
    nft: {
        title: 'NFT',
        send: 'kirim',
        create_title: 'BUAT NFT',
        create_name: 'Nama NFT',
        create_symbol: 'Simbol NFT',
        create_desc: 'Deskripsi NFT',
        create_supply: 'Jumlah NFT(MAKS 10)',
        send_nft: 'kirim NFT',
        close_confirm: 'tutup',
        send_confirm: 'konfirmasi',
        send_address: 'Alamat',
        send_amount: 'Jumlah'
    }
}
