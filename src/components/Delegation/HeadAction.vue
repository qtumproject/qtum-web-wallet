<template>
  <section class="delegation-head-action">
    <!-- 展示内容部分 -->
    <section class="main">
      <!-- 标题部分 -->
      <section class="title">{{ $t("delegation.add") }}</section>
      <!-- 添加按钮 -->
      <section>
        <v-btn
          round
          info
          @click.native="checkDelegation"
          :disabled="delegateStatus !== 'none'"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn round info @click.native="refreshData" color="purple">
          <v-icon>replay</v-icon>
        </v-btn>
      </section>
    </section>
    <!-- 添加信息模态框 -->
    <v-dialog v-model="addDelegationDialog" persistent max-width="50%">
      <v-card>
        <!-- dialog 标题 -->
        <v-card-title>
          <h5>{{ $t("delegation.add") }}</h5>
        </v-card-title>
        <!-- 添加表单部分 -->
        <v-card-text>
          <v-form v-model="formValidate" ref="addDelegationForm">
            <v-layout wrap>
              <v-flex xs8 offset-xs2>
                <v-text-field
                  clearable
                  :label="$t('common.info.staker_address')"
                  v-model="info.stakerAddress"
                  :rules="[rules.required]"
                />
              </v-flex>
              <v-flex xs8 offset-xs2>
                <v-text-field
                  :label="$t('common.info.fee')"
                  type="number"
                  suffix="%"
                  v-model="info.fee"
                  min="0"
                />
              </v-flex>
              <v-flex xs8 offset-xs2>
                <v-text-field
                  :label="$t('common.info.address')"
                  v-model="address"
                  disabled
                />
              </v-flex>
              <v-flex xs8 offset-xs2>
                <v-text-field
                  :label="$t('common.info.gas_limit')"
                  type="number"
                  v-model="info.gasLimit"
                />
              </v-flex>
              <v-flex xs8 offset-xs2>
                <v-text-field
                  :label="$t('common.info.gas_price')"
                  v-model="info.gasPrice"
                  type="number"
                  min="0"
                  suffix="e-8 Qtum/gas"
                />
              </v-flex>
              <v-flex xs8 offset-xs2>
                <v-text-field
                  :label="$t('common.info.tx_fee')"
                  v-model="txFee"
                  type="number"
                  step="0.01"
                />
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <!-- 表单提交部分 -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click="confirmSend">{{
            $t("common.confirm")
          }}</v-btn>
          <v-btn
            class="red--text darken-1"
            flat
            @click.native="addDelegationDialog = false"
          >
            {{ $t("common.cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import abi from 'ethjs-abi'
import qtum from 'qtumjs-lib'
import server from '@/libs/server'

export default {
  data() {
    return {
      addDelegationDialog: false,
      formValidate: false,
      addAbi: {
        name: 'addDelegation',
        inputs: [
          { name: 'staker', type: 'address' },
          { name: 'fee', type: 'uint8' },
          { name: 'PoD', type: 'bytes' }
        ]
      },
      contractAddress: '0000000000000000000000000000000000000086',
      txFee: '0.01',
      info: {
        stakerAddress: '',
        fee: 10,
        gasLimit: '2500000',
        gasPrice: 40
      },
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  props: ['wallet'],
  computed: {
    superStaker() {
      return this.wallet.info.superStaker
    },
    address() {
      return this.wallet.info.address
    },
    keyPair() {
      return this.wallet.keyPair
    },
    delegateStatus() {
      return this.wallet.info.delegateStatus
    }
  },
  methods: {
    async confirmSend() {
      // 验证表单内容
      this.$refs.addDelegationForm.validate()
      if (!this.formValidate) return

      // 将地址转换为 hex
      const hexAddress = qtum.address
        .fromBase58Check(this.info.stakerAddress)
        .hash.toString('hex')

      // 使用私钥对代理地址签名
      var signature =
        '0x' + this.wallet.signMessage(hexAddress).toString('hex')

      // 组合所需参数
      const params = ['0x' + hexAddress, this.info.fee, signature]

      // 编码 abi
      const encodedData = abi.encodeMethod(this.addAbi, params).substr(2)

      // 把交易编码成 raw tx
      const rawTx = await this.wallet.generateSendToContractTx(
        this.contractAddress,
        encodedData,
        this.info.gasLimit,
        this.info.gasPrice,
        this.txFee
      )

      // 发送交易
      const res = await this.wallet.sendRawTx(rawTx)

      // 合约调用成功
      if (res.txId) {
        // 临时设置代理
        this.wallet.setDelegation(this.info.stakerAddress, this.info.fee)
        this.wallet.setDelegationStatus('addDelegation')

        const txViewUrl = server.currentNode().getTxExplorerUrl(res.txId)
        this.$root.success(
          `Successful send. You can view at <a href="${txViewUrl}" target="_blank">${txViewUrl}</a>`,
          true,
          0
        )

        this.addDelegationDialog = false
      } else {
        this.$root.error(`Send Failed : ${res.message}`, true, 0)
      }
    },
    checkDelegation() {
      if (this.superStaker) {
        this.$emit('notify', this.$t('delegation.delegated'), 'error')
        return
      }
      this.info.stakerAddress = ''
      this.addDelegationDialog = true
    },
    async refreshData() {
      await this.wallet.setInfo()
      this.$emit('notify', this.$t('delegation.refresh_success'), 'success')
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
