<template>
  <!-- 委派矿工列表 -->
  <section class="delegation-list">
    <!-- 每一项委托 -->
    <section class="delegation-list__item">
      <!-- 左边内容 -->
      <section class="delegation-list__left">
        <div class="header">
          <span class="name text--lighten-4" :class="textColor">Fee</span>
          <span class="fee" :class="textColor">（ {{ fee }}% ）</span>
        </div>
        <span :class="textColor">{{
          $t("delegation.address", { address })
        }}</span
        ><br />
        <span :class="textColor">{{
          $t("delegation.super_staker", { superStaker })
        }}</span>
      </section>
      <!-- 右边内容 -->
      <section class="delegation-list__right">
        <div class="balance text--lighten-4" :class="textColor">
          {{ balance }}
        </div>
        <v-btn fab error small class="action" @click="checkDelDelegation">
          <v-icon>close</v-icon>
        </v-btn>
      </section>
    </section>
    <!-- 删除代理 模态框 -->
    <v-dialog v-model="removeDelegationDialog" persistent max-width="50%">
      <v-card>
        <!-- dialog 标题 -->
        <v-card-title>
          <h5>{{ $t("delegation.remove") }}</h5>
        </v-card-title>
        <!-- 添加表单部分 -->
        <v-card-text>
          <v-form>
            <v-layout wrap>
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
          <v-btn class="blue--text darken-1" flat @click="removeDelegation">{{
            $t("common.confirm")
          }}</v-btn>
          <v-btn
            class="red--text darken-1"
            flat
            @click.native="removeDelegationDialog = false"
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
import server from '@/libs/server'

export default {
  data() {
    return {
      removeDelegationDialog: false,
      removeAbi: { name: 'removeDelegation', inputs: [] },
      contractAddress: '0000000000000000000000000000000000000086',
      txFee: '0.01',
      info: {
        gasLimit: '2500000',
        gasPrice: 40
      }
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
    textColor() {
      let color = ''
      switch (this.wallet.info.delegateStatus) {
        case 'addDelegation':
        case 'delDelegation':
          color = 'brown'
          break
        case 'delegated':
          color = 'grey'
          break
      }
      return color + '--text'
    }
  },
  methods: {
    async removeDelegation() {
      try {
        // 编码 abi
        const encodedData = abi.encodeMethod(this.removeAbi, []).substr(2)
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
          const txViewUrl = server.currentNode().getTxExplorerUrl(res.txId)
          this.$root.success(
            `Successful send. You can view at <a href="${txViewUrl}" target="_blank">${txViewUrl}</a>`,
            true,
            0
          )

          // 临时删除
          this.wallet.setDelegation('', '')
          this.wallet.setDelegationStatus('delDelegation')

          this.removeDelegationDialog = false
        }
      } catch (error) {
        this.$emit('notify', error.message, 'error')
        this.removeDelegationDialog = false
      }
    },
    checkDelDelegation() {
      if (this.wallet.info.delegateStatus !== 'delegated') {
        this.$emit('notify', this.$t('delegation.processing'), 'error')
        return
      }
      this.removeDelegationDialog = true
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
    .delegation-list__left,
    .delegation-list__right {
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
        }
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
      .action {
        z-index: 2;
      }
    }
  }
}
</style>
