export default {
    common: {
        confirm: '확인',
        cancel: '취소',
        search: '검색',
        copy: '복사',
        next: '다음',
        question_mark: '? ',
        testnet: 'Testnet',
        mainnet: 'Fastlane-Mainnet',
        menu: {
            create: '새 지갑 생성',
            create_from_mnemonic: '니모닉으로 생성',
            restore_from_mnemonic: '니모닉으로 복원',
            restore_from_wif: 'WIF로 복원',
            restore_from_mobile: '모바일 지갑에서 복원',
            restore_from_key_file: '키 파일에서 복원',
            restore_from_ledger: 'Ledger에서 복원',
            view: '지갑 정보 보기',
            dump_as_key_file: '키 파일로 덤프',
            transactions: '지갑 트랜잭션 보기',
            safe_send: '안전한 전송',
            send: '전송',
            request_payment: '지불 요청',
            create_contract: '컨트랙트 생성',
            send_to_contract: '컨트랙트 보내기',
            call_contract: '콜 컨트랙트',
            create_NFT: 'nft 만들기',
            delegation: '오프라인 스테이킹',
            settings: '설정'
        },
        info: {
            address: '주소',
            balance: '잔액',
            unconfirmed_balance: '미확인 잔액',
            priv_key: '개인 키',
            staker_address: '스테이커 주소',
            fee: '스테이커 수수료',
            gas_limit: 'Gas Limit',
            gas_price: 'Gas Price',
            tx_fee: ''
        },
        notify: {
            success: '성공',
            fail: '실패',
            copy: '복사',
            password: '패스워드',
            is_required: '필수사항',
            parse: '파싱',
            file: '파일',
            password_is_not_same_as_the_old_one: '패스워드가 이전 패스워드와 다릅니다.',
            mnemonics_are_not_same_as_the_words_should_remember: '니모닉이 기억해야 할 단어와 다릅니다.',
            mnemonics_can_not_restore: '그 니모닉은 지갑을 복원할 수 없습니다. 확인하고 다시 시도하십시오.',
            address_is_not_same_as_the_old_one: '이 주소는 이전 주소와 같지 않습니다.',
            from_address_is_not_same_as_the_wallet: '발신 주소가 지갑 주소와 다릅니다.',
            restore_wif_fail: '이 WIF에서 지갑을 복원할 수 없습니다.',
            the_key_file_is_not_a_valid_format: '키 파일이 올바른 형식이 아닙니다.',
            restore_key_file_fail: '키 파일에서 복원에 실패했습니다. 패스워드가 올바르지 않을 수 있습니다.',
            connect_ledger_fail: 'Ledger 연결 실패. Ledger를 다시 플러그인 하고 재시도하십시오.',
            token_contract_address_is_not_exists: '토큰 컨트랙트 주소가 없습니다. 확인한 후 다시 시도하십시오'
        },
        mode: {
            normal: '노멀',
            offline: '오프라인'
        }
    },
    mnemonic: {
        input_words: '단어를 입력하십시오',
        label: 'M'
    },
    password: {
        enter: '패스워드를 입력하십시오.',
        password: '패스워드'
    },
    file_reader: {
        upload: '업로드'
    },
    file_creator: {
        download: '다운로드가 시작되지 않으면이 버튼을 클릭하여 파일 다운로드를 시작하십시오. 마우스 오른쪽 버튼으로 클릭하고 "링크를 다른 이름으로 저장 ..."을 선택할 수 있습니다.'
    },
    ledger: {
        comm_fail: 'Ledger 연결 실패. Ledger를 다시 플러그인 하고 재시도하십시오.'
    },
    derive_path: {
        title: '드라이브 경로를 선택하십시오.',
        default: '기본 경로',
        add_custom: '커스텀 경로를 추가',
        edit_custom: '커스텀 경로를 수정',
        del_custom: '이 경로를 삭제 하시겠습니까?',
        path_name: '경로 이름',
        path: '경로',
        prev_10: '이전 10 Address',
        next_10: '다음 10 Address'
    },
    safe_send: {
        title: '안전한 전송',
        from_address: 'From Address',
        to_address: 'To Address',
        amount: '금액',
        fee: '수수료',
        info: '안전 전송을 완료하려면 두 대의 컴퓨터 (온라인과 오프라인 중 하나)와 제거 가능한 저장 장치가 필요합니다. 아래 팁을 따르는 경우 개인 키 누설의 위험은 없습니다. 오프라인 컴퓨터의 경우 "설정" - "모드"에서 "오프라인"을 선택한 다음 지갑을 복원하십시오.',
        info1_online: '양식을 작성한 다음 파일을 저장하고 오프라인 컴퓨터로 복사하십시오. 그리고 오프라인 컴퓨터의 2단계를 마칩니다.',
        info1_offline: '온라인 컴퓨터에서 1단계를 마치고 온라인 컴퓨터에서 파일을 복사한 다음 2단계로 이동하십시오.',
        info2_online: '오프라인 컴퓨터에서 이 단계를 완료하고 오프라인 컴퓨터에서 파일을 복사한 다음 3단계로 이동하십시오.',
        info2_offline: '온라인 컴퓨터에서 파일 복사본을 업로드하고 서명을 마친 다음 파일을 저장하고 다시 온라인 컴퓨터로 복사하십시오.',
        info3_online: '오프라인 컴퓨터에서 파일을 업로드한 다음 안전 전송을 완료하십시오.',
        info3_offline: '온라인 컴퓨터에서 이 단계를 완료하십시오.'
    },
    send: {
        send_tokens: '토큰 보내기',
        enter_address: '주소를 다시 입력하십시오 (다시 확인하십시오).',
        going_to_send: '보내겠습니다 ',
        to_address: 'to address ',
        token_address: '토큰 컨트랙트 주소'
    },
    request_payment: {
        title: '지불 요청'
    },
    create_contract: {
        title: '컨트랙트 생성',
        confirm: '이 컨트랙트를 게시하시겠습니까?',
        compiler: '컴파일러'
    },
    send_to_contract: {
        title: '컨트랙트 전송',
        confirm: '확인하셨나요?'
    },
    call_contract: {
        title: '콜 컨트랙트',
        result: '결과'
    },
    create: {
        title: '새 지갑 생성'
    },
    create_mnemonic: {
        title: '새 지갑 생성',
        remember: '다음 니모닉을 기억하십시오.',
        remembered: '나는 모든 것을 기억하였습니다'
    },
    restore: {
        title: '지갑 복원',
        mnemonic_warning: '입력한 단어는 bip39 니모닉이 아닙니다. 이 지갑에서 주소가 생성 된 경우 이 대화 상자를 취소 한 다음 단어를 확인하십시오 (공백이나 대문자가 없음). 단어를 두 번 확인했다면 계속 진행할 수 있습니다.'
    },
    restore_wif: {
        title: 'WIF에서 복원',
        priv_key: 'WIF'
    },
    restore_mobile: {
        title: '모바일 지갑에서 복원'
    },
    restore_key_file: {
        title: '키 파일에서 복원',
        password_title: '지갑을 복원하려면 패스워드를 입력하십시오'
    },
    restore_ledger: {
        title: 'Ledger에서 복원',
        usage: '펌웨어 및 응용 프로그램이 최신 버전인지 확인하십시오. 귀하의 Ledger를 플러그인하고 Qtum APP을 실행한 다음 아래의 "연결" 버튼을 클릭하여 연결하십시오.',
        download: 'Qtum APP이 없으신가요? 다음 항목을 설치하십시오 https://www.ledgerwallet.com/apps/manager',
        connect: '연결'
    },
    view: {
        title: '지갑 정보 보기'
    },
    view_tx: {
        title: '지갑 트랜잭션 보기',
        recent: '최근 10개의 트랜잭션',
        tx: 'Tx: ',
        mined_at: 'Mined at ',
        total_in: 'TOTAL IN: ',
        fee: '수수료: ',
        total_out: 'TOTAL OUT: '
    },
    dump_as_key_file: {
        title: '키 파일로 덤프',
        password_title: '지갑을 암호화하기위한 패스워드를 입력하십시오.',
        warning: '이 패스워드를 기억하십시오. 이 패스워드를 분실하면이 백업 파일을 더 이상 암호 해독 할 수 없습니다'
    },
    config: {
        title: '설정',
        lan: '언어',
        network: '네트워크',
        mode: '모드'
    },
    warning: {
        title: '경고',
        list: [
            '피싱 사이트를 방문하거나 백업을 상실하면 자금을 회수 할 수 없습니다. 개인 키 / 시드 단어의 백업을 유지하십시오.',
            '우리는 귀하의 개인 키 / 시드 단어를 웹 지갑에 저장하지 않습니다.',
            '귀하는 사용자로서 자신의 자금과 자신의 안전에 전적으로 책임이 있습니다.',
            '업데이트 된 바이러스 백신 및 운영체제를 유지하십시오.',
            '개인 키는 누구에게도 제공하지 마십시오.',
            '니모닉에서 복원을 사용하는 경우 시드 단어와 비밀번호가 정확히 맞아야하며 그렇지 않으면 지갑이 새 주소를 만듭니다. 니모닉에서 복원을 사용할 때 정확한 주소를 가지고 있는지 확인하십시오.'
        ]
    },
    delegation: {
        title: '오프라인 스테이킹',
        add: '위임 추가',
        remove: '위임 삭제',
        contract_success: '컨트랙트 내보내기 성공',
        delegated: '주소 위임 완료',
        refresh_success: '',
        address: '',
        super_staker: '',
        processing: ''
    },
    nft: {
        title: 'NFT',
        send: '보내기',
        create_title: '생성 NFT',
        create_name: 'NFT 이름',
        create_symbol: 'NFT 기호',
        create_desc: 'NFT 설명',
        create_supply: 'NFT 총량(MAX 10)',
        send_nft: '이전 NFT',
        close_confirm: '닫기',
        send_confirm: '확인',
        send_address: '주소',
        send_amount: '수량'
    }
}
