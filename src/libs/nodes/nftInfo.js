/*
 * @description: nft相关数据
 */
import config from '@/libs/config'

export const nftAbi = [{
        'inputs': [],
        'stateMutability': 'nonpayable',
        'type': 'constructor'
    },
    {
        'anonymous': false,
        'inputs': [{
                'indexed': true,
                'internalType': 'address',
                'name': 'account',
                'type': 'address'
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'operator',
                'type': 'address'
            },
            {
                'indexed': false,
                'internalType': 'bool',
                'name': 'approved',
                'type': 'bool'
            }
        ],
        'name': 'ApprovalForAll',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [{
                'indexed': true,
                'internalType': 'address',
                'name': 'operator',
                'type': 'address'
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'from',
                'type': 'address'
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'to',
                'type': 'address'
            },
            {
                'indexed': false,
                'internalType': 'uint256[]',
                'name': 'ids',
                'type': 'uint256[]'
            },
            {
                'indexed': false,
                'internalType': 'uint256[]',
                'name': 'values',
                'type': 'uint256[]'
            }
        ],
        'name': 'TransferBatch',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [{
                'indexed': true,
                'internalType': 'address',
                'name': 'operator',
                'type': 'address'
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'from',
                'type': 'address'
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'to',
                'type': 'address'
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'id',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'value',
                'type': 'uint256'
            }
        ],
        'name': 'TransferSingle',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [{
                'indexed': false,
                'internalType': 'string',
                'name': 'value',
                'type': 'string'
            },
            {
                'indexed': true,
                'internalType': 'uint256',
                'name': 'id',
                'type': 'uint256'
            }
        ],
        'name': 'URI',
        'type': 'event'
    },
    {
        'inputs': [{
                'internalType': 'address',
                'name': 'account',
                'type': 'address'
            },
            {
                'internalType': 'uint256',
                'name': 'id',
                'type': 'uint256'
            }
        ],
        'name': 'balanceOf',
        'outputs': [{
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
        }],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [{
                'internalType': 'address[]',
                'name': 'accounts',
                'type': 'address[]'
            },
            {
                'internalType': 'uint256[]',
                'name': 'ids',
                'type': 'uint256[]'
            }
        ],
        'name': 'balanceOfBatch',
        'outputs': [{
            'internalType': 'uint256[]',
            'name': '',
            'type': 'uint256[]'
        }],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [{
                'internalType': 'address',
                'name': 'owner',
                'type': 'address'
            },
            {
                'internalType': 'uint256[]',
                'name': '_ids',
                'type': 'uint256[]'
            }
        ],
        'name': 'batchNFTInfoByIds',
        'outputs': [{
            'components': [{
                    'internalType': 'uint256',
                    'name': 'NFTId',
                    'type': 'uint256'
                },
                {
                    'internalType': 'string',
                    'name': 'name',
                    'type': 'string'
                },
                {
                    'internalType': 'string',
                    'name': 'url',
                    'type': 'string'
                },
                {
                    'internalType': 'string',
                    'name': 'desc',
                    'type': 'string'
                },
                {
                    'internalType': 'uint256',
                    'name': 'createAt',
                    'type': 'uint256'
                },
                {
                    'internalType': 'uint32',
                    'name': 'count',
                    'type': 'uint32'
                }
            ],
            'internalType': 'struct QtumNFT.WalletNFTInfo[]',
            'name': '',
            'type': 'tuple[]'
        }],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [{
                'internalType': 'address',
                'name': 'owner',
                'type': 'address'
            },
            {
                'internalType': 'string',
                'name': 'name',
                'type': 'string'
            },
            {
                'internalType': 'string',
                'name': 'url',
                'type': 'string'
            },
            {
                'internalType': 'string',
                'name': 'desc',
                'type': 'string'
            },
            {
                'internalType': 'uint32',
                'name': 'count',
                'type': 'uint32'
            }
        ],
        'name': 'createNFT',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [{
                'internalType': 'address',
                'name': 'owner',
                'type': 'address'
            },
            {
                'internalType': 'uint256',
                'name': 'fromIndex',
                'type': 'uint256'
            },
            {
                'internalType': 'uint256',
                'name': 'take',
                'type': 'uint256'
            }
        ],
        'name': 'getNFTListByOwner',
        'outputs': [{
                'internalType': 'uint256[]',
                'name': '',
                'type': 'uint256[]'
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [{
                'internalType': 'address',
                'name': 'account',
                'type': 'address'
            },
            {
                'internalType': 'address',
                'name': 'operator',
                'type': 'address'
            }
        ],
        'name': 'isApprovedForAll',
        'outputs': [{
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
        }],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [{
                'internalType': 'address',
                'name': 'from',
                'type': 'address'
            },
            {
                'internalType': 'address',
                'name': 'to',
                'type': 'address'
            },
            {
                'internalType': 'uint256[]',
                'name': 'ids',
                'type': 'uint256[]'
            },
            {
                'internalType': 'uint256[]',
                'name': 'amounts',
                'type': 'uint256[]'
            },
            {
                'internalType': 'bytes',
                'name': 'data',
                'type': 'bytes'
            }
        ],
        'name': 'safeBatchTransferFrom',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [{
                'internalType': 'address',
                'name': 'from',
                'type': 'address'
            },
            {
                'internalType': 'address',
                'name': 'to',
                'type': 'address'
            },
            {
                'internalType': 'uint256',
                'name': 'id',
                'type': 'uint256'
            },
            {
                'internalType': 'uint256',
                'name': 'amount',
                'type': 'uint256'
            }
        ],
        'name': 'safeTransferFrom',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [{
                'internalType': 'address',
                'name': 'operator',
                'type': 'address'
            },
            {
                'internalType': 'bool',
                'name': 'approved',
                'type': 'bool'
            }
        ],
        'name': 'setApprovalForAll',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [{
            'internalType': 'bytes4',
            'name': 'interfaceId',
            'type': 'bytes4'
        }],
        'name': 'supportsInterface',
        'outputs': [{
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
        }],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [{
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
        }],
        'name': 'uri',
        'outputs': [{
            'internalType': 'string',
            'name': '',
            'type': 'string'
        }],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [{
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
        }],
        'name': 'walletNFTList',
        'outputs': [{
                'internalType': 'uint256',
                'name': 'NFTId',
                'type': 'uint256'
            },
            {
                'internalType': 'string',
                'name': 'name',
                'type': 'string'
            },
            {
                'internalType': 'string',
                'name': 'url',
                'type': 'string'
            },
            {
                'internalType': 'string',
                'name': 'desc',
                'type': 'string'
            },
            {
                'internalType': 'uint256',
                'name': 'createAt',
                'type': 'uint256'
            },
            {
                'internalType': 'uint32',
                'name': 'count',
                'type': 'uint32'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    }
]

export const nftAbiMap = {}
nftAbi.map((nft) => {
    const name = nft.name
    if (name) {
        nftAbiMap[name] = nft
    }
})

export function getNFTContractAddress() {
    switch (config.getNetwork()) {
        case 'testnet':
            return '16c98b19e66e931b7ada0d5ca41006f33cea5c29'
        case 'mainnet':
            return '4e4d13a577072f0f5cb6fc1a17c96489de0f533e'
    }
}
