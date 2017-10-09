import bitcoin from 'bitcoinjs-lib'
import config from 'config'

let pubKeyHash = ''
switch (config.get('network', 'skynet'))
{
  case 'skynet':
    pubKeyHash = 0x78
    break
  case 'mainnet':
    pubKeyHash = 0x3a
    break
}
bitcoin.networks.bitcoin.pubKeyHash = pubKeyHash

export default bitcoin
