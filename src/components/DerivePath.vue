<template>
  <div>
    <p>{{ $t("derive_path.title") }}</p>
    <v-card-text>
      <v-data-table :items="pathTypeList" hide-headers hide-actions>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.path }}</td>
          <td class="text-xs-right">
            <template v-if="props.item.id">
              <v-btn
                @click="editCusPath(props.item)"
                color="primary"
                fab
                small
                flat
              >
                <v-icon>mode_edit</v-icon>
              </v-btn>
              <v-btn
                @click="delCusPath(props.item.id)"
                color="error"
                fab
                small
                flat
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </template>
            <v-btn
              @click="choosePath(props.item)"
              color="success"
              fab
              small
              flat
            >
              <v-icon>lock_open</v-icon>
            </v-btn>
          </td>
        </template>
        <template slot="footer">
          <td colspan="100%">
            <v-btn color="info" dark @click="addCusPath">{{
              $t("derive_path.add_custom")
            }}</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card-text>

    <v-layout row justify-center>
      <v-dialog v-model="showPathForm" max-width="50%">
        <v-card>
          <v-card-title>
            <span class="headline">{{ pathFormName }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    :label="$t('derive_path.path_name') + '*'"
                    v-model.trim="pathFormPathName"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    :label="$t('derive_path.path') + '*'"
                    v-model.trim="pathFormPath"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click="savePathForm">{{
              $t("common.confirm")
            }}</v-btn>
            <v-btn
              class="red--text darken-1"
              flat
              @click.native="showPathForm = false"
              >{{ $t("common.cancel") }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="showAddressList" max-width="80%">
        <v-card>
          <v-card-title>
            <span class="headline"
              >{{ addressListPathName }} {{ addressListPath }}</span
            >
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="addressListHeaders"
              :items="addressList"
              :loading="addressListLoading"
              no-data-text=""
              hide-actions
            >
              <template slot="items" slot-scope="props">
                <td>{{ addressListPath }}/{{ props.item.path }}</td>
                <td>{{ props.item.wallet.getAddress() }}</td>
                <td class="text-xs-right">
                  {{ props.item.wallet.info.balance }}
                </td>
                <td class="text-xs-right">
                  <v-btn
                    @click="setWallet(props.item.wallet, props.item.path)"
                    color="success"
                    fab
                    small
                    flat
                  >
                    <v-icon>lock_open</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="green--text darken-1"
              v-if="addressListPos > 0"
              flat
              @click="prev10Address"
              >{{ $t("derive_path.prev_10") }}</v-btn
            >
            <v-btn class="green--text darken-1" flat @click="next10Address">{{
              $t("derive_path.next_10")
            }}</v-btn>
            <v-btn
              class="red--text darken-1"
              flat
              @click.native="showAddressList = false"
              >{{ $t("common.cancel") }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import webWallet from '@/libs/web-wallet'
import store from 'store'

export default {
  data() {
    return {
      walletCache: {},
      hdNodeCache: {},
      posCache: {},
      pathTypeList: [
        {
          name: this.$t('derive_path.default'),
          path: webWallet.getLedgerDefaultPath()
        }
      ].concat(store.get('ledgerPath', [])),

      showPathForm: false,
      pathFormName: '',
      pathFormPathName: '',
      pathFormPath: '',
      pathFormPathId: '',

      activePath: null,
      showAddressList: false,
      addressListLoading: false,
      addressListPathName: '',
      addressListPath: '',
      addressListPos: 0,
      addressListHeaders: [
        { text: 'Path', value: 'path', align: 'left', sortable: false },
        { text: 'Address', value: 'address', align: 'left', sortable: false },
        { text: 'Balance', value: 'balance', sortable: false },
        { text: '', value: '', sortable: false }
      ],
      addressList: []
    }
  },
  props: ['ledger'],
  methods: {
    addCusPath() {
      this.showPathForm = true
      this.pathFormName = this.$t('derive_path.add_custom')
      this.pathFormPathId = Date.now()
      this.pathFormPathName = ''
      this.pathFormPath = ''
    },
    editCusPath(pathItem) {
      this.showPathForm = true
      this.pathFormName = this.$t('derive_path.edit_custom')
      this.pathFormPathId = pathItem.id
      this.pathFormPathName = pathItem.name
      this.pathFormPath = pathItem.path
    },
    delCusPath(id) {
      if (confirm(this.$t('derive_path.del_custom'))) {
        this.updateCusPath(id)
      }
    },
    updateCusPath(id, data = undefined) {
      const cusPathList = store.get('ledgerPath', [])
      let i
      for (i = 0; i < cusPathList.length; i++) {
        if (cusPathList[i].id === id) {
          break
        }
      }
      cusPathList.splice(i, 1)
      this.pathTypeList.splice(i + 1, 1)
      if (data !== undefined) {
        cusPathList.splice(i, 0, data)
        this.pathTypeList.splice(i + 1, 0, data)
      }
      store.set('ledgerPath', cusPathList)
    },
    savePathForm() {
      this.updateCusPath(this.pathFormPathId, {
        id: this.pathFormPathId,
        name: this.pathFormPathName,
        path: this.pathFormPath
      })
      this.showPathForm = false
    },
    choosePath(path) {
      this.activePath = path
      if (this.posCache[path.path] === undefined) {
        this.posCache[path.path] = 0
      }
      this.addressListPos = this.posCache[path.path]
      this.showAddressList = true
      this.addressListPathName = path.name
      this.addressListPath = path.path
      this.addressListLoading = true
      this.addressList = []
      setTimeout(async () => {
        this.addressList = await this.getAddressList(
          path.path,
          this.addressListPos
        )
        this.addressListLoading = false
      }, 10)
    },
    next10Address() {
      const path = this.activePath
      if (this.posCache[path.path] === undefined) {
        this.posCache[path.path] = 0
      }
      this.posCache[path.path] += 10
      this.addressListPos = this.posCache[path.path]
      this.addressListLoading = true
      this.addressList = []
      setTimeout(async () => {
        this.addressList = await this.getAddressList(
          path.path,
          this.addressListPos
        )
        this.addressListLoading = false
      }, 10)
    },
    prev10Address() {
      const path = this.activePath
      if (this.posCache[path.path] === undefined) {
        this.posCache[path.path] = 0
      }
      this.posCache[path.path] = Math.max(this.posCache[path.path] - 10, 0)
      this.addressListPos = this.posCache[path.path]
      this.addressListLoading = true
      this.addressList = []
      setTimeout(async () => {
        this.addressList = await this.getAddressList(
          path.path,
          this.addressListPos
        )
        this.addressListLoading = false
      }, 10)
    },
    async getAddressList(path, start) {
      if (this.hdNodeCache[path] === undefined) {
        try {
          this.hdNodeCache[path] = await webWallet.restoreHdNodeFromLedgerPath(
            this.ledger,
            path
          )
        } catch (e) {
          alert(`${e.message}

${this.$t('ledger.comm_fail')}`)
          return
        }
      }
      const hdNode = this.hdNodeCache[path]
      if (this.walletCache[path] === undefined) {
        this.walletCache[path] = {}
      }
      if (this.walletCache[path][start] === undefined) {
        webWallet.restoreFromHdNodeByPage(hdNode, start).forEach(item => {
          this.walletCache[path][item.path] = item
        })
      }
      const returnList = []
      for (let i = start; i < start + 10; i++) {
        returnList[returnList.length] = this.walletCache[path][i]
      }
      return returnList
    },
    setWallet(wallet, index) {
      wallet.extend.ledger.path += '/' + index
      this.$emit('setWallet', wallet)
    }
  }
}
</script>
