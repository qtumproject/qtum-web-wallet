<template>
  <!-- 委派矿工列表 -->
  <section class="delegation-list">
    <!-- 每一项委托 -->
    <section class="delegation-list__item" >
      <!-- 左边内容 -->
      <section class="delegation-list__left">
        <div class="header">
          <span class="name">Fee</span>
          <span class="fee">（ {{ fee }}% ）</span>
        </div>
        <span class="address">{{ address }}</span>
      </section>
      <!-- 右边内容 -->
      <section class="delegation-list__right">
        <div class="balance">{{ balance }}</div>
        <v-btn fab error small class="action" @click="removeDelegationDialog = true">
          <v-icon>close</v-icon>
        </v-btn>
      </section>
    </section>
    <!-- 删除代理 模态框 -->
    <v-dialog v-model="removeDelegationDialog" persistent max-width="50%">
      <v-card>
        <!-- dialog 标题 -->
        <v-card-title>
          <h5>Remove Delegations</h5>
        </v-card-title>
        <!-- 添加表单部分 -->
        <v-card-text>
          <v-form>
            <v-layout wrap>
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
          <v-btn class="blue--text darken-1" flat @click="removeDelegation">{{ $t('common.confirm') }}</v-btn>
          <v-btn class="red--text darken-1" flat @click.native="removeDelegationDialog = false">
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

export default {
  data () {
    return {
      snackbarShow: false,
      removeDelegationDialog: false,
      removeAbi: {name: 'removeDelegation',inputs:[]},
      contractAddress: '0000000000000000000000000000000000000086',
      txFee: '0.01',
      info: {
        gasLimit: '2500000',
        gasPrice: 40,
        gasUnit: 'qtum'
      },
      tip: {
        type: 'error',
        msg: ''
      },
    }
  },
  props: {
    wallet: Object
  },
  computed: {
    superStaker() {
      return this.wallet.info.superStaker
    },
    fee() {
      return this.wallet.info.fee
    },
    address() {
      return this.wallet.info.address
    },
    balance() {
      return this.wallet.info.balance
    },
  },
  methods: {
    async removeDelegation() {
      console.log(this.info)
      try {
        // 编码 abi
        const encodedData = abi.encodeMethod(this.removeAbi, []).substr(2)
        // 把交易编码成 raw tx
        const rawTx = await this.wallet.generateSendToContractTx(this.contractAddress, encodedData, this.info.gasLimit, this.info.gasPrice, this.txFee)
        // 发送交易
        const res = await this.wallet.sendRawTx(rawTx)

        if (res.txId) {
          this.snackbarShow = true
          this.tip.type = "success"
          this.tip.msg = this.$t('delegations.contract_success')
          this.removeDelegationDialog = false
        }
      } catch (error) {
        this.snackbarShow = true
        this.tip.type = "error"
        this.tip.msg = error.message
        this.removeDelegationDialog = false
      }
      
    }
  }
}
</script>

<style lang="less" scoped>
.delegation-list {
  .delegation-list__item {
    display: flex;
    flex: 1;
    margin-top: 20px;
    .delegation-list__left, .delegation-list__right {
      width: 50%;
    }
    .delegation-list__left {
      padding-right: 10px;
      border-right: 1px solid #666;
      .header {
        display: flex;
        align-items: baseline;
        margin-bottom: 10px;
        .name {
          font-size: 24px;
        }
        .fee {
          font-style: italic;
          color: #999;
        }
      }
      .address {
        color: #aaa;
      }
    }
    .delegation-list__right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 20px;
      .balance {
        font-size: 20px;
      }
      .stake {
        color: #999;
      }
      .action {
        z-index: 2;
      }
    }
  }
}
</style>
