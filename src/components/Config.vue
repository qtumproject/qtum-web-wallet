<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('config.title') }}</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs6>
            <v-subheader>{{ $t('config.lan') }}</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="lanSelect" 
              v-model="lan"
              :v-label="$t('config.lan')"
              single-line
              bottom
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader>{{ $t('config.network') }}</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              :items="networkSelect" 
              v-model="network"
              :v-label="$t('config.network')"
              single-line
              bottom
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn warning @click="save">{{ $t('common.confirm') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import config from '../config'

let loadConfig = {
  lan: config.getLan(),
  network: config.getNetwork()
}

export default {
  data() {
    return {
      lan: loadConfig.lan,
      lanSelect: [
        { value: 'zh', text: '中文'},
        { value: 'en', text: 'En'},
      ],
      network: loadConfig.network,
      networkSelect: [
        { value: 'skynet', text: this.$t('common.skynet')},
        { value: 'mainnet', text: this.$t('common.mainnet')},
      ]
    }
  },
  methods: {
    save: function() {
      config.set('lan', this.lan)
      config.set('network', this.network)
      window.location.reload()
    }
  }
}
</script>
