<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("nft.title") }}</span>
    </v-card-title>
    <v-container>
      <v-card flat tile class="nft-card">
        <div class="nft-item__desc" v-if="NFTList.length === 0">no-data</div>
        <div class="nft-item__list" v-if="NFTList.length > 0">
          <div
            class="nft-item"
            v-for="nft in NFTList"
            :key="nft.NFTId.toString()"
            @click="handleOpenNFTItem(true, nft.url, $event)"
          >
            <div class="nft-item__count">
              <div class="nft-item__count-box">{{ nft.count }}</div>
            </div>
            <v-img
              :src="nft.url"
              :lazy-src="nft.url"
              aspect-ratio="1"
              class="nft-item_img"
            ></v-img>
            <div class="nft-item__name">
              {{ nft.name }}
            </div>
            <div class="nft-item__desc">
              <v-clamp autoresize :max-lines="3">{{ nft.desc }}</v-clamp>
            </div>
            <v-btn
              small
              class="mt-3"
              @click="handleOpen(true, nft.count, nft.tokenId, $event)"
              color="cyan"
            >
              {{ $t("nft.send") }}
            </v-btn>
          </div>
        </div>
      </v-card>
      <div class="nft__load-more" v-if="isShowLoadMore" @click="loadNFTList">
        load more
      </div>
    </v-container>
    <nft-send
      :tokenId="curTokenId"
      :isOpen="isOpenSendDialog"
      :count="curCount"
      @close="handleOpen(false)"
    >
    </nft-send>
    <nft-item-dialog
      :isOpen="isOpenNFTDialog"
      :curImg="curImg"
      @close="handleOpenNFTItem(false, ``, $event)"
    ></nft-item-dialog>
  </v-card>
</template>
<script>
import VClamp from 'vue-clamp'
import { nftService } from '@/libs/nft'
import webWallet from '@/libs/web-wallet'
import NFTSend from './NFTSend.vue'
import NFTItem from './NFTItem.vue'

const NFT_LOADCOUNT = 1000
export default {
  data() {
    return {
      isOpenSendDialog: false,
      isOpenNFTDialog: false,
      curCount: 0,
      curIndex: 0,
      curTokenId: '-1',
      curImg: '',
      isShowLoadMore: false,
      NFTList: []
    }
  },
  components: {
    VClamp,
    'nft-send': NFTSend,
    'nft-item-dialog': NFTItem
  },

  async mounted() {
    await this.loadNFTList()
  },

  methods: {
    handleOpen(val, count, tokenId, e) {
      e && e.stopPropagation()
      this.curCount = count
      this.curTokenId = tokenId
      this.isOpenSendDialog = val
    },

    handleOpenNFTItem(val, curImg, e) {
      e && e.stopPropagation()
      this.curImg = curImg
      this.isOpenNFTDialog = val
    },

    /**
     * @description 加载更多的nft item
     */
    async loadNFTList() {
      const wallet = webWallet.getWallet()
      const {
        info: { address }
      } = wallet
      if (address) {
        const [NFTList, index] = await nftService.getNFTListByOwner(
          address,
          this.curIndex,
          NFT_LOADCOUNT
        )
        const curIndex = index
        if (curIndex === NFT_LOADCOUNT) {
          this.isShowLoadMore = true
        } else {
          this.isShowLoadMore = false
        }

        this.curIndex = curIndex
        this.NFTList = this.NFTList.concat(
          NFTList.filter((NFT) => NFT.count > 0)
        )
      }
    }
  }
}
</script>
<style lang="less" scoped>
.nft-card {
  display: flex;
  flex-wrap: wrap;
}
.nft__load-more {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: 100ms;
  &:hover {
    box-shadow: 0 2px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
      0 1px 5px 0 rgb(0 0 0 / 12%);
  }
}
.nft-item {
  width: 204px;
  margin-left: 14px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 20px !important;
  padding: 10px;
  transition: 100ms;
  position: relative;
  &__list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  &__desc {
    width: 100%;
    font-size: 18px;
    color: #ccc;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__count {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 10;
    width: 20px;
    height: 20px;
    text-align: center;
    font-size: 12px;
    background-color: #1976d2;
    border-radius: 50%;
    &-box {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &:hover {
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
      0 1px 5px 0 rgb(0 0 0 / 12%);
    padding: 14px;
  }
  &__img {
    height: 180px;
    object-fit: fill;
  }
  &__name {
    width: 100%;
    height: 30px;
    font-size: 18px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__desc {
    width: 100%;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>

