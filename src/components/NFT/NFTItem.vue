<template>
  <v-layout row justify-center>
    <v-dialog v-model="isOpen" persistent max-width="1000px">
      <v-card>
        <div class="nft-item__detail">
          <img :src="curImg" alt="img" />
        </div>
      </v-card>
      <div
        class="nft-item__dialog--close-wrapper"
        v-if="isShowClose"
        @click="handleClose"
      >
        <div class="nft-item__dialog--close">×</div>
      </div>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: {
    isOpen: Boolean,
    curImg: String
  },
  data() {
    return {
      isShowClose: false
    }
  },
  updated() {
    setTimeout(() => {
      this.isShowClose = true
    }, 400)
  },

  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
.nft-item {
  &__dialog {
    &--close {
      &-wrapper {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        z-index: 99999;
        cursor: pointer;
      }
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid #fff;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &__detail {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 980px;
    img {
      width: 920px;
      object-fit: contain;
    }
  }
}
</style>

