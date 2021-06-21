<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("config.title") }}</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs6>
            <v-subheader>{{ $t("config.lan") }}</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="lanSelect"
              v-model="lan"
              :label="$t('config.lan')"
              single-line
              bottom
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader>{{ $t("config.network") }}</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="networkSelect"
              v-model="network"
              :label="$t('config.network')"
              single-line
              bottom
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader>{{ $t("config.mode") }}</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="modeSelect"
              v-model="mode"
              :label="$t('config.mode')"
              single-line
              bottom
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader>LOG</v-subheader>
          </v-flex>
          <v-flex xs6>
            <file-creator color="red" :href="fileStr"
              >DOWNLOAD LOGS</file-creator
            >
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="warning" @click="save">{{ $t("common.confirm") }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import config from '@/libs/config'
import track from '@/libs/track'
import fileCreator from '@/components/FileCreator'

const loadConfig = {
  lan: config.getLan(),
  network: config.getNetwork(),
  mode: config.getMode()
}

export default {
  data() {
    return {
      lan: loadConfig.lan,
      lanSelect: [
        { value: 'zh', text: '中文' },
        { value: 'en', text: 'En' },
        { value: 'ko', text: '한글' }
      ],
      network: loadConfig.network,
      networkSelect: [
        { value: 'testnet', text: this.$t('common.testnet') },
        { value: 'mainnet', text: this.$t('common.mainnet') }
      ],
      mode: loadConfig.mode,
      modeSelect: [
        { value: 'normal', text: this.$t('common.mode.normal') },
        { value: 'offline', text: this.$t('common.mode.offline') }
      ]
    }
  },
  components: {
    fileCreator
  },
  computed: {
    fileStr: function() {
      return 'data:text/plain,' + this.$root.log.exportToArray().join('\n')
    }
  },
  methods: {
    saveKey(key) {
      if (this[key] !== loadConfig[key]) {
        track.trackAction(
          'change',
          'config',
          `${key} : ${loadConfig[key]} => ${this[key]}`
        )
      }
      config.set(key, this[key])
    },
    save: function() {
      this.saveKey('lan')
      this.saveKey('network')
      this.saveKey('mode')
      window.location.reload()
    }
  }
}
</script>
