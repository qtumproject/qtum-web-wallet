<template>
  <section class="delegation-head-action">
    <!-- 展示内容部分 -->
    <section class="main">
      <!-- 标题部分 -->
      <section class="title">{{ $t('delegations.add') }}</section>
      <!-- 添加按钮 -->
      <section>
        <v-btn round info @click.native="checkDelegation">
          <v-icon>add</v-icon>
        </v-btn>
      </section>
    </section>
    <!-- 添加信息模态框 -->
    <v-dialog v-model="addDelegationDialog" persistent max-width="50%">
      <v-card>
        <!-- dialog 标题 -->
        <v-card-title>
          <h5>Add delegations</h5>
        </v-card-title>
        <!-- 添加表单部分 -->
        <v-card-text>
          <v-form v-model="formValidate">
            <v-layout wrap>
              <v-flex xs8 offset-xs2>
                <v-text-field clearable :label="$t('common.info.staker_address')" v-model="info.stakerAddress" :rules="[rules.required]"/>
              </v-flex>
              <v-flex xs8 offset-xs2>
                <v-text-field :label="$t('common.info.fee')" type="number" suffix="%" v-model="info.fee" min="0"/>
              </v-flex>
              <v-flex xs8 offset-xs2>
                <v-text-field :label="$t('common.info.address')" v-model="address" disabled/>
              </v-flex>
              <v-flex xs8 offset-xs2>
                <v-text-field :label="$t('common.info.gas_limit')" type="number" v-model="info.gasLimit"/>
              </v-flex>
              <v-flex xs4 offset-xs2>
                <v-text-field :label="$t('common.info.gas_price')" v-model="info.gasPrice" type="number" min="0" suffix="e-8 Qtum/gas"/>
              </v-flex>
              <v-flex xs3 offset-xs1>
                <v-select :label="$t('common.info.gas_unit')" v-model="info.gasUnit" :items="[{text: 'Qtum', value: 'qtum'}]"/>
              </v-flex>
              <v-flex xs8 offset-xs2>
                <v-text-field :label="$t('common.info.tx_fee')" v-model="txFee" type="number" step="0.01"/>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <!-- 表单提交部分 -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click="confirmSend">{{ $t('common.confirm') }}</v-btn>
          <v-btn class="red--text darken-1" flat @click.native="addDelegationDialog = false">
            {{ $t('common.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 信息提示 -->
    <v-snackbar
      v-model="snackbarShow"
      top right
      :color="tip.type"
      clearable
    >
      <section>
        {{ tip.msg }}
      </section>
      <v-btn icon small @click="snackbarShow = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </section>
</template>

<script>
import abi from 'ethjs-abi'
import bitcoinMessage from 'bitcoinjs-message'
import bitcoin from 'bitcoinjs-lib'
import qtum from 'qtumjs-lib'

export default {
  data(){
    return {
      addDelegationDialog: false,
      snackbarShow: false,
      formValidate: false,
      addAbi: {name: 'addDelegation',inputs:[{name:'staker',type:'address'},{name:'fee',type:'uint8'},{name:'PoD',type:'bytes'}]},
      contractAddress: '0000000000000000000000000000000000000086',
      txFee: '0.01',
      info: {
        stakerAddress: '',
        fee: 10,
        gasLimit: '2500000',
        gasPrice: 40,
        gasUnit: 'qtum'
      },
      tip: {
        type: 'error',
        msg: ''
      },
      rules: {
        required: value => !!value || 'Required.',
      }
    }
  },
  props: [
    'wallet'
  ],
  computed: {
    superStaker() {
      return this.wallet.info.superStaker
    },
    address() {
      return this.wallet.info.address
    },
    keyPair() {
      return this.wallet.keyPair
    }
  },
  methods: {
    async confirmSend() {
      if (!this.formValidate) return
      // 将地址转换为 hex
      const hexAddress = qtum.address.fromBase58Check(this.info.stakerAddress).hash.toString("hex")

      // 使用私钥对代理地址签名
      var signature = '0x' + bitcoinMessage.sign(
        hexAddress, 
        this.keyPair.d.toBuffer(), 
        this.keyPair.compressed, 
        this.keyPair.network.messagePrefix
      ).toString("hex")

      // 组合所需参数
      const params = [ "0x" + hexAddress, this.info.fee, signature ]

      // 编码 abi
      const encodedData = abi.encodeMethod(this.addAbi, params).substr(2)
      
      // 把交易编码成 raw tx
      const rawTx = await this.wallet.generateSendToContractTx(this.contractAddress, encodedData, this.info.gasLimit, this.info.gasPrice, this.txFee)

      // 发送交易
      const res = await this.wallet.sendRawTx(rawTx)
      if (res.txId) {
        this.snackbarShow = true
        this.tip.msg = this.$t('delegations.contract_success')
        this.tip.type = "success"
        this.addDelegationDialog = false
      }
    },
    checkDelegation() {
      if (this.superStaker) {
        this.snackbarShow = true
        this.tip.msg = this.$t('delegations.delegated')
        this.tip.type = "error"
        return
      }
      this.addDelegationDialog = true
    }
  }
}
</script>

<style lang="less" scoped>
.delegation-head-action {
  padding-bottom: 20px;
  border-bottom: 1px solid #666;
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 28px;
    }
  }
}
</style>
