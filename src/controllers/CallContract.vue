<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("call_contract.title") }}</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <!-- 合约地址 input -->
        <v-text-field
          label="Contract Address"
          v-model.trim="contractAddress"
          required
        ></v-text-field>
        <!-- 合约 ABI -->
        <v-text-field
          label="ABI"
          v-model.trim="abi"
          required
          multiLine
          @input="decodeAbi"
        ></v-text-field>
        <!-- 合约方法选择 -->
        <v-select
          :items="parsedAbi"
          label="Method"
          v-model="method"
          single-line
          return-object
          bottom
        ></v-select>
        <!-- 合约参数 -->
        <template v-if="params">
          <v-text-field
            v-for="(param, index) in params"
            :label="param.name"
            :key="index"
            v-model="inputParams[index]"
          ></v-text-field>
        </template>
      </v-form>
    </v-card-text>
    <!-- 合约确认按钮 -->
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="success" dark @click="callTo" :disabled="notValid">{{
        $t("common.confirm")
      }}</v-btn>
    </v-card-actions>
    <v-dialog v-model="execResultDialog" persistent max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{ $t("call_contract.result") }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Result"
                  v-model="result"
                  multi-line
                  disabled
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="blue--text darken-1"
            flat
            @click.native="execResultDialog = false"
            >{{ $t("common.confirm") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import webWallet from '@/libs/web-wallet'
import abi from 'ethjs-abi'

export default {
  data() {
    return {
      contractAddress: '',
      abi: '',
      parsedAbi: null,
      method: null,
      inputParams: [],
      execResultDialog: false,
      result: 'loading...'
    }
  },
  computed: {
    params: function () {
      if (this.method === null) {
        return null
      }
      const inputs = this.method.info.inputs
      if (inputs.length > 0) {
        return inputs
      }
      return null
    },
    notValid: function () {
      //@todo valid the address
      return !(this.method !== null)
    }
  },
  watch: {
    method: function () {
      this.inputParams = []
    }
  },
  methods: {
    decodeAbi() {
      try {
        const abiJson = JSON.parse(this.abi)
        this.parsedAbi = []
        for (let i = 0; i < abiJson.length; i++) {
          // 过滤 constructor & event
          if (abiJson[i].type === 'constructor' || abiJson[i].type === 'event')
            continue
          this.parsedAbi.push({
            text: abiJson[i]['name'],
            value: i,
            info: abiJson[i]
          })
        }
      } catch (e) {
        this.$root.log.error(
          'call_contract_decode_abi_error',
          e.stack || e.toString() || e
        )
        return true
      }
    },
    async callTo() {
      try {
        const encodedData = abi
          .encodeMethod(this.method.info, this.inputParams)
          .substr(2)
        this.execResultDialog = true
        try {
          this.result = await webWallet
            .getWallet()
            .callContract(this.contractAddress, encodedData)
        } catch (e) {
          this.$root.log.error(
            'call_contract_call_contract_error',
            e.stack || e.toString() || e
          )
          alert(e.message || e)
          this.execResultDialog = false
        }
      } catch (e) {
        this.$root.error('Params error')
        this.$root.log.error(
          'call_contract_encode_abi_error',
          e.stack || e.toString() || e
        )
        return false
      }
    }
  }
}
</script>
